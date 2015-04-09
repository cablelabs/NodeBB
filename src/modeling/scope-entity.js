'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(ScopeEntity) {

    require('./scope-entity/create')(ScopeEntity);
    require('./scope-entity/patch')(ScopeEntity);
    require('./scope-entity/delete')(ScopeEntity);

    //ScopeEntity.getSwaggerCacheInfo = function(callback) {
    //    db.getObjectField('global', 'swagger:refresh', function(err, needsRefresh) {
    //        callback(err, needsRefresh ? needsRefresh : "true");
    //    });
    //};
    //
    //ScopeEntity.setSwaggerCacheInfo = function(value, callback) {
    //    db.setObjectField('global', 'swagger:refresh', value, callback);
    //};
    //
    //ScopeEntity.getEntityField = function(uid, field, callback) {
    //    ScopeEntity.getEntityFields(uid, [field], function(err, entity) {
    //        callback(err, entity ? entity[field] : null);
    //    });
    //};
    //
    //ScopeEntity.getEntityFields = function(uid, fields, callback) {
    //    ScopeEntity.getMultipleEntityFields([uid], fields, function(err, entities) {
    //        callback(err, entities ? entities[0] : null);
    //    });
    //};

    ScopeEntity.getScopeEntityFields = function(uid, fields, callback) {
        ScopeEntity.getMultipleScopeEntityFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    //ScopeEntity.getMultipleEntityFields = function(uids, fields, callback) {
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
    //        return 'entity:' + uid;
    //    });
    //
    //    addField('uid');
    //
    //    db.getObjectsFields(keys, fields, function(err, entities) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        modifyEntityData(entities, fieldsToRemove, callback);
    //    });
    //};

    ScopeEntity.getMultipleScopeEntityFields = function(uids, fields, callback) {
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
            return 'scopeentity:' + uid;
        });

        addField('uid');

        db.getObjectsFields(keys, fields, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyScopeEntityData(entities, fieldsToRemove, callback);
        });
    };

    //ScopeEntity.getEntityData = function(uid, callback) {
    //    ScopeEntity.getEntitiesData([uid], function(err, entities) {
    //        callback(err, entities ? entities[0] : null);
    //    });
    //};
    //
    //ScopeEntity.getEntitiesData = function(uids, callback) {
    //
    //    if (!Array.isArray(uids) || !uids.length) {
    //        return callback(null, []);
    //    }
    //
    //    var keys = uids.map(function(uid) {
    //        return 'entity:' + uid;
    //    });
    //
    //    db.getObjects(keys, function(err, entities) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        modifyEntityData(entities, [], callback);
    //    });
    //};
    //
    //function modifyEntityData(entities, fieldsToRemove, callback) {
    //    entities.forEach(function(entity) {
    //        if (!entity) {
    //            return;
    //        }
    //
    //        for(var i=0; i<fieldsToRemove.length; ++i) {
    //            entity[fieldsToRemove[i]] = undefined;
    //        }
    //    });
    //
    //    plugins.fireHook('filter:entities.get', entities, callback);
    //}

    function modifyScopeEntityData(entities, fieldsToRemove, callback) {
        entities.forEach(function(entity) {
            if (!entity) {
                return;
            }

            for(var i=0; i<fieldsToRemove.length; ++i) {
                entity[fieldsToRemove[i]] = undefined;
            }
        });

        plugins.fireHook('filter:entities.get', entities, callback);
    }

    //ScopeEntity.setEntityField = function(uid, field, value, callback) {
    //    plugins.fireHook('action:user.set', field, value, 'set');
    //    db.setObjectField('entity:' + uid, field, value, callback);
    //};

    ScopeEntity.setScopeEntityField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('scopeentity:' + uid, field, value, callback);
    };

    //ScopeEntity.setEntityFields = function(uid, data, callback) {
    //    for (var field in data) {
    //        if (data.hasOwnProperty(field)) {
    //            plugins.fireHook('action:entity.set', field, data[field], 'set');
    //        }
    //    }
    //
    //    db.setObject('entity:' + uid, data, callback);
    //};

    //ScopeEntity.getEntities = function(uids, callback) {
    //    async.parallel({
    //        entityData: function(next) {
    //            ScopeEntity.getMultipleEntityFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'entityviews'], next);
    //        }
    //    }, function(err, results) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        results.entityData.forEach(function(entity, index) {
    //            if (!entity) {
    //                return;
    //            }
    //            if(entity.definition != null && entity.definition != 'undefined' && typeof entity.definition === 'string') {
    //                entity.definition = JSON.parse(entity.definition);
    //            }
    //        });
    //        callback(err, results.entityData);
    //    });
    //};

    ScopeEntity.getScopeEntities = function(uids, callback) {
        async.parallel({
            entityData: function(next) {
                ScopeEntity.getMultipleScopeEntityFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'entityviews'], next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.entityData.forEach(function(entity, index) {
                if (!entity) {
                    return;
                }
                console.log(entity.definition);
                if(entity.definition != null && entity.definition != 'undefined' && typeof entity.definition === 'string') {
                    entity.definition = JSON.parse(entity.definition);
                }
            });
            callback(err, results.entityData);
        });
    };

    //ScopeEntity.getAllEntities = function(callback) {
    //    db.getObjectValues('entityname:uid', function(err, uids) {
    //        ScopeEntity.getEntities(uids, function(err, entitiesData) {
    //            if(err) {
    //                return callback(err);
    //            }
    //            callback(err, entitiesData);
    //        });
    //    });
    //};

    ScopeEntity.getAllScopeEntities = function(callback) {
        db.getObjectValues('scopeentityname:uid', function(err, uids) {
            ScopeEntity.getScopeEntities(uids, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    //ScopeEntity.getAllEntityFields = function(fields, callback) {
    //    db.getObjectValues('entityname:uid', function(err, uids) {
    //        ScopeEntity.getMultipleEntityFields(uids, fields, function(err, entitiesData) {
    //            if(err) {
    //                return callback(err);
    //            }
    //            callback(err, entitiesData);
    //        });
    //    });
    //};

    ScopeEntity.getAllScopeEntityFields = function(fields, callback) {
        db.getObjectValues('scopeentityname:uid', function(err, uids) {
            ScopeEntity.getMultipleScopeEntityFields(uids, fields, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    //ScopeEntity.exists = function(name, callback) {
    //    ScopeEntity.getUidByName(name, function(err, exists) {
    //        callback(err, !! exists);
    //    });
    //};
    //
    //ScopeEntity.count = function(callback) {
    //    db.getObjectField('global', 'entityCount', function(err, count) {
    //        callback(err, count ? count : 0);
    //    });
    //};
    //
    //ScopeEntity.getUidByName = function(name, callback) {
    //    db.getObjectField('entityname:uid', name, callback);
    //};

    ScopeEntity.getScopeUidByName = function(name, callback) {
        db.getObjectField('scopeentityname:uid', name, callback);
    };

    //ScopeEntity.getNamesByUids = function(uids, callback) {
    //    ScopeEntity.getMultipleEntityFields(uids, ['name'], function(err, entities) {
    //        if (err) {
    //            return callback(err);
    //        }
    //
    //        entities = entities.map(function(entity) {
    //            return entity.name;
    //        });
    //
    //        callback(null, entities);
    //    });
    //};

}(exports));
