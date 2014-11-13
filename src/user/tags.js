
'use strict';

var async = require('async'),
    winston = require('winston'),
    db = require('../database'),
    meta = require('../meta'),
    _ = require('underscore'),
    plugins = require('../plugins'),
    utils = require('../../public/src/utils');

module.exports = function(User) {
    User.createTags = function(tags, uid, timestamp, callback) {
        console.log("User.createTags");
        callback = callback || function () {};

        if (!Array.isArray(tags) || !tags.length) {
            return callback();
        }

        plugins.fireHook('filter:tags.filter', {tags: tags, uid: uid}, function(err, data) {
            if (err) {
                return callback(err);
            }

            tags = data.tags.slice(0, meta.config.tagsPerTopic || 5);

            async.each(tags, function(tag, next) {
                tag = User.cleanUpTag(tag);

                if (tag.length < (meta.config.minimumTagLength || 3)) {
                    return next();
                }
                db.setAdd('user:' + tid + ':tags', tag);

                db.sortedSetAdd('tag:' + tag + ':users', timestamp, uid, function(err) {
                    if (!err) {
                        updateTagCount(tag);
                    }
                    next(err);
                });
            }, callback);
        });
    };

    User.cleanUpTag = function(tag) {
        if (typeof tag !== 'string' || !tag.length ) {
            return '';
        }
        tag = tag.trim().toLowerCase();
        tag = tag.replace(/[,\/#!$%\^\*;:{}=_`<>'"~()?\|]/g, '');
        tag = tag.substr(0, meta.config.maximumTagLength || 15);
        var matches = tag.match(/^[.-]*(.+?)[.-]*$/);
        if (matches && matches.length > 1) {
            tag = matches[1];
        }
        return tag;
    };

    User.updateTag = function(tag, data, callback) {
        db.setObject('tag:' + tag, data, callback);
    };

    function updateTagCount(tag, callback) {
        callback = callback || function() {};
        User.getTagUserCount(tag, function(err, count) {
            if (!err) {
                db.sortedSetAdd('tags:user:count', count, tag, callback);
            }
        });
    }

    User.getTagUids = function(tag, start, end, callback) {
        db.getSortedSetRevRange('tag:' + tag + ':users', start, end, callback);
    };

    User.getTagUserCount = function(tag, callback) {
        db.sortedSetCard('tag:' + tag + ':users', callback);
    };

    User.deleteTag = function(tag) {
        db.delete('tag:' + tag + ':users');
        db.sortedSetRemove('tags:user:count', tag);
    };

    User.getTags = function(start, end, callback) {
        db.getSortedSetRevRangeWithScores('tags:user:count', start, end, function(err, tags) {
            if (err) {
                return callback(err);
            }

            User.getTagData(tags, callback);
        });
    };

    User.getTagData = function(tags, callback) {
        var keys = tags.map(function(tag) {
            return 'tag:' + tag.value;
        });

        db.getObjects(keys, function(err, tagData) {
            if (err) {
                return callback(err);
            }

            tags.forEach(function(tag, index) {
                tag.color = tagData[index] ? tagData[index].color : '';
                tag.bgColor = tagData[index] ? tagData[index].bgColor : '';
            });
            callback(null, tags);
        });
    };

    User.getTopicTags = function(uid, callback) {
        db.getSetMembers('user:' + uid + ':tags', callback);
    };

    User.getUserTagsObjects = function(uid, callback) {
        User.getUsersTagsObjects([uid], function(err, data) {
            callback(err, Array.isArray(data) && data.length ? data[0] : []);
        });
    };

    User.getUsersTagsObjects = function(tids, callback) {
        var sets = tids.map(function(tid) {
            return 'user:' + tid + ':tags';
        });

        db.getSetsMembers(sets, function(err, topicTags) {
            if (err) {
                return callback(err);
            }

            var uniqueTopicTags = _.uniq(_.flatten(topicTags));

            var tags = uniqueTopicTags.map(function(tag) {
                return {value: tag};
            });

            async.parallel({
                tagData: function(next) {
                    User.getTagData(tags, next);
                },
                counts: function(next) {
                    db.sortedSetScores('tags:user:count', uniqueTopicTags, next);
                }
            }, function(err, results) {
                if (err) {
                    return callback(err);
                }

                results.tagData.forEach(function(tag, index) {
                    tag.score = results.counts[index] ? results.counts[index] : 0;
                });

                var tagData = _.object(uniqueTopicTags, results.tagData);

                topicTags.forEach(function(tags, index) {
                    if (Array.isArray(tags)) {
                        topicTags[index] = tags.map(function(tag) {return tagData[tag];});
                    }
                });

                callback(null, topicTags);
            });
        });
    };

    User.updateTags = function(tid, tags, callback) {
        callback = callback || function() {};
        User.getTopicField(tid, 'timestamp', function(err, timestamp) {
            if (err) {
                return callback(err);
            }

            User.deleteTopicTags(tid, function(err) {
                if (err) {
                    return callback(err);
                }

                User.createTags(tags, tid, timestamp, callback);
            });
        });
    };

    User.deleteUserTags = function(tid, callback) {
        User.getTopicTags(tid, function(err, tags) {
            if (err) {
                return callback(err);
            }

            async.series([
                function(next) {
                    db.delete('user:' + tid + ':tags', next);
                },
                function(next) {
                    var sets = tags.map(function(tag) {
                        return 'tag:' + tag + ':users';
                    });

                    db.sortedSetsRemove(sets, tid, next);
                },
                function(next) {
                    async.each(tags, function(tag, next) {
                        updateTagCount(tag, next);
                    }, next);
                }
            ], callback);
        });
    };

    User.searchTags = function(data, callback) {
        if (!data) {
            return callback(null, []);
        }

        db.getSortedSetRevRange('tags:user:count', 0, -1, function(err, tags) {
            if (err) {
                return callback(null, []);
            }
            if (data.query === '') {
                return callback(null, tags);
            }
            data.query = data.query.toLowerCase();
            var matches = [];
            for(var i=0; i<tags.length; ++i) {
                if (tags[i].toLowerCase().indexOf(data.query) === 0) {
                    matches.push(tags[i]);
                }
            }

            matches = matches.slice(0, 10).sort(function(a, b) {
                return a > b;
            });

            callback(null, matches);
        });
    };

};