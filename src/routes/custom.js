"use strict";


function mainRoutes(app, middleware, controllers) {
    //var middlewares = [middleware.checkIfConfirmed, middleware.incrementPageViews, middleware.updateLastOnlineTime];
    var middlewares = [];

    app.get('/entity-map', middleware.buildHeader, middlewares, controllers.custom.entityMap);
    app.get('/documentation', middleware.buildHeader, middlewares, controllers.custom.documentation);

    // path routes
    app.get('/modelling/api/paths', middlewares, controllers.custom.getPaths);
    app.get('/modelling/api/paths/:uid', middlewares, controllers.custom.getPathById);
    app.post('/modelling/api/paths', controllers.custom.createPath);
    app.patch('/modelling/api/paths/:uid', middlewares, controllers.custom.patchPath);
    app.delete('/modelling/api/paths/:uid', middlewares, controllers.custom.deletePath);

    // entity routes
    app.get('/modelling/api/entities', middlewares, controllers.custom.getEntities);
    app.get('/modelling/api/entities/:name', middlewares, controllers.custom.getEntityByName);
    app.post('/modelling/api/entities', controllers.custom.createEntity);
    app.patch('/modelling/api/entities/:name', middlewares, controllers.custom.patchEntity);
    app.delete('/modelling/api/entities/:name', middlewares, controllers.custom.deleteEntity);

}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
