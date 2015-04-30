
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

    ScopePath.patchScopePath = function(uid, data, scope, callback) {
        console.log(data);
        var fields = ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'pathviews'];

        // TODO : Check if the name needs to be unique across api zones or just within a zone.
        //function isNameAvailable(next) {
        //    ScopePath.getScopePathFields(uid, ['uid', 'name'], scope, function(err, pathData) {
        //
        //        ScopePath.exists(pathData.name, function(err, exists) {
        //            if(err) {
        //                return next(err);
        //            }
        //            next(exists && uid != pathData.uid ? new Error('[[error:username-taken]]') : null);
        //        });
        //    });
        //}

        function isTagsValid(next) {
            var newTags = data.tags;
            if(newTags != null && newTags !== 'undefined') {
                if(!Array.isArray(newTags)) {
                    return next("Tags need to be an array");
                }
                if(newTags.length <= 0) {
                    return next("Tags cannot be empty");
                }
                var isPresent = false;
                newTags.forEach(function(item) {
                    if(scope === item) {
                        isPresent = true;
                    }
                });
                if(!isPresent) {
                    return next("Zone and tags do not match");
                }
            }
            next(null);
        }

        function updateField(field, next) {

            if(field === 'tags' && data[field] !== undefined) {
                return updateTags(uid, data.tags, scope, next);
            }

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
                // TODO : Can't update name, you have to delete and create new one.
                return callback("Cannot update name of path. Delete old one and create new one");
                //return updateScopeName(uid, data.name, scope, next);
            }

            ScopePath.setScopePathField(uid, field, data[field], next);
        }

        async.series([isTagsValid], function(err, results) {
            if (err) {
                return callback(err);
            }

            async.each(fields, updateField, function(err) {
                if (err) {
                    return callback(err);
                }

                ScopePath.getScopePathFields(uid, ['name', 'displayName', 'definition', 'tags', 'domain', 'updatedate', 'createdate', 'pathviews'], scope, callback);
            });
        });
    };

    function updateTags(uid, newTags, scope, callback) {
        ScopePath.getScopePathFields(uid, ['name', 'tags'], scope, function(err, pathData) {
            async.series([
                function(next) {
                    pathData.tags.split(',').forEach(function(item) {
                        db.deleteObjectField('scopepathname:' + item + ':uid', pathData.name, function (err) {
                            if (err) {
                                return callback(err);
                            }
                        });
                    });
                    next(null);
                },
                function(next) {
                    newTags.forEach(function(item) {
                        db.setObjectField('scopepathname:' + item + ':uid', pathData.name, uid);
                    });

                    // update the new tag values to the object
                    ScopePath.setScopePathField(uid, 'tags', newTags, next);
                }
            ],callback);
        });
    }

    //function updateScopeName(uid, newName, scope, callback) {
    //    ScopePath.getScopePathFields(uid, ['name', 'tags'], scope, function(err, pathData) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        function update(field, object, value, callback) {
    //            async.parallel([
    //                function(next) {
    //                    ScopePath.setScopePathField(uid, field, value, next);
    //                },
    //                function(next) {
    //                    db.setObjectField(object, value, uid, next);
    //                }
    //            ], callback);
    //        }
    //
    //        async.parallel([
    //            function(next) {
    //                if (newName === pathData.name) {
    //                    return next();
    //                }
    //
    //                pathData.tags.forEach(function(item) {
    //                    db.deleteObjectField('scopepathname:' + item + ':uid', pathData.name, function (err) {
    //                        if (err) {
    //                            return next(err);
    //                        }
    //                        update('name', 'scopepathname:' + scope + ':uid', newName, next);
    //                    });
    //                });
    //            }
    //        ], callback);
    //    });
    //}
};
