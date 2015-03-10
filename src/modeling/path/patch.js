
'use strict';

var async = require('async'),
    validator = require('validator'),
    S = require('string'),

    utils = require('../../../public/src/utils'),
    meta = require('../../meta'),
    events = require('../../events'),
    db = require('../../database'),
    Password = require('../../password');

module.exports = function(Path) {

    Path.patchPath = function(uid, data, callback) {
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'pathviews'];

        function isNameAvailable(next) {
            Path.getPathFields(uid, ['uid', 'name'], function(err, pathData) {

                Path.exists(pathData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }
                    next(exists && uid != pathData.uid ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        function updateField(field, next) {

            // Update updatedate first, no matter what happens. It has been touched when it gets here.
            if(field === 'updatedate') {
                return Path.setPathField(uid, 'updatedate', Date.now(), next);
            }

            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateName(uid, data.name, next);
            }

            Path.setPathField(uid, field, data[field], next);
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                Path.getPathFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'pathviews'], callback);
            });
        });
    };

    function updateName(uid, newName, callback) {
        Path.getPathFields(uid, ['name'], function(err, pathData) {
            function update(field, object, value, callback) {
                async.parallel([
                    function(next) {
                        Path.setPathField(uid, field, value, next);
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
                    if (newName === pathData.name) {
                        return next();
                    }

                    db.deleteObjectField('pathname:uid', pathData.name, function(err) {
                        if (err) {
                            return next(err);
                        }
                        update('name', 'pathname:uid', newName, next);
                    });
                }
            ], callback);
        });
    }

    Path.patchScopePath = function(uid, data, callback) {
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'pathviews'];

        function isNameAvailable(next) {
            Path.getScopePathFields(uid, ['uid', 'name'], function(err, pathData) {

                Path.exists(pathData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }
                    next(exists && uid != pathData.uid ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        function updateField(field, next) {

            // Update updatedate first, no matter what happens. It has been touched when it gets here.
            if(field === 'updatedate') {
                return Path.setScopePathField(uid, 'updatedate', Date.now(), next);
            }

            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateScopeName(uid, data.name, next);
            }

            Path.setScopePathField(uid, field, data[field], next);
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                Path.getScopePathFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'pathviews'], callback);
            });
        });
    };

    function updateScopeName(uid, newName, callback) {
        Path.getScopePathFields(uid, ['name'], function(err, pathData) {
            function update(field, object, value, callback) {
                async.parallel([
                    function(next) {
                        Path.setScopePathField(uid, field, value, next);
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
                    if (newName === pathData.name) {
                        return next();
                    }

                    db.deleteObjectField('scopepathname:uid', pathData.name, function(err) {
                        if (err) {
                            return next(err);
                        }
                        update('name', 'scopepathname:uid', newName, next);
                    });
                }
            ], callback);
        });
    }
};
