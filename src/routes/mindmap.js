"use strict";


function mainRoutes(app, middleware, controllers) {
    app.get('/entity-map', middleware.buildHeader, controllers.mindmap.home);
}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
