"use strict";


function mainRoutes(app, middleware, controllers) {
    //var middlewares = [middleware.checkIfConfirmed, middleware.incrementPageViews, middleware.updateLastOnlineTime];
    var middlewares = [];

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
