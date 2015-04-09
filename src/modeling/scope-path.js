'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(ScopePath) {

    require('./scope-path/create')(ScopePath);
    require('./scope-path/patch')(ScopePath);
    require('./scope-path/delete')(ScopePath);

    //ScopePath.getPathField = function(uid, field, callback) {
    //    ScopePath.getPathFields(uid, [field], function(err, path) {
    //        callback(err, path ? path[field] : null);
    //    });
    //};
    //
    //ScopePath.getPathFields = function(uid, fields, callback) {
    //    ScopePath.getMultiplePathFields([uid], fields, function(err, entities) {
    //        callback(err, entities ? entities[0] : null);
    //    });
    //};

    ScopePath.getScopePathFields = function(uid, fields, callback) {
        ScopePath.getMultipleScopePathFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    //ScopePath.getMultiplePathFields = function(uids, fields, callback) {
    //    var fieldsToRemove = [];
    //    function addField(field) {
    //        if (fields.indexOf(field) === -1) {
    //            fields.push(field);
    //            fieldsToRemove.push(field);
    //        }
    //    }
    //
    //    if (!Array.isArray(uids) || !uids.length) {
    //        return callback(null, []);
    //    }
    //
    //    var keys = uids.map(function(uid) {
    //        return 'path:' + uid;
    //    });
    //
    //    addField('uid');
    //
    //    db.getObjectsFields(keys, fields, function(err, entities) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        modifyPathData(entities, fieldsToRemove, callback);
    //    });
    //};

    ScopePath.getMultipleScopePathFields = function(uids, fields, callback) {
        var fieldsToRemove = [];
        function addField(field) {
            if (fields.indexOf(field) === -1) {
                fields.push(field);
                fieldsToRemove.push(field);
            }
        }

        if (!Array.isArray(uids) || !uids.length) {
            return callback(null, []);
        }

        var keys = uids.map(function(uid) {
            return 'scopepath:' + uid;
        });

        addField('uid');

        db.getObjectsFields(keys, fields, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyScopePathData(entities, fieldsToRemove, callback);
        });
    };

    //ScopePath.getPathData = function(uid, callback) {
    //    ScopePath.getPathsData([uid], function(err, entities) {
    //        callback(err, entities ? entities[0] : null);
    //    });
    //};

    ScopePath.getScopePathData = function(uid, callback) {
        ScopePath.getScopePathsData([uid], function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    //ScopePath.getPathsData = function(uids, callback) {
    //
    //    if (!Array.isArray(uids) || !uids.length) {
    //        return callback(null, []);
    //    }
    //
    //    var keys = uids.map(function(uid) {
    //        return 'path:' + uid;
    //    });
    //
    //    db.getObjects(keys, function(err, entities) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        modifyPathData(entities, [], callback);
    //    });
    //};

    ScopePath.getScopePathsData = function(uids, callback) {

        if (!Array.isArray(uids) || !uids.length) {
            return callback(null, []);
        }

        var keys = uids.map(function(uid) {
            return 'scopepath:' + uid;
        });

        db.getObjects(keys, function(err, entities) {
            if (err) {
                return callback(err);
            }
            modifyScopePathData(entities, [], callback);
        });
    };

    //function modifyPathData(entities, fieldsToRemove, callback) {
    //    entities.forEach(function(path) {
    //        if (!path) {
    //            return;
    //        }
    //
    //        for(var i=0; i<fieldsToRemove.length; ++i) {
    //            path[fieldsToRemove[i]] = undefined;
    //        }
    //    });
    //
    //    plugins.fireHook('filter:users.get', entities, callback);
    //}

    function modifyScopePathData(entities, fieldsToRemove, callback) {
        entities.forEach(function(path) {
            if (!path) {
                return;
            }

            for(var i=0; i<fieldsToRemove.length; ++i) {
                path[fieldsToRemove[i]] = undefined;
            }
        });

        plugins.fireHook('filter:users.get', entities, callback);
    }

    //ScopePath.setPathField = function(uid, field, value, callback) {
    //    plugins.fireHook('action:user.set', field, value, 'set');
    //    db.setObjectField('path:' + uid, field, value, callback);
    //};

    ScopePath.setScopePathField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('scopepath:' + uid, field, value, callback);
    };

    //ScopePath.setPathFields = function(uid, data, callback) {
    //    for (var field in data) {
    //        if (data.hasOwnProperty(field)) {
    //            plugins.fireHook('action:path.set', field, data[field], 'set');
    //        }
    //    }
    //
    //    db.setObject('path:' + uid, data, callback);
    //};
    //
    //ScopePath.getPaths = function(uids, callback) {
    //    async.parallel({
    //        pathData: function(next) {
    //            ScopePath.getMultiplePathFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'pathviews'], next);
    //        }
    //    }, function(err, results) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        results.pathData.forEach(function(path, index) {
    //            if (!path) {
    //                return;
    //            }
    //        });
    //
    //        callback(err, results.pathData);
    //    });
    //};

    ScopePath.getScopePaths = function(uids, callback) {
        async.parallel({
            pathData: function(next) {
                ScopePath.getMultipleScopePathFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'pathviews'], next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.pathData.forEach(function(path, index) {
                if (!path) {
                    return;
                }
            });

            callback(err, results.pathData);
        });
    };

    //ScopePath.getAllPaths = function(callback) {
    //    db.getObjectValues('pathname:uid', function(err, uids) {
    //        ScopePath.getPaths(uids, function(err, pathsData) {
    //            if(err) {
    //                return callback(err);
    //            }
    //            callback(err, pathsData);
    //        });
    //    });
    //};

    ScopePath.getAllScopePaths = function(callback) {
        db.getObjectValues('scopepathname:uid', function(err, uids) {
            ScopePath.getScopePaths(uids, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    //ScopePath.getAllPathFields = function(fields, callback) {
    //    db.getObjectValues('pathname:uid', function(err, uids) {
    //        ScopePath.getMultiplePathFields(uids, fields, function(err, pathsData) {
    //            if(err) {
    //                return callback(err);
    //            }
    //            callback(err, pathsData);
    //        });
    //    });
    //};

    ScopePath.getAllScopePathFields = function(fields, callback) {
        db.getObjectValues('scopepathname:uid', function(err, uids) {
            ScopePath.getMultipleScopePathFields(uids, fields, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    ScopePath.exists = function(name, callback) {
        ScopePath.getUidByName(name, function(err, exists) {
            callback(err, !! exists);
        });
    };

    ScopePath.count = function(callback) {
        db.getObjectField('global', 'pathCount', function(err, count) {
            callback(err, count ? count : 0);
        });
    };

    ScopePath.getUidByName = function(name, callback) {
        db.getObjectField('pathname:uid', name, callback);
    };

    ScopePath.getNamesByUids = function(uids, callback) {
        ScopePath.getMultiplePathFields(uids, ['name'], function(err, pathsData) {
            if (err) {
                return callback(err);
            }

            pathsData = pathsData.map(function(path) {
                return path.name;
            });

            callback(null, pathsData);
        });
    };

}(exports));
