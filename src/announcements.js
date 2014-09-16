
'use strict';

var db = require('./database'),
    posts = require('./posts'),
    utils = require('./../public/src/utils'),
    user = require('./user'),
    Groups = require('./groups'),
    topics = require('./topics'),
    plugins = require('./plugins'),
    meta = require('./meta'),
    emitter = require('./emitter'),
    validator = require('validator'),
    privileges = require('./privileges'),

    async = require('async'),
    winston = require('winston'),
    nconf = require('nconf');

(function(Announcements) {

    require('./announcements/delete')(Announcements);
//    require('./categories/activeusers')(Announcements);
//    require('./categories/recentreplies')(Announcements);
    require('./announcements/update')(Announcements);

    Announcements.create = function(data, callback) {
        db.incrObjectField('global', 'nextCid', function(err, cid) {
            if (err) {
                return callback(err);
            }

//            var slug = cid + '/' + utils.slugify(data.name);

            var announcement = {
                cid: cid,
                name: data.name,
                description: data.description,
                bgColor: data.bgColor,
                color: data.color,
                order: data.order,
                disabled: 0,
                class: 'col-md-3 col-xs-6'
            };

            db.setObject('announcement:' + cid, announcement, function(err) {
                if(err) {
                    return callback(err);
                }

                db.sortedSetAdd('announcements:cid', data.order, cid);

                callback(null, announcement);
            });
        });
    };

    Announcements.exists = function(cid, callback) {
        db.isSortedSetMember('announcements:cid', cid, callback);
    };

    Announcements.getAllAnnouncements = function(callback) {
        db.getSortedSetRange('announcements:cid', 0, -1, function(err, cids) {
            if (err) {
                return callback(err);
            }

            if (!Array.isArray(cids) || !cids.length) {
                return callback(null, []);
            }

            Announcements.getAnnouncementsData(cids, callback);
        });
    };

    Announcements.getVisibleAnnouncements = function(uid, callback) {
        db.getSortedSetRange('announcements:cid', 0, -1, function(err, cids) {
            if (err) {
                return callback(err);
            }

            if (!Array.isArray(cids) || !cids.length) {
                return callback(null, []);
            }
            Announcements.getAnnouncements(cids, function(err, apis) {
                if (err) {
                    return callback(err);
                }

                apis = apis.filter(function(category) {
                    return !category.disabled;
                });
                callback(null, apis);
            });
        });
    };

    Announcements.getAnnouncements = function(cids, callback) {
        if (!Array.isArray(cids)) {
            return callback(new Error('[[error:invalid-cid]]'));
        }

        if (!cids.length) {
            return callback(null, []);
        }

        async.parallel({
            apis: function(next) {
                Announcements.getAnnouncementsData(cids, next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            var apis = results.apis;
            callback(null, apis);
        });
    };

    Announcements.getAnnouncementsData = function(cids, callback) {
        var keys = cids.map(function(cid) {
            return 'announcement:' + cid;
        });

        db.getObjects(keys, function(err, apis) {
            if (err) {
                return callback(err);
            }

            if (!Array.isArray(apis) || !apis.length) {
                return callback(null, []);
            }

            async.map(apis, function(api, next) {
                if (!api) {
                    return next(null, api);
                }
                api.name = validator.escape(api.name);
                api.description = validator.escape(api.description);
                api.disabled = api.disabled ? parseInt(api.disabled, 10) !== 0 : false;
                next(null, api);
            }, callback);
        });
    };

    Announcements.getCategoryField = function(cid, field, callback) {
        db.getObjectField('announcement:' + cid, field, callback);
    };

    Announcements.getMultipleCategoryFields = function(cids, fields, callback) {
        var keys = cids.map(function(cid) {
            return 'announcement:' + cid;
        });
        db.getObjectsFields(keys, fields, callback);
    };

    Announcements.getCategoryFields = function(cid, fields, callback) {
        db.getObjectFields('announcement:' + cid, fields, callback);
    };

    Announcements.setCategoryField = function(cid, field, value, callback) {
        db.setObjectField('announcement:' + cid, field, value, callback);
    };

//    Announcements.getModerators = function(cid, callback) {
//        Groups.get('cid:' + cid + ':privileges:mods', {}, function(err, groupObj) {
//            if (err) {
//                return callback(err);
//            }
//
//            if (!Array.isArray(groupObj) || !groupObj.members.length) {
//                return callback(null, []);
//            }
//
//            user.getMultipleUserFields(groupObj.members, ['uid', 'username', 'userslug', 'picture'], callback);
//        });
//    };

//    emitter.on('event:newpost', Announcements.onNewPostMade);

}(exports));
