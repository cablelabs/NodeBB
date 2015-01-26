"use strict";


function mainRoutes(app, middleware, controllers) {
    var middlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];

    app.get('/entity-map', middleware.buildHeader, middlewares, controllers.custom.home);

    app.get('/documentation', middleware.buildHeader, middlewares, controllers.custom.documentation);


    app.get('/api/path', middlewares, controllers.custom.getpath);
}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
