'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(Entity) {

    require('./entity/create')(Entity);
    require('./entity/patch')(Entity);
    require('./entity/delete')(Entity);

    //Entity.getSwaggerCacheInfo = function(callback) {
    //    db.getObjectField('cache:swagger', callback);
    //};
    //
    //Entity.setSwaggerCacheInfo = function(value, callback) {
    //    db.setObjectField('cache:swagger', value, callback);
    //};

    Entity.getEntityField = function(uid, field, callback) {
        Entity.getEntityFields(uid, [field], function(err, entity) {
            callback(err, entity ? entity[field] : null);
        });
    };

    Entity.getEntityFields = function(uid, fields, callback) {
        Entity.getMultipleEntityFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Entity.getScopeEntityFields = function(uid, fields, callback) {
        Entity.getMultipleScopeEntityFields([uid], fields, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Entity.getMultipleEntityFields = function(uids, fields, callback) {
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
            return 'entity:' + uid;
        });

        addField('uid');

        db.getObjectsFields(keys, fields, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyEntityData(entities, fieldsToRemove, callback);
        });
    };

    Entity.getMultipleScopeEntityFields = function(uids, fields, callback) {
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

    Entity.getEntityData = function(uid, callback) {
        Entity.getEntitiesData([uid], function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    Entity.getEntitiesData = function(uids, callback) {

        if (!Array.isArray(uids) || !uids.length) {
            return callback(null, []);
        }

        var keys = uids.map(function(uid) {
            return 'entity:' + uid;
        });

        db.getObjects(keys, function(err, entities) {
            if (err) {
                return callback(err);
            }

            modifyEntityData(entities, [], callback);
        });
    };

    function modifyEntityData(entities, fieldsToRemove, callback) {
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

    Entity.setEntityField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('entity:' + uid, field, value, callback);
    };

    Entity.setScopeEntityField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('scopeentity:' + uid, field, value, callback);
    };

    Entity.setEntityFields = function(uid, data, callback) {
        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                plugins.fireHook('action:entity.set', field, data[field], 'set');
            }
        }

        db.setObject('entity:' + uid, data, callback);
    };

    Entity.getEntities = function(uids, callback) {
        async.parallel({
            entityData: function(next) {
                Entity.getMultipleEntityFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'entityviews'], next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.entityData.forEach(function(entity, index) {
                if (!entity) {
                    return;
                }
                if(entity.definition != null && typeof entity.definition === 'string') {
                    entity.definition = JSON.parse(entity.definition);
                }
            });
            callback(err, results.entityData);
        });
    };

    Entity.getScopeEntities = function(uids, callback) {
        async.parallel({
            entityData: function(next) {
                Entity.getMultipleScopeEntityFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'entityviews'], next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.entityData.forEach(function(entity, index) {
                if (!entity) {
                    return;
                }
                if(entity.definition != null && typeof entity.definition === 'string') {
                    entity.definition = JSON.parse(entity.definition);
                }
            });
            callback(err, results.entityData);
        });
    };

    Entity.getAllEntities = function(callback) {
        db.getObjectValues('entityname:uid', function(err, uids) {
            Entity.getEntities(uids, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    Entity.getAllScopeEntities = function(callback) {
        db.getObjectValues('scopeentityname:uid', function(err, uids) {
            Entity.getScopeEntities(uids, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    Entity.getAllEntityFields = function(fields, callback) {
        db.getObjectValues('entityname:uid', function(err, uids) {
            Entity.getMultipleEntityFields(uids, fields, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    Entity.getAllScopeEntityFields = function(fields, callback) {
        db.getObjectValues('scopeentityname:uid', function(err, uids) {
            Entity.getMultipleScopeEntityFields(uids, fields, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    Entity.exists = function(name, callback) {
        Entity.getUidByName(name, function(err, exists) {
            callback(err, !! exists);
        });
    };

    Entity.count = function(callback) {
        db.getObjectField('global', 'entityCount', function(err, count) {
            callback(err, count ? count : 0);
        });
    };

    Entity.getUidByName = function(name, callback) {
        db.getObjectField('entityname:uid', name, callback);
    };

    Entity.getScopeUidByName = function(name, callback) {
        db.getObjectField('scopeentityname:uid', name, callback);
    };

    Entity.getNamesByUids = function(uids, callback) {
        Entity.getMultipleEntityFields(uids, ['name'], function(err, entities) {
            if (err) {
                return callback(err);
            }

            entities = entities.map(function(entity) {
                return entity.name;
            });

            callback(null, entities);
        });
    };

}(exports));
