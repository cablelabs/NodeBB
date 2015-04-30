var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path  = require('path');
//config  = require(path.join(__dirname + '/settings.json'));

var entityModel  = require('./scope-entity'),
    pathModel    = require('./scope-path');

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

    //entityModel.getSwaggerCacheInfo(function(err, needRefresh) {
    //    console.log(needRefresh);
    //    if(!needRefresh) {
    //        entityModel.setSwaggerCacheInfo("true", function (err, data) {
    //            callback();
    //        });
    //    }
    //});

    //entityModel.getSwaggerCacheInfo(function(err, needRefresh) {
    //    console.log(needRefresh);
    //    if(needRefresh === "false") {
    //        callback();
    //    }
    //});

    //async.series([
    //    function(next){
            pathModel.getAllScopePathTags(function(err, tags) {
                tags.forEach(function(tag) {
                    console.log(tag);
                    async.parallel({
                        paths: function(next) {
                            pathModel.getAllScopePathFields(['name', 'definition'], tag, function(err, pathsData) {
                                var paths = {};
                                pathsData.forEach(function(item, index) {
                                    paths[item.name] = item.definition && item.definition !== 'undefined' ? JSON.parse(item.definition) : '{}';
                                });
                                next(null, paths);
                            });
                        },
                        definitions: function(next) {
                            entityModel.getAllScopeEntityFields(['name', 'displayName', 'definition'], tag, function(err, entitysData) {
                                var entities = {};
                                entitysData.forEach(function(item, index) {
                                    if(item.definition !== 'undefined' && item.definition !== '') {
                                        entities[item.name] = item.definition && item.definition !== 'undefined' ? JSON.parse(item.definition) : '{}';
                                    }
                                });
                                next(null, entities);
                            });
                        }
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
                                fs.writeFile(path.join(__dirname + '/../../public/secured/api-docs/swagger-file-' + tag + '.json'), JSON.stringify(swaggerFile, null, 4), function(err) {
                                });
                            });
                        }
                    });
                });
                callback();
            });
        //}
    //], function(err, result) {
    //    callback();
    //});
};

//fiter out paths in the swagger file that don't have the get property
function getPaths(tag, callback) {

}

//fiter out paths in the swagger file that don't have the get property
function getDefinitions(tag, callback) {

}