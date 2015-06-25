'use strict';

var	async = require('async'),
    plugins = require('../plugins'),
    db = require('../database');

(function(ScopeEntity) {

    require('./scope-entity/create')(ScopeEntity);
    require('./scope-entity/patch')(ScopeEntity);
    require('./scope-entity/delete')(ScopeEntity);

    ScopeEntity.getAllScopeEntityTags = function(callback) {
        db.getObjectValues('scopeEntityTags', function(err, tags) {
            callback(err, tags);
        });
    };

    ScopeEntity.getScopeEntityFields = function(uid, fields, scope, callback) {
        ScopeEntity.getMultipleScopeEntityFields([uid], fields, scope, function(err, entities) {
            callback(err, entities ? entities[0] : null);
        });
    };

    ScopeEntity.getMultipleScopeEntityFields = function(uids, fields, scope, callback) {
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

    ScopeEntity.setScopeEntityField = function(uid, field, value, callback) {
        plugins.fireHook('action:user.set', field, value, 'set');
        db.setObjectField('scopeentity:' + uid, field, value, callback);
    };

    ScopeEntity.getScopeEntities = function(uids, scope, callback) {
        async.parallel({
            entityData: function(next) {
                ScopeEntity.getMultipleScopeEntityFields(uids, ['uid', 'name', 'displayName', 'definition', 'tags', 'domain', 'createdate', 'updatedate', 'entityviews'], scope, next);
            }
        }, function(err, results) {
            if (err) {
                return callback(err);
            }

            results.entityData.forEach(function(entity, index) {
                if (!entity) {
                    return;
                }
                if(entity.definition != null && entity.definition != 'undefined' && typeof entity.definition === 'string') {
                    entity.definition = JSON.parse(entity.definition);
                }
            });
            callback(err, results.entityData);
        });
    };

    ScopeEntity.getAllScopeEntities = function(scope, callback) {
        db.getObjectValues('scopeentityname:' + scope + ':uid', function(err, uids) {
            ScopeEntity.getScopeEntities(uids, scope, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    ScopeEntity.getAllScopeEntityFields = function(fields, scope, callback) {
        db.getObjectValues('scopeentityname:'+ scope + ':uid', function(err, uids) {
            ScopeEntity.getMultipleScopeEntityFields(uids, fields, scope, function(err, entitiesData) {
                if(err) {
                    return callback(err);
                }
                callback(err, entitiesData);
            });
        });
    };

    ScopeEntity.getScopeUidByName = function(name, scope, callback) {
        db.getObjectField('scopeentityname:' + scope + ':uid', name, callback);
    };

    ScopeEntity.exists = function(name, scope, callback) {
        ScopeEntity.getUidByName(name, scope, function(err, exists) {
            callback(err, !! exists);
        });
    };

    //ScopeEntity.getUidByName = function(name, scope, callback) {
    //    db.getObjectField('scopeentityname:' + scope + ':uid', name, callback);
    //};

}(exports));
