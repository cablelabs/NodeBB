'use strict';

var async = require('async'),
    db = require('../database'),
    threadTools = require('../threadTools');


module.exports = function(Announcements) {

    Announcements.purge = function(cid, callback) {

//        Announcements.getTopicIds(cid, 0, -1, function(err, tids) {
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

                purgeAnnouncement(cid, callback);
//            });
//        });
    };

    function purgeAnnouncement(cid, callback) {
        async.parallel([
            function(next) {
                db.sortedSetRemove('announcements:cid', cid, next);
            },
//            function(next) {
//                db.delete('apis:' + cid + ':tid', next);
//            },
//            function(next) {
//                db.delete('apis:recent_posts:cid:' + cid, next);
//            },
            function(next) {
                db.delete('announcement:' + cid, next);
            }
        ], callback);
    }
};