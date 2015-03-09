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

    var apiMiddlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];

    // path routes
    var modellingPrefix = '/modelling';
    app.get(modellingPrefix + '/api/paths', apiMiddlewares, controllers.custom.getPaths);
    app.get(modellingPrefix + '/api/paths/:uid', apiMiddlewares, controllers.custom.getPathById);
    app.post(modellingPrefix + '/api/paths', controllers.custom.createPath);
    app.patch(modellingPrefix + '/api/paths/:uid', apiMiddlewares, controllers.custom.patchPath);
    app.delete(modellingPrefix + '/api/paths/:uid', apiMiddlewares, controllers.custom.deletePath);

    // entity routes
    app.get(modellingPrefix + '/api/entities', apiMiddlewares, controllers.custom.getEntities);
    app.get(modellingPrefix + '/api/entities/:name', apiMiddlewares, controllers.custom.getEntityByName);
    app.post(modellingPrefix + '/api/entities', controllers.custom.createEntity);
    app.patch(modellingPrefix + '/api/entities/:name', apiMiddlewares, controllers.custom.patchEntity);
    app.delete(modellingPrefix + '/api/entities/:name', apiMiddlewares, controllers.custom.deleteEntity);

    //schema routes
    app.get(modellingPrefix + '/api/schema/:name', apiMiddlewares, controllers.custom.getSchemaByName);

}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
