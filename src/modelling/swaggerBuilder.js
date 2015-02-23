var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path  = require('path');
//config  = require(path.join(__dirname + '/settings.json'));

var entityModel  = require('./entity'),
    pathModel    = require('./path');

var swaggerFile = {
    "swagger": "2.0",
    "info": {
        "description": "Explore the cable APIs. APIs are grouped by Domain.",
        "version": "0.0.1",
        "title": "Cable API"
    },
    "host": "cable-api.herokuapp.com",
    "basePath": "/api-docs",
    "schemes": [
        "https"
    ]
};

module.exports.init = function (callback) {

    //db.setObjectField('entityname:uid', entityData.name, uid);

    //db.getObjectField('cache:info', 'swagger', callback);

    //each function in the water fall is performed in succession, and receives input from the previous function
    async.parallel({
        paths: getPaths,
        definitions: getDefinitions
    }, function(err, result) {
        if (err) {
            callback(err);
        } else {
            swaggerFile.paths = result.paths;
            swaggerFile.definitions = result.definitions;
            fs.exists(path.join(__dirname + '/../../public/secured/api-docs'), function (exists) {
                if (!exists) {
                    fs.mkdirSync(path.join(__dirname + '/../../public/secured/api-docs'));
                }
                fs.writeFile(path.join(__dirname + '/../../public/secured/api-docs/swagger-file.json'), JSON.stringify(swaggerFile, null, 4), function(err) {
                    callback();
                });

            });
        }
    });
};

//fiter out paths in the swagger file that don't have the get property
function getPaths(callback) {
    pathModel.getAllPathFields(['name', 'definition'], function(err, pathsData) {
        var paths = {};
        pathsData.forEach(function(item, index) {
            paths[item.name] = JSON.parse(item.definition);
        });
        callback(null, paths);
    });
}

//fiter out paths in the swagger file that don't have the get property
function getDefinitions(callback) {
    entityModel.getAllEntityFields(['displayName', 'definition'], function(err, entitysData) {
        var entities = {};
        entitysData.forEach(function(item, index) {
            if(item.definition !== 'undefined' && item.definition !== '') {
                entities[item.displayName] = JSON.parse(item.definition);
            }
        });
        callback(null, entities);
    });
}