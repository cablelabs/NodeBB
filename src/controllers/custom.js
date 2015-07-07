"use strict";

var async = require('async'),

    entity      = require('../modeling/entity'),
    scopeEntity = require('../modeling/scope-entity'),
    exporter    = require('../modeling/exportSchema'),
    path        = require('../modeling/path'),
    scopePath   = require('../modeling/scope-path'),
    winston     = require('winston'),
    apis        = require('../apis'),
    announcements = require('../announcements'),
    topics      = require('../topics'),
    meta        = require('../meta'),
    db = require('../database'),
    events = require('../events'),
    categories = require('../categories'),
    languages = require('../languages'),
    plugins = require('../plugins'),
    widgets = require('../widgets'),
    groups = require('../groups'),
    pkg = require('../../package.json'),
    linkParser = require('../controllers/mind-map/linkParser_new-format'),
    swaggerBuilder = require('../modeling/swaggerBuilder'),
    swaggerBuildertr069 = require('../modeling/swaggerBuilder-Scope'),
    JSZip = require("jszip"),
    validator = require('validator');

var customController = {
    categories: {},
    topics: {},
    groups: {},
    themes: {},
    events: {},
    database: {},
    plugins: {},
    languages: {},
    settings: {},
    logger: {},
    sounds: {},
    users: require('./admin/users'),
    uploads: require('./admin/uploads')
};

customController.index = function(req, res, next) {
    res.render('custom/home');
};

customController.aboutCia = function(req, res, next) {
    res.render('custom/about-cia');
};

customController.gettingStarted = function(req, res, next) {
    res.render('custom/getting-started');
};

customController.entityMap = function(req, res, next) {
    res.render('custom/entity-map');
};

customController.documentation = function(req, res, next) {
    res.render('custom/documentation');
};

customController.modeling = function(req, res, next) {
    res.render('custom/modeling/paths');
};

customController.documentationScope = function(req, res, next) {
    var scope = req.params.scopeName;
    req.session.scopeName = scope;
    res.render('custom/documentation-scope', {scopeName: scope});
};

customController.getPaths = function(req, res, next) {

    var query = req.query.fields;
    if(query) { // query handles ?fields=field1,field2
        var fields = query.split(',');
        path.getAllPathFields(fields, function(err, pathsData) {
            if(err) {
                return next(err);
            }
            res.send(pathsData);
        });
    } else { // get all attributes
        path.getAllPaths(function (err, pathsData) {
            if(err) {
                return next(err);
            }
            res.send(pathsData);
        });
    }

};

customController.getScopePaths = function(req, res, next) {
    var scope = req.params.scope;
    var query = req.query.fields;
    if(query) { // query handles ?fields=field1,field2
        var fields = query.split(',');
        scopePath.getAllScopePathFields(fields, scope, function(err, pathsData) {
            if(err) {
                return next(err);
            }
            res.send(pathsData);
        });
    } else { // get all attributes
        scopePath.getAllScopePaths(scope, function (err, pathsData) {
            if(err) {
                return next(err);
            }
            res.send(pathsData);
        });
    }

};

customController.getPathById = function(req, res, next) {
    var uid = req.params.uid;
    path.getPathData(uid, function(err, paths) {
        if(err) {
            next(err);
        }
        paths.definition = JSON.parse(paths.definition);
        res.send(paths);
    });
};

customController.getScopePathById = function(req, res, next) {
    var scope = req.params.scope;

    var uid = req.params.uid;
    scopePath.getScopePathData(uid, scope, function(err, paths) {
        if(err || paths == null) {
            return next("Not found");
        }
        paths.definition = paths && paths.definition && paths.definition !== 'undefined' ? JSON.parse(paths.definition) : '';
        res.send(paths);
    });
};

customController.createPath = function(req, res, next) {

    var pathData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            pathData[key] = req.body[key];
        }
    }

    path.createPath(pathData, function(err, uid) {
        pathData.uid = uid;
        res.send(pathData);
    });
};

customController.createScopePath = function(req, res, next) {
    var scope = req.params.scope;

    var pathData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            pathData[key] = req.body[key];
        }
    }

    scopePath.createScopePath(pathData, scope, function(err, uid) {
        pathData.uid = uid;
        res.send(err ? err : pathData);
    });
};

customController.patchPath = function(req, res, next) {

    var uid = req.params.uid;

    var pathData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            pathData[key] = req.body[key];
        }
    }

    path.patchPath(uid, pathData, function(err, updatedEntity) {
        res.send(updatedEntity);
    });
};

customController.patchScopePath = function(req, res, next) {
    var scope = req.params.scope;
    var uid = req.params.uid;

    var pathData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            pathData[key] = req.body[key];
        }
    }

    scopePath.patchScopePath(uid, pathData, scope, function(err, updatedEntity) {
        res.send(err ? err : updatedEntity);
    });
};

