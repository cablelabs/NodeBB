
'use strict';

var async = require('async'),
    validator = require('validator'),
    S = require('string'),

    utils = require('../../../public/src/utils'),
    meta = require('../../meta'),
    events = require('../../events'),
    db = require('../../database'),
    Password = require('../../password');

module.exports = function(Entity) {

    Entity.patchEntity = function(uid, data, callback) {
        var fields = ['name', 'definition', 'tags', 'domain', 'updatedate', 'entityviews'];

        function isNameAvailable(next) {
            Entity.getEntityFields(uid, ['uid', 'name'], function(err, entityData) {

                Entity.exists(entityData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }
                    next(exists && uid != entityData.uid ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        function updateField(field, next) {

            // Update updatedate first, no matter what happens. It has been touched when it gets here.
            if(field === 'updatedate') {
                return Entity.setEntityField(uid, 'updatedate', Date.now(), next);
            }

            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateName(uid, data.name, next);
            }

            Entity.setEntityField(uid, field, data[field], next);
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                Entity.getEntityFields(uid, ['name', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'entityviews'], callback);
            });
        });
    };

    function updateName(uid, newName, callback) {
        Entity.getEntityFields(uid, ['name'], function(err, entityData) {
            function update(field, object, value, callback) {
                async.parallel([
                    function(next) {
                        Entity.setEntityField(uid, field, value, next);
                    },
                    function(next) {
                        db.setObjectField(object, value, uid, next);
                    }
                ], callback);
            }

            if (err) {
                return callback(err);
            }

            async.parallel([
                function(next) {
                    if (newName === entityData.name) {
                        return next();
                    }

                    db.deleteObjectField('entityname:uid', entityData.name, function(err) {
                        if (err) {
                            return next(err);
                        }
                        update('name', 'entityname:uid', newName, next);
                    });
                }
            ], callback);
        });
    }
};
