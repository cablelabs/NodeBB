
'use strict';

var async = require('async'),
	winston = require('winston'),
	db = require('../database'),
	meta = require('../meta'),
	_ = require('underscore'),
	plugins = require('../plugins'),
	utils = require('../../public/src/utils');

module.exports = function(Users) {

    Users.createUserTags = function(tags, tid, timestamp, callback) {
		callback = callback || function () {};

		if (!Array.isArray(tags) || !tags.length) {
			return callback();
		}

//		plugins.fireHook('filter:tags.filter', {tags: tags, tid: tid}, function(err, data) {
		plugins.fireHook('filter:usertags.filter', {tags: tags, tid: tid}, function(err, data) {
			if (err) {
				return callback(err);
			}

			tags = data.tags.slice(0, meta.config.tagsPerTopic || 5);

			async.each(tags, function(tag, next) {
				tag = Users.cleanUpTag(tag);

				if (tag.length < (meta.config.minimumTagLength || 3)) {
					return next();
				}
				db.setAdd('user:' + tid + ':usertags', tag);

				db.sortedSetAdd('usertag:' + tag + ':users', timestamp, tid, function(err) {
					if (!err) {
						updateTagCount(tag);
					}
					next(err);
				});
			}, callback);
		});
	};

    Users.cleanUpUserTag = function(tag) {
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

	Users.updateTag = function(tag, data, callback) {
		db.setObject('usertag:' + tag, data, callback);
	};

	function updateTagCount(tag, callback) {
		callback = callback || function() {};
		Users.getTagTopicCount(tag, function(err, count) {
			if (!err) {
				db.sortedSetAdd('usertags:user:count', count, tag, callback);
			}
		});
	}

	Users.getTagTids = function(tag, start, end, callback) {
		db.getSortedSetRevRange('tag:' + tag + ':topics', start, end, callback);
	};

	Users.getTagTopicCount = function(tag, callback) {
		db.sortedSetCard('tag:' + tag + ':topics', callback);
	};

	Users.deleteTag = function(tag) {
		db.delete('tag:' + tag + ':topics');
		db.sortedSetRemove('tags:topic:count', tag);
	};

	Users.getTags = function(start, end, callback) {
		db.getSortedSetRevRangeWithScores('tags:topic:count', start, end, function(err, tags) {
			if (err) {
				return callback(err);
			}

			Users.getTagData(tags, callback);
		});
	};

	Users.getTagData = function(tags, callback) {
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

	Users.getTopicTags = function(tid, callback) {
		db.getSetMembers('topic:' + tid + ':tags', callback);
	};

	Users.getTopicTagsObjects = function(tid, callback) {
		Users.getUsersTagsObjects([tid], function(err, data) {
			callback(err, Array.isArray(data) && data.length ? data[0] : []);
		});
	};

	Users.getUsersTagsObjects = function(tids, callback) {
		var sets = tids.map(function(tid) {
			return 'topic:' + tid + ':tags';
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
					Users.getTagData(tags, next);
				},
				counts: function(next) {
					db.sortedSetScores('tags:topic:count', uniqueTopicTags, next);
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

	Users.updateTags = function(tid, tags, callback) {
		callback = callback || function() {};
		Users.getTopicField(tid, 'timestamp', function(err, timestamp) {
			if (err) {
				return callback(err);
			}

			Users.deleteTopicTags(tid, function(err) {
				if (err) {
					return callback(err);
				}

				Users.createUserTags(tags, tid, timestamp, callback);
			});
		});
	};

	Users.deleteTopicTags = function(tid, callback) {
		Users.getTopicTags(tid, function(err, tags) {
			if (err) {
				return callback(err);
			}

			async.series([
				function(next) {
					db.delete('topic:' + tid + ':tags', next);
				},
				function(next) {
					var sets = tags.map(function(tag) {
						return 'tag:' + tag + ':topics';
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

	Users.searchTags = function(data, callback) {
		if (!data) {
			return callback(null, []);
		}

		db.getSortedSetRevRange('tags:topic:count', 0, -1, function(err, tags) {
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