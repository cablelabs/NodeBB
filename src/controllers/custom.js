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

customController.getPaths = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', result);
    });
};

customController.getPathByName = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', result);
    });
};

customController.createPath = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', result);
    });
};

customController.getEntities = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', result);
    });
};

customController.getEntityByName = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', result);
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
        res.send(JSON.stringify(entityData));
    });
};

customController.entityMap = function(req, res, next) {
    async.parallel({
        header: function (next) {
            res.locals.metaTags = [{
                name: "title",
                content: meta.config.title || 'CableLabs Forums'
            }, {
                name: "description",
                content: meta.config.description || ''
            }, {
                property: 'og:title',
                content: 'Index | ' + (meta.config.title || 'CableLabs Forums')
            }, {
                property: 'og:type',
                content: 'website'
            }];

            if(meta.config['brand:logo']) {
                res.locals.metaTags.push({
                    property: 'og:image',
                    content: meta.config['brand:logo']
                });
            }

            next(null);
        },
        categories: function (next) {
            var uid = req.user ? req.user.uid : 0;
            categories.getCategoriesByPrivilege(uid, 'find', function (err, categoryData) {
                if (err) {
                    return next(err);
                }
                var childCategories = [];

                for(var i=categoryData.length - 1; i>=0; --i) {

                    if (Array.isArray(categoryData[i].children) && categoryData[i].children.length) {
                        childCategories.push.apply(childCategories, categoryData[i].children);
                    }

                    if (categoryData[i].parent && categoryData[i].parent.cid) {
                        categoryData.splice(i, 1);
                    }
                }

                async.parallel([
                    function(next) {
                        categories.getRecentTopicReplies(categoryData, uid, next);
                    },
                    function(next) {
                        categories.getRecentTopicReplies(childCategories, uid, next);
                    }
                ], function(err) {
                    next(err, categoryData);
                });
            });
        },
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
        header: function (next) {
            res.locals.metaTags = [{
                name: "title",
                content: meta.config.title || 'CableLabs Forums'
            }, {
                name: "description",
                content: meta.config.description || ''
            }, {
                property: 'og:title',
                content: 'Index | ' + (meta.config.title || 'CableLabs Forums')
            }, {
                property: 'og:type',
                content: 'website'
            }];

            if(meta.config['brand:logo']) {
                res.locals.metaTags.push({
                    property: 'og:image',
                    content: meta.config['brand:logo']
                });
            }

            next(null);
        },
        categories: function (next) {
            var uid = req.user ? req.user.uid : 0;
            categories.getCategoriesByPrivilege(uid, 'find', function (err, categoryData) {
                if (err) {
                    return next(err);
                }
                var childCategories = [];

                for(var i=categoryData.length - 1; i>=0; --i) {

                    if (Array.isArray(categoryData[i].children) && categoryData[i].children.length) {
                        childCategories.push.apply(childCategories, categoryData[i].children);
                    }

                    if (categoryData[i].parent && categoryData[i].parent.cid) {
                        categoryData.splice(i, 1);
                    }
                }

                async.parallel([
                    function(next) {
                        categories.getRecentTopicReplies(categoryData, uid, next);
                    },
                    function(next) {
                        categories.getRecentTopicReplies(childCategories, uid, next);
                    }
                ], function(err) {
                    next(err, categoryData);
                });
            });
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('custom/documentation', data);
    });
};

module.exports = customController;
