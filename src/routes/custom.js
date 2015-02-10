"use strict";


function mainRoutes(app, middleware, controllers) {
    //var middlewares = [middleware.checkIfConfirmed, middleware.incrementPageViews, middleware.updateLastOnlineTime];
    var middlewares = [];

    app.get('/entity-map', middleware.buildHeader, middlewares, controllers.custom.entityMap);

    app.get('/documentation', middleware.buildHeader, middlewares, controllers.custom.documentation);

    //app.get('/api/paths', middlewares, controllers.custom.getPaths);

    //app.post('/api/paths', middlewares, controllers.custom.getPaths);

    //app.put('/api/paths', middlewares, controllers.custom.getPaths);

    //app.get('/api/path:name', middlewares, controllers.custom.getPathByName);

    app.get('/modelling/api/entities', middlewares, controllers.custom.getEntities);

    app.get('/modelling/api/entities/:name', middlewares, controllers.custom.getEntityByName);

    app.post('/modelling/api/entities', controllers.custom.createEntity);

    app.patch('/modelling/api/entities/:name', middlewares, controllers.custom.patchEntity);

    app.delete('/modelling/api/entities/:name', middlewares, controllers.custom.deleteEntity);

}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
