'use strict';

var async = require('async'),
    db = require('../../database'),
    path = require('../path'),
    plugins = require('../../plugins');

module.exports = function(Path) {

    Path.deletePath = function(uid, callback) {
        path.getPathFields(uid, ['name'], function(err, pathData) {
            if (err)  {
                return callback(err);
            }

            async.parallel([
                function(next) {
                    db.deleteObjectField('pathname:uid', pathData.name, next);
                },
                function(next) {
                    plugins.fireHook('filter:path.delete', uid, next);
                }
            ], function(err) {
                if (err) {
                    return callback(err);
                }
                async.parallel([
                    function(next) {
                        db.decrObjectField('global', 'pathCount', next);
                    },
                    function(next) {
                        console.log("Deleting :: " + 'path:' + uid);
                        db.delete('path:' + uid, next);
                    }
                ], callback);
            });
        });
    };
};