customController.deletePath = function(req, res, next) {
    var uid = req.params.uid;
    path.deletePath(uid, function(err, returnData) {
        if(err) {
            return next(err);
        }
        res.send(returnData);
    });
};

customController.getEntities = function(req, res, next) {
    var query = req.query.fields;
    if(query) { // query handles ?fields=field1,field2
        var fields = query.split(',');
        entity.getAllEntityFields(fields, function(err, entitiesData) {
            if(err) {
                return next(err);
            }
            res.send(entitiesData);
        });
    } else { // get all attributes
        entity.getAllEntities(function (err, entitiesData) {
            if(err) {
                return next(err);
            }
            res.send(entitiesData);
        });
    }
};

customController.getScopeEntities = function(req, res, next) {
    var scope = req.params.scope;
    var query = req.query.fields;

    if(query) { // query handles ?fields=field1,field2
        var fields = query.split(',');
        scopeEntity.getAllScopeEntityFields(fields, scope, function(err, entitiesData) {
            if(err) {
                return next(err);
            }
            res.send(entitiesData);
        });
    } else { // get all attributes
        scopeEntity.getAllScopeEntities(scope, function (err, entitiesData) {
            if(err) {
                return next(err);
            }
            res.send(entitiesData);
        });
    }
};

customController.getCustomScopeEntities = function(req, res, next) {
    var scope   = req.params.scope;
    var name    = req.params.name;

    res.send(scope + " " + name);

    //var query = req.query.fields;
    //if(query) { // query handles ?fields=field1,field2
    //    var fields = query.split(',');
    //    entity.getAllScopeEntityFields(fields, function(err, entitiesData) {
    //        if(err) {
    //            return next(err);
    //        }
    //        res.send(entitiesData);
    //    });
    //} else { // get all attributes
    //    entity.getAllScopeEntities(function (err, entitiesData) {
    //        if(err) {
    //            return next(err);
    //        }
    //        res.send(entitiesData);
    //    });
    //}
};

customController.getEntityByName = function(req, res, next) {
    var name = req.params.name;
    entity.getUidByName(name, function(err, uid) {
        entity.getEntities([uid], function(err, entities) {
            if(err) {
                return next(err);
            }
            res.send(entities);
        });
    });
};

customController.getScopeEntityByName = function(req, res, next) {
    var scope = req.params.scope;
    var name = req.params.name;
    scopeEntity.getScopeUidByName(name, scope, function(err, uid) {
        if(err || uid == null) {
            console.log(uid);
            return next("Not found");
        }
        scopeEntity.getScopeEntities([uid], scope, function(err, entities) {
            if(err) {
                next(err);
            }
            res.send(entities);
        });
    });
};

customController.exportSchemas = function(req, res, next) {
    var zip = new JSZip();
    var items = req.query.items.split(",");

    console.log(items);
    var response = {};

    (function insertOne() {
        var def = items.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
        exporter.generateSchema(def, function(schema) {
            response[def] = schema;

            if (items.length == 0) {
                res.setHeader("Content-type", "application/json");
                res.send(response);
            } else {
                // recursive call.
                insertOne();
            }
        })
    })();
};

customController.exportSchemaByName = function(req, res, next) {
    var type = req.query.type;
    exporter.generateSchema(req.params.name, function(schema) {
        if(type && type === 'xml') {
            console.log("Converting to xml");
            var request = require('request');
            request.post({
                headers: {'Content-type' : 'application/json'},
                url:     'http://cl-convert.herokuapp.com/convert',
                body:    JSON.stringify(schema)
            }, function(error, response, body){
                res.setHeader("Content-type", "application/xml");
                res.send(body);
            });

        } else {
            res.setHeader("Content-type", "application/json");
            res.send(schema);
        }
    })
};

customController.exportScopeSchemaByName = function(req, res, next) {
    var scope = req.params.scope;
    var type = req.query.type;
    exporter.generateScopeSchema(req.params.name, scope, function(schema) {
        if(type && type === 'xml') {
            console.log("Converting to xml");
            var request = require('request');
            request.post({
                headers: {'Content-type' : 'application/json'},
                url:     'http://cl-convert.herokuapp.com/convert',
                body:    JSON.stringify(schema)
            }, function(error, response, body){
                res.setHeader("Content-type", "application/xml");
                res.send(body);
            });

        } else {
            res.setHeader("Content-type", "application/json");
            res.send(schema);
        }
    })
};

