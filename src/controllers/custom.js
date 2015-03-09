"use strict";

var async = require('async'),

    entity = require('../modelling/entity'),
    path = require('../modelling/path'),
    winston = require('winston'),
    apis = require('../apis'),
    announcements = require('../announcements'),
    topics = require('../topics'),
    meta = require('../meta'),
    db = require('../database'),
    events = require('../events'),
    categories = require('../categories'),
    languages = require('../languages'),
    plugins = require('../plugins'),
    widgets = require('../widgets'),
    groups = require('../groups'),
    pkg = require('../../package.json'),
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

customController.getPathById = function(req, res, next) {
    var uid = req.params.uid;
    path.getPathData(uid, function(err, paths) {
        if(err) {
            next(err);
        }
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

customController.getEntityByName = function(req, res, next) {
    var name = req.params.name;
    entity.getUidByName(name, function(err, uid) {
        entity.getEntities([uid], function(err, entities) {
            if(err) {
                next(err);
            }
            res.send(entities);
        });
    });
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
    var nameSpacePrfix = req.connection.encrypted ? "https://" : "http://" + req.get('host') + "/modelling/api/schema/";
    var schema = {
        $schema     : "http://json-schema.org/draft-04/schema#",
        id          : nameSpacePrfix + name,
        required    : [],
        properties  : {}
    };

    entity.getUidByName(name.toLowerCase(), function(err, uid) {
        entity.getEntities([uid], function(err, entities) {
            if(err) {
                next(err);
            }
            var properties = entities[0].definition.properties;

            Object.keys(properties).forEach(function(key) {
                if(doValidation()) {
                    schema.required.push(key);
                }
                var val = properties[key];
                if(JSON.stringify(val).indexOf("$ref") > 0) {
                    var refVal  = val["$ref"];
                    var typeVal = val["type"];

                    if(refVal != undefined) {
                        val["$ref"] = nameSpacePrfix + refVal;
                    } else if(typeVal == 'array') {
                        val["items"].$ref = nameSpacePrfix + val["items"].$ref;
                    }
                }
            });

            schema.properties = properties;

            res.setHeader("Content-type", "application/json");
            res.send(schema);
        });
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
