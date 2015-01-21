"use strict";


function mainRoutes(app, middleware, controllers) {
    app.get('/entity-map', middleware.buildHeader, controllers.custom.home);

    app.get('/documentation', middleware.buildHeader, controllers.custom.documentation);

    var middlewares = [middleware.incrementPageViews, middleware.updateLastOnlineTime];
    app.get('/api/path', middlewares, controllers.custom.getpath);
}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