customController.pullZones = function(req, res, next) {
    var redis = require('redis');
    var clientProd = redis.createClient("6379", "devportal.cablelabs.com"); //creates a new client
    var clientHeroku = redis.createClient("14370", "pub-redis-14370.us-east-1-4.1.ec2.garantiadata.com"); //creates a new client
    clientHeroku.auth("SiqiJBW1NltRcOuY");

    clientHeroku.on('connect', function() {
        console.log('connected');
    });

    //clientHeroku.hgetall('scopeEntityTags', function(err, reply) {
    //    //redisClient.hset(key, field, value, callback);
    //    clientHeroku.hset('scopeEntityTags', "asr", "asr", function(err, resp) {
    //        clientHeroku.hset('scopeEntityTags', "bse", "bse", function (err, resp) {
    //            res.send(reply);
    //        });
    //    });
    //});

    //clientHeroku.hgetall('scopepathname:asr:uid', function(err, resp) {
    //    clientProd.hmset('scopepathname:asr:uid', resp, function(err) {
    //        console.log(resp);
    //        res.send(resp);
    //    });
    //})

    //clientHeroku.hgetall('scopeentityname:bse:uid', function(err,resp) {
    //    Object.keys(resp).forEach(function (id) {
    //        var entityName = 'scopeentity:' + resp[id];
    //        clientHeroku.hgetall(entityName, function(err, data) {
    //            console.log(data);
    //            clientProd.hmset(entityName, data, function(err) {
    //            });
    //        })
    //    });
    //    res.send(resp);
    //});

    //clientHeroku.hgetall('scopepathname:asr:uid', function(err,resp) {
    //    Object.keys(resp).forEach(function (id) {
    //        var entityName = 'scopepath:' + resp[id];
    //        clientHeroku.hgetall(entityName, function(err, data) {
    //            console.log(data);
    //            clientProd.hmset(entityName, data, function(err) {
    //            });
    //        })
    //    });
    //    res.send(resp);
    //});

};

customController.getSchemaByName = function(req, res, next) {
    var name    = req.params.name;
    var view   = req.query.view;
    function doValidation() {
        if(view != null && view === 'validation') {
            return true;
        }
        return false;
    }
    var nameSpacePrefix = req.get('host') + "/modeling/api/schema/";
    var schema = {
        $schema                 : "http://json-schema.org/draft-04/schema#",
        id                      : nameSpacePrefix + name,
        title                   : name,
        type                    : "object",
        required                : [],
        properties              : {}
    };

    entity.getUidByName(name.toLowerCase(), function(err, uid) {
         if(uid != null) {
            entity.getEntities([uid], function(err, entities) {
                if(err) {
                    return next(err);
                }
                var definition = entities[0].definition;
                if(definition != null && definition.properties != null) {
                    var properties = definition.properties;
                    Object.keys(properties).forEach(function(key) {
                        if(doValidation()) {
                            schema.required.push(key);
                        }
                        var val = properties[key];
                        if(JSON.stringify(val).indexOf("$ref") > 0) {
                            var refVal  = val["$ref"];
                            var typeVal = val["type"];

                            if(refVal != undefined) {
                                val["$ref"] = nameSpacePrefix + refVal;
                            } else if(typeVal == 'array') {
                                val["items"].$ref = nameSpacePrefix + val["items"].$ref;
                            }
                        }
                    });
                    schema.properties = properties;
                }

                if(doValidation()) {
                    schema.additionalProperties = false
                }
                res.setHeader("Content-type", "application/json");
                res.send(schema);
            });
         } else {
             res.setHeader("Content-type", "application/json");
             res.send(schema);
         }
    });
};

customController.createEntity = function(req, res, next) {

    var entityData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            entityData[key] = req.body[key];
        }
    }

    entity.createEntity(entityData, function(err, uid) {
        entityData.uid = uid;
        res.send(entityData);
    });
};

customController.createScopeEntity = function(req, res, next) {
    var scope = req.params.scope;

    var entityData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            entityData[key] = req.body[key];
        }
    }

    scopeEntity.createScopeEntity(entityData, scope, function(err, uid) {
        entityData.uid = uid;
        res.send(entityData);
    });
};

customController.patchEntity = function(req, res, next) {

    var name = req.params.name;

    var entityData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            entityData[key] = req.body[key];
        }
    }

    entity.getUidByName(name, function(err, uid) {
        entity.patchEntity(uid, entityData, function(err, updatedEntity) {
            res.send(updatedEntity);
        });
    });
};

customController.patchScopeEntity = function(req, res, next) {
    var scope = req.params.scope;
    var name = req.params.name;

    var entityData = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            entityData[key] = req.body[key];
        }
    }

    scopeEntity.getScopeUidByName(name, scope, function(err, uid) {
        scopeEntity.patchScopeEntity(uid, scope, entityData, function(err, updatedEntity) {
            res.send(updatedEntity);
        });
    });
};

customController.deleteEntity = function(req, res, next) {
    var name = req.params.name;
    entity.getUidByName(name, function(err, uid) {
        entity.deleteEntity(uid, function(err, returnData) {
            if(err) {
                return next(err);
            }
            res.send(returnData);
        });
    })
};

module.exports = customController;
