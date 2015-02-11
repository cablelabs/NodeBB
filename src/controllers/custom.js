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

customController.entityMap = function(req, res, next) {
    async.series({
        //header: function (next) {
        //    res.locals.metaTags = [{
        //        name: "title",
        //        content: meta.config.title || 'CableLabs Forums'
        //    }, {
        //        name: "description",
        //        content: meta.config.description || ''
        //    }, {
        //        property: 'og:title',
        //        content: 'Index | ' + (meta.config.title || 'CableLabs Forums')
        //    }, {
        //        property: 'og:type',
        //        content: 'website'
        //    }];
        //
        //    if(meta.config['brand:logo']) {
        //        res.locals.metaTags.push({
        //            property: 'og:image',
        //            content: meta.config['brand:logo']
        //        });
        //    }
        //
        //    next(null);
        //},
        //categories: function (next) {
        //    var uid = req.user ? req.user.uid : 0;
        //    categories.getCategoriesByPrivilege(uid, 'find', function (err, categoryData) {
        //        if (err) {
        //            return next(err);
        //        }
        //        var childCategories = [];
        //
        //        for(var i=categoryData.length - 1; i>=0; --i) {
        //
        //            if (Array.isArray(categoryData[i].children) && categoryData[i].children.length) {
        //                childCategories.push.apply(childCategories, categoryData[i].children);
        //            }
        //
        //            if (categoryData[i].parent && categoryData[i].parent.cid) {
        //                categoryData.splice(i, 1);
        //            }
        //        }
        //
        //        async.parallel([
        //            function(next) {
        //                categories.getRecentTopicReplies(categoryData, uid, next);
        //            },
        //            function(next) {
        //                categories.getRecentTopicReplies(childCategories, uid, next);
        //            }
        //        ], function(err) {
        //            next(err, categoryData);
        //        });
        //    });
        //},
        refresh: function (next) {
            // Refreshing link.json for mind-map
            var linkparser = require('../controllers/mind-map/linkParser_new-format');
            linkparser.init(function(err){
                if(err) {
                    winston.error('Error Processing links.json for mindmap: ' + err);
                } else {
                    winston.info("MIND MAP:: Refreshed links.json file");
                }
            });
            // TODO :: Need to move this on the callback inside init. The line above.
            next(null);
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('custom/entity-map', data);
    });
};

customController.documentation = function(req, res, next) {
    async.parallel({
        //header: function (next) {
        //    res.locals.metaTags = [{
        //        name: "title",
        //        content: meta.config.title || 'CableLabs Forums'
        //    }, {
        //        name: "description",
        //        content: meta.config.description || ''
        //    }, {
        //        property: 'og:title',
        //        content: 'Index | ' + (meta.config.title || 'CableLabs Forums')
        //    }, {
        //        property: 'og:type',
        //        content: 'website'
        //    }];
        //
        //    if(meta.config['brand:logo']) {
        //        res.locals.metaTags.push({
        //            property: 'og:image',
        //            content: meta.config['brand:logo']
        //        });
        //    }
        //
        //    next(null);
        //},
        //categories: function (next) {
        //    var uid = req.user ? req.user.uid : 0;
        //    categories.getCategoriesByPrivilege(uid, 'find', function (err, categoryData) {
        //        if (err) {
        //            return next(err);
        //        }
        //        var childCategories = [];
        //
        //        for(var i=categoryData.length - 1; i>=0; --i) {
        //
        //            if (Array.isArray(categoryData[i].children) && categoryData[i].children.length) {
        //                childCategories.push.apply(childCategories, categoryData[i].children);
        //            }
        //
        //            if (categoryData[i].parent && categoryData[i].parent.cid) {
        //                categoryData.splice(i, 1);
        //            }
        //        }
        //
        //        async.parallel([
        //            function(next) {
        //                categories.getRecentTopicReplies(categoryData, uid, next);
        //            },
        //            function(next) {
        //                categories.getRecentTopicReplies(childCategories, uid, next);
        //            }
        //        ], function(err) {
        //            next(err, categoryData);
        //        });
        //    });
        //},
        refresh: function (next) {
            // Refreshing link.json for mind-map
            var swaggerBuilder = require('../modelling/swaggerBuilder');
            swaggerBuilder.init(function(err){
                if(err) {
                    winston.error('Error Processing swagger-file.json for mindmap: ' + err);
                } else {
                    winston.info("SWAGGER FILE :: Refreshed swagger-file.json");
                }
            });
            // TODO :: Need to move this on the callback inside init. The line above.
            next(null);
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('custom/documentation', data);
    });
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
        entity.getEntityData(uid, function(err, entities) {
            if(err) {
                next(err);
            }
            res.send(entities);
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
