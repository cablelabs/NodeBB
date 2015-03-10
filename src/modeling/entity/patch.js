
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
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'entityviews'];

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

            // Check if definition is object, if so stringify. If already string it will be taken care by usual routine.
            if(field === 'definition') {
                if(typeof data[field] === 'object') {
                    var definitionString = JSON.stringify(data[field]);
                    return Entity.setEntityField(uid, 'definition', definitionString, next);
                }
            }

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

                Entity.getEntityFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'entityviews'], callback);
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

    Entity.patchScopeEntity = function(uid, data, callback) {
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'entityviews'];

        function isNameAvailable(next) {
            Entity.getScopeEntityFields(uid, ['uid', 'name'], function(err, entityData) {

                Entity.exists(entityData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }
                    next(exists && uid != entityData.uid ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        function updateScopeField(field, next) {

            // Check if definition is object, if so stringify. If already string it will be taken care by usual routine.
            if(field === 'definition') {
                if(typeof data[field] === 'object') {
                    var definitionString = JSON.stringify(data[field]);
                    return Entity.setScopeEntityField(uid, 'definition', definitionString, next);
                }
            }

            // Update updatedate first, no matter what happens. It has been touched when it gets here.
            if(field === 'updatedate') {
                return Entity.setScopeEntityField(uid, 'updatedate', Date.now(), next);
            }

            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateScopeName(uid, data.name, next);
            }

            Entity.setScopeEntityField(uid, field, data[field], next);
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateScopeField, function(err) {
                if (err) {
                    return callback(err);
                }

                Entity.getScopeEntityFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'entityviews'], callback);
            });
        });
    };

    function updateScopeName(uid, newName, callback) {
        Entity.getScopeEntityFields(uid, ['name'], function(err, entityData) {
            function update(field, object, value, callback) {
                async.parallel([
                    function(next) {
                        Entity.setScopeEntityField(uid, field, value, next);
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

                    db.deleteObjectField('scopeentityname:uid', entityData.name, function(err) {
                        if (err) {
                            return next(err);
                        }
                        update('name', 'scopeentityname:uid', newName, next);
                    });
                }
            ], callback);
        });
    }
};
