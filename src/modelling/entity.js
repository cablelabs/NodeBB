'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(Entity) {

    require('./entity/create')(Entity);
    require('./entity/update')(Entity);
    require('./entity/delete')(Entity);

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

        plugins.fireHook('filter:users.get', entities, callback);
    }

    Entity.setEntityField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('entity:' + uid, field, value, callback);
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
                Entity.getMultipleEntityFields(uids, ['uid', 'name', 'definition', 'tags', 'domain'], next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.entityData.forEach(function(entity, index) {
                if (!entity) {
                    return;
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
