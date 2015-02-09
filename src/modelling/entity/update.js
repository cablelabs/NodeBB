
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

    Entity.updateEntity = function(uid, data, callback) {
        var fields = ['name', 'definition', 'tags', 'domain', 'updatedate'];

        function isNameAvailable(next) {
            Entity.getEntityFields(uid, ['name'], function(err, entityData) {

                Entity.exists(entityData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }

                    next(exists ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                Entity.getEntityFields(uid, ['name', 'definition', 'domain', 'tags', 'updatedate'], callback);
            });
        });

        function updateField(field, next) {
            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateName(uid, data.name, next);
            } else if(field === 'updatedate') {
                data[field] = Date.now();
            }

            Entity.setEntityField(uid, field, data[field], next);
        }
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

                    db.deleteObjectField('entityname:uid', entityData.username, function(err) {
                        if (err) {
                            return next(err);
                        }
                        update('name', 'entityname:uid', newName, next);
                    });
                }
            ], callback);
        });
    }

    Entity.changePassword = function(uid, data, callback) {
        if(!data || !data.uid) {
            return callback(new Error('[[error:invalid-uid]]'));
        }

        function hashAndSetPassword(callback) {
            Entity.hashPassword(data.newPassword, function(err, hash) {
                if(err) {
                    return callback(err);
                }

                Entity.setUserField(data.uid, 'password', hash, function(err) {
                    if(err) {
                        return callback(err);
                    }

                    if(parseInt(uid, 10) === parseInt(data.uid, 10)) {
                        events.logPasswordChange(data.uid);
                    } else {
                        events.logAdminChangeUserPassword(uid, data.uid);
                    }

                    callback();
                });
            });
        }

        if (!utils.isPasswordValid(data.newPassword)) {
            return callback(new Error('[[user:change_password_error]]'));
        }

        if(parseInt(uid, 10) !== parseInt(data.uid, 10)) {
            Entity.isAdministrator(uid, function(err, isAdmin) {
                if(err || !isAdmin) {
                    return callback(err || new Error('[[user:change_password_error_privileges'));
                }

                hashAndSetPassword(callback);
            });
        } else {
            db.getObjectField('user:' + uid, 'password', function(err, currentPassword) {
                if(err) {
                    return callback(err);
                }

                if (!currentPassword) {
                    return hashAndSetPassword(callback);
                }

                Password.compare(data.currentPassword, currentPassword, function(err, res) {
                    if (err || !res) {
                        return callback(err || new Error('[[user:change_password_error_wrong_current]]'));
                    }
                    hashAndSetPassword(callback);
                });
            });
        }
    };

};
