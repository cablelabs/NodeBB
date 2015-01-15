"use strict";


function mainRoutes(app, middleware, controllers) {
    app.get('/entity-map', middleware.buildHeader, controllers.mindmap.home);

    app.get('/documentation', middleware.buildHeader, controllers.mindmap.documentation);
}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
