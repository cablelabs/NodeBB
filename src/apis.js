
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

(function(Apis) {

    require('./apis/delete')(Apis);
//    require('./categories/activeusers')(Apis);
//    require('./categories/recentreplies')(Apis);
    require('./apis/update')(Apis);

    Apis.create = function(data, callback) {
        db.incrObjectField('global', 'nextCid', function(err, cid) {
            if (err) {
                return callback(err);
            }

            var slug = cid + '/' + utils.slugify(data.name);

            var category = {
                cid: cid,
                name: data.name,
                description: data.description,
                bgColor: data.bgColor,
                color: data.color,
                order: data.order,
                disabled: 0,
                class: 'col-md-3 col-xs-6'
            };

            db.setObject('api:' + cid, category, function(err) {
                if(err) {
                    return callback(err);
                }

                db.sortedSetAdd('apis:cid', data.order, cid);

                callback(null, category);
            });
        });
    };

    Apis.exists = function(cid, callback) {
        db.isSortedSetMember('apis:cid', cid, callback);
    };

    Apis.getAllApis = function(callback) {
        db.getSortedSetRange('apis:cid', 0, -1, function(err, cids) {
            if (err) {
                return callback(err);
            }

            if (!Array.isArray(cids) || !cids.length) {
                return callback(null, []);
            }

            Apis.getApisData(cids, callback);
        });
    };

    Apis.getVisibleApis = function(uid, callback) {
        db.getSortedSetRange('apis:cid', 0, -1, function(err, cids) {
            if (err) {
                return callback(err);
            }

            if (!Array.isArray(cids) || !cids.length) {
                return callback(null, []);
            }
            Apis.getApis(cids, function(err, apis) {
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

    Apis.getApis = function(cids, callback) {
        if (!Array.isArray(cids)) {
            return callback(new Error('[[error:invalid-cid]]'));
        }

        if (!cids.length) {
            return callback(null, []);
        }

        async.parallel({
            apis: function(next) {
                Apis.getApisData(cids, next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            var apis = results.apis;
            callback(null, apis);
        });
    };

    Apis.getApisData = function(cids, callback) {
        var keys = cids.map(function(cid) {
            return 'api:' + cid;
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

    Apis.getCategoryField = function(cid, field, callback) {
        db.getObjectField('api:' + cid, field, callback);
    };

    Apis.getMultipleCategoryFields = function(cids, fields, callback) {
        var keys = cids.map(function(cid) {
            return 'api:' + cid;
        });
        db.getObjectsFields(keys, fields, callback);
    };

    Apis.getCategoryFields = function(cid, fields, callback) {
        db.getObjectFields('api:' + cid, fields, callback);
    };

    Apis.setCategoryField = function(cid, field, value, callback) {
        db.setObjectField('api:' + cid, field, value, callback);
    };

//    Apis.getModerators = function(cid, callback) {
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

//    emitter.on('event:newpost', Apis.onNewPostMade);

}(exports));
