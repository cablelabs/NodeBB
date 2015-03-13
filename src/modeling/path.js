'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(Path) {

    require('./path/create')(Path);
    require('./path/patch')(Path);
    require('./path/delete')(Path);

    Path.getPathField = function(uid, field, callback) {
        Path.getPathFields(uid, [field], function(err, path) {
            callback(err, path ? path[field] : null);
        });
    };

    Path.getPathFields = function(uid, fields, callback) {
        Path.getMultiplePathFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Path.getScopePathFields = function(uid, fields, callback) {
        Path.getMultipleScopePathFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Path.getMultiplePathFields = function(uids, fields, callback) {
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
            return 'path:' + uid;
        });

        addField('uid');

        db.getObjectsFields(keys, fields, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyPathData(entities, fieldsToRemove, callback);
        });
    };

    Path.getMultipleScopePathFields = function(uids, fields, callback) {
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

    Path.getPathData = function(uid, callback) {
        Path.getPathsData([uid], function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Path.getScopePathData = function(uid, callback) {
        Path.getScopePathsData([uid], function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Path.getPathsData = function(uids, callback) {

        if (!Array.isArray(uids) || !uids.length) {
            return callback(null, []);
        }

        var keys = uids.map(function(uid) {
            return 'path:' + uid;
        });

        db.getObjects(keys, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyPathData(entities, [], callback);
        });
    };

    Path.getScopePathsData = function(uids, callback) {

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

    function modifyPathData(entities, fieldsToRemove, callback) {
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

    Path.setPathField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('path:' + uid, field, value, callback);
    };

    Path.setScopePathField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('scopepath:' + uid, field, value, callback);
    };

    Path.setPathFields = function(uid, data, callback) {
        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                plugins.fireHook('action:path.set', field, data[field], 'set');
            }
        }

        db.setObject('path:' + uid, data, callback);
    };

    Path.getPaths = function(uids, callback) {
        async.parallel({
            pathData: function(next) {
                Path.getMultiplePathFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'pathviews'], next);
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

    Path.getScopePaths = function(uids, callback) {
        async.parallel({
            pathData: function(next) {
                Path.getMultipleScopePathFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'pathviews'], next);
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

    Path.getAllPaths = function(callback) {
        db.getObjectValues('pathname:uid', function(err, uids) {
            Path.getPaths(uids, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    Path.getAllScopePaths = function(callback) {
        db.getObjectValues('scopepathname:uid', function(err, uids) {
            Path.getScopePaths(uids, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    Path.getAllPathFields = function(fields, callback) {
        db.getObjectValues('pathname:uid', function(err, uids) {
            Path.getMultiplePathFields(uids, fields, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    Path.getAllScopePathFields = function(fields, callback) {
        db.getObjectValues('scopepathname:uid', function(err, uids) {
            Path.getMultipleScopePathFields(uids, fields, function(err, pathsData) {
                if(err) {
                    return callback(err);
                }
                callback(err, pathsData);
            });
        });
    };

    Path.exists = function(name, callback) {
        Path.getUidByName(name, function(err, exists) {
            callback(err, !! exists);
        });
    };

    Path.count = function(callback) {
        db.getObjectField('global', 'pathCount', function(err, count) {
            callback(err, count ? count : 0);
        });
    };

    Path.getUidByName = function(name, callback) {
        db.getObjectField('pathname:uid', name, callback);
    };

    Path.getNamesByUids = function(uids, callback) {
        Path.getMultiplePathFields(uids, ['name'], function(err, pathsData) {
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
