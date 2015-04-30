"use strict";


function mainRoutes(app, middleware, controllers) {
    var middlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];

    middlewares = middlewares.concat([middleware.redirectToLoginIfGuest]);

    app.get('/', middleware.buildHeader, middlewares, function(req, res, next) {
    	res.redirect('/home');
    });
    app.get('/home', middleware.buildHeader, middlewares, controllers.custom.index);

    app.get('/about-cia', middleware.buildHeader, middlewares, controllers.custom.aboutCia);
    app.get('/getting-started', middleware.buildHeader, middlewares, controllers.custom.gettingStarted);

    app.get('/entity-map', middleware.buildHeader, middlewares, controllers.custom.entityMap);
    app.get('/documentation', middleware.buildHeader, middlewares, controllers.custom.documentation);

    app.get('/scope/:scopeName', middleware.buildHeader, middlewares, controllers.custom.documentationtr069);

    var apiMiddlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];
    var updateApiMiddlewares = [middleware.custom.resetEntityCache, middleware.incrementPageViews, middleware.updateLastOnlineTime];

    // path routes
    var modellingPrefix = '/modeling';
    app.get(modellingPrefix + '/api/paths', apiMiddlewares, controllers.custom.getPaths);
    app.get(modellingPrefix + '/api/paths/:uid', apiMiddlewares, controllers.custom.getPathById);
    app.post(modellingPrefix + '/api/paths', updateApiMiddlewares, controllers.custom.createPath);
    app.patch(modellingPrefix + '/api/paths/:uid', updateApiMiddlewares, controllers.custom.patchPath);
    app.delete(modellingPrefix + '/api/paths/:uid', updateApiMiddlewares, controllers.custom.deletePath);

    // entity routes
    app.get(modellingPrefix + '/api/entities', apiMiddlewares, controllers.custom.getEntities);
    app.get(modellingPrefix + '/api/entities/:name', apiMiddlewares, controllers.custom.getEntityByName);
    app.post(modellingPrefix + '/api/entities', updateApiMiddlewares, controllers.custom.createEntity);
    app.patch(modellingPrefix + '/api/entities/:name', updateApiMiddlewares, controllers.custom.patchEntity);
    app.delete(modellingPrefix + '/api/entities/:name', updateApiMiddlewares, controllers.custom.deleteEntity);

    // Scope path routes
    app.get(modellingPrefix + '/api/:scope/paths', apiMiddlewares, controllers.custom.getScopePaths);
    app.get(modellingPrefix + '/api/:scope/paths/:uid', apiMiddlewares, controllers.custom.getScopePathById);
    app.post(modellingPrefix + '/api/:scope/paths', apiMiddlewares, controllers.custom.createScopePath);
    app.patch(modellingPrefix + '/api/:scope/paths/:uid', apiMiddlewares, controllers.custom.patchScopePath);
    //app.delete(modellingPrefix + '/api/scope/paths/:uid', apiMiddlewares, controllers.custom.deletePath);

    // Scope entity routes
    //app.get(modellingPrefix + '/api/:scope/entities/:name', apiMiddlewares, controllers.custom.getCustomScopeEntities);

    app.get(modellingPrefix + '/api/:scope/entities', apiMiddlewares, controllers.custom.getScopeEntities);
    app.get(modellingPrefix + '/api/:scope/entities/:name', apiMiddlewares, controllers.custom.getScopeEntityByName);
    app.post(modellingPrefix + '/api/:scope/entities', apiMiddlewares, controllers.custom.createScopeEntity);
    app.patch(modellingPrefix + '/api/:scope/entities/:name', apiMiddlewares, controllers.custom.patchScopeEntity);
    //app.delete(modellingPrefix + '/api/scope/entities/:name', apiMiddlewares, controllers.custom.deleteEntity);

    //schema routes
    app.get(modellingPrefix + '/api/schema/:name', apiMiddlewares, controllers.custom.getSchemaByName);

    // Export
    app.get(modellingPrefix + '/api/export', apiMiddlewares, controllers.custom.exportSchemas);

    app.get(modellingPrefix + '/api/export/:name', apiMiddlewares, controllers.custom.exportSchemaByName);

}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
