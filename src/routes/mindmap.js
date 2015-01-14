"use strict";


function mainRoutes(app, middleware, controllers) {
    app.get('/mind-map', middleware.buildHeader, controllers.api);
}

module.exports = function(app, middleware, controllers) {
    mainRoutes(app, middleware, controllers);
};
