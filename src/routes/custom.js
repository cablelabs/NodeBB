"use strict";


function mainRoutes(app, middleware, controllers) {
    var middlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];
    //var middlewares = [];

    app.get('/index', middleware.buildHeader, middlewares, function(req, res, next) {
    	res.redirect('/');
    });

    app.get('/', middleware.buildHeader, middlewares, controllers.custom.index);

    app.get('/about-cia', middleware.buildHeader, middlewares, controllers.custom.aboutCia);
    app.get('/getting-started', middleware.buildHeader, middlewares, controllers.custom.gettingStarted);

    app.get('/entity-map', middleware.buildHeader, middlewares, controllers.custom.entityMap);
    app.get('/documentation', middleware.buildHeader, middlewares, controllers.custom.documentation);

    // path routes
    app.get('/api/paths', middlewares, controllers.custom.getPaths);
    app.get('/api/paths/:uid', middlewares, controllers.custom.getPathById);
    app.post('/api/paths', controllers.custom.createPath);
    app.patch('/api/paths/:uid', middlewares, controllers.custom.patchPath);
    app.delete('/api/paths/:uid', middlewares, controllers.custom.deletePath);

    // entity routes
    app.get('/api/entities', middlewares, controllers.custom.getEntities);
    app.get('/api/entities/:name', middlewares, controllers.custom.getEntityByName);
    app.post('/api/entities', controllers.custom.createEntity);
    app.patch('/api/entities/:name', middlewares, controllers.custom.patchEntity);
    app.delete('/api/entities/:name', middlewares, controllers.custom.deleteEntity);

}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
