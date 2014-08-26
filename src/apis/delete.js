'use strict';

var async = require('async'),
    db = require('../database'),
    threadTools = require('../threadTools');


module.exports = function(Apis) {

    Apis.purge = function(cid, callback) {

//        Apis.getTopicIds(cid, 0, -1, function(err, tids) {
//            if (err) {
//                return callback(err);
//            }
//
//            async.eachLimit(tids, 10, function(tid, next) {
//                threadTools.purge(tid, 0, next);
//            }, function(err) {
//                if (err) {
//                    return callback(err);
//                }

                purgeCategory(cid, callback);
//            });
//        });
    };

    function purgeCategory(cid, callback) {
        async.parallel([
            function(next) {
                db.sortedSetRemove('apis:cid', cid, next);
            },
//            function(next) {
//                db.delete('apis:' + cid + ':tid', next);
//            },
//            function(next) {
//                db.delete('apis:recent_posts:cid:' + cid, next);
//            },
            function(next) {
                db.delete('api:' + cid, next);
            }
        ], callback);
    }
};