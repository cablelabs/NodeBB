'use strict';

var async = require('async'),
    db = require('../../database'),
    entity = require('../entity'),
    plugins = require('../../plugins');

module.exports = function(Entity) {

    Entity.deleteEntity = function(uid, callback) {
        entity.getEntityFields(uid, ['name'], function(err, entityData) {
            if (err)  {
                return callback(err);
            }

            async.parallel([
                function(next) {
                    db.deleteObjectField('entityname:uid', entityData.name, next);
                },
                function(next) {
                    plugins.fireHook('filter:entity.delete', uid, next);
                }
            ], function(err) {
                if (err) {
                    return callback(err);
                }
                async.parallel([
                    function(next) {
                        db.decrObjectField('global', 'entityCount', next);
                    },
                    function(next) {
                        console.log("Deleting :: " + 'entity:' + uid);
                        db.delete('entity:' + uid, next);
                    }
                ], callback);
            });
        });
    };
};
