var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path    = require('path'),
    db      = require('../database');
    //config  = require(path.join(__dirname + '/settings.json'));

var entityModel  = require('./entity'),
    pathModel    = require('./path');

var entity_names = {};

module.exports.init = function (callback) {

    //each function in the water fall is performed in succession, and receives input from the previous function
    async.waterfall([
        getSwaggerFile,
        parsePaths
    ], function(err, result) {
        if (err) {
            callback(err);
        } else {
            //fs.exists(path.join(__dirname + '/../../public/secured/mind-map/assets'), function (exists) {
            //    if (!exists) {
            //        fs.mkdirSync(path.join(__dirname + '/../../public/secured/mind-map/assets'));
            //    }
            //    fs.writeFile(path.join(__dirname + '/../../public/secured/mind-map/assets/temp.json'), JSON.stringify(result, null, 4));
            //    callback();
            //});
        }
    });
};

function getSwaggerFile (callback) {
    callback(null, require('../../public/secured/api-docs/swagger-file-working.json'));
}

//fiter out paths in the swagger file that don't have the get property
function parsePaths(body, callback) {
    async.map(Object.keys(body.paths), function (path, cb) {
        var definition = JSON.stringify(body.paths[path]);

        console.log("Disector:" + definition);

        var pathData = {
            'name': path,
            'displayName': '',
            'createdate': Date.now(),
            'domain': '',
            'tags': '',
            'pathviews': 0,
            'definition': body.paths[path]
        };

        pathModel.createPath(pathData, function(err, uid) {
            cb(null, pathData);
        });

    }, function(err, path) {
        async.map(Object.keys(body.definitions), function (entityName, cb) {
            var pathData = {
                'name': entityName.toLowerCase(),
                'displayName': entityName,
                'createdate': Date.now(),
                'domain': '',
                'tags': '',
                'entityviews': 0,
                'definition': body.definitions[entityName]
            };

            entityModel.createEntity(pathData, function(err, uid) {
                cb(null, pathData);
            });

        }, function(err, path) {
            callback(null, path);
        });
    });
}

//fiter out paths in the swagger file that don't have the get property
function parseDefinitions(body, callback) {

}