
'use strict';

var async = require('async'),
    validator = require('validator'),
    S = require('string'),

    utils = require('../../../public/src/utils'),
    meta = require('../../meta'),
    events = require('../../events'),
    db = require('../../database'),
    Password = require('../../password');

module.exports = function(ScopePath) {

    ScopePath.patchScopePath = function(uid, data, callback) {
        console.log(data);
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'pathviews'];

        function isNameAvailable(next) {
            ScopePath.getScopePathFields(uid, ['uid', 'name'], function(err, pathData) {

                ScopePath.exists(pathData.name, function(err, exists) {
                    if(err) {
                        return next(err);
                    }
                    next(exists && uid != pathData.uid ? new Error('[[error:username-taken]]') : null);
                });
            });
        }

        function updateField(field, next) {

            // Check if definition is object, if so stringify. If already string it will be taken care by usual routine.
            if(field === 'definition') {
                if(typeof data[field] === 'object') {
                    var definitionString = JSON.stringify(data[field]);
                    return ScopePath.setScopePathField(uid, 'definition', definitionString, next);
                }
            }

            // Update updatedate first, no matter what happens. It has been touched when it gets here.
            if(field === 'updatedate') {
                return ScopePath.setScopePathField(uid, 'updatedate', Date.now(), next);
            }

            if (!(data[field] !== undefined && typeof data[field] === 'string')) {
                return next();
            }

            data[field] = data[field].trim();
            data[field] = validator.escape(data[field]);

            if (field === 'name') {
                return updateScopeName(uid, data.name, next);
            }

            if(field === 'definition') {

            }

            ScopePath.setScopePathField(uid, field, data[field], next);
        }

        async.series([isNameAvailable], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                ScopePath.getScopePathFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'pathviews'], callback);
            });
        });
    };

    function updateScopeName(uid, newName, callback) {
        ScopePath.getScopePathFields(uid, ['name'], function(err, pathData) {
            function update(field, object, value, callback) {
                async.parallel([
                    function(next) {
                        ScopePath.setScopePathField(uid, field, value, next);
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
