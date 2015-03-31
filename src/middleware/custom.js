"use strict";

var app,
    middleware = {},
    entityModel = require("../modeling/entity");


middleware.resetEntityCache = function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login?next=admin');
    }
    console.log("++++++++++");
    entityModel.setSwaggerCacheInfo("true", function(err) {
        next();
    })
};

module.exports = function(webserver) {
    app = webserver;
    return middleware;
};
