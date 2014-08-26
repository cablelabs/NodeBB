
'use strict';

var async = require('async'),
    db = require('./../database'),
    utils = require('./../../public/src/utils');


module.exports = function(Apis) {

    Apis.update = function(modified, callback) {

        function updateApi(cid, next) {
            var category = modified[cid];
            var fields = Object.keys(category);

            async.each(fields, function(key, next) {
                updateApiField(cid, key, category[key], next);
            }, next);
        }

        function updateApiField(cid, key, value, next) {
            db.setObjectField('api:' + cid, key, value, function(err) {
                if(err) {
                    return next(err);
                }

//                if (key === 'name') {
//                    var slug = cid + '/' + utils.slugify(value);
//                    db.setObjectField('api:' + cid, 'slug', slug, next);
//                } else
                if (key === 'order') {
                    db.sortedSetAdd('apis:cid', value, cid, next);
                } else {
                    next();
                }
            });
        }

        var cids = Object.keys(modified);

        async.each(cids, updateApi, function(err) {
            callback(err, cids);
        });
    };

};
