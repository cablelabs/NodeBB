var request = require('request'),
  async   = require('async'),
  fs      = require('fs'),
  path  = require('path'),
  config  = require(path.join(__dirname + '/settings.json'));

var entityModel  = require('../../modeling/entity'),
    pathModel    = require('../../modeling/path');

var entity_names = {};

module.exports.init = function (callback) {

  //each function in the water fall is performed in succession, and receives input from the previous function
  async.waterfall([
    getSwaggerFile,
    filterEndpointGet,
    buildEndpointProfiles,
    getAllEndpoints//,  
    //categorizeByDomain
  ], function(err, result) {
    if (err) {
      callback(err);
    } else {
      fs.exists(path.join(__dirname + '/../../../public/secured/mind-map/assets'), function (exists) {
        if (!exists) {
          fs.mkdirSync(path.join(__dirname + '/../../../public/secured/mind-map/assets'));
        }
        fs.writeFile(path.join(__dirname + '/../../../public/secured/mind-map/assets/links-new-format.json'), JSON.stringify(result, null, 4), function(err){
          callback();
        });

      });
    }
  });
};

//function refreshSwaggerFile(callback) {
//  require('../../modeling/swaggerBuilder').init(callback);
//}

function getSwaggerFile (callback) {

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
      "http"
    ]
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


  async.parallel({
    paths: getPaths,
    definitions: getDefinitions
  }, function(err, result) {
    if (err) {
      callback(err);
    } else {
      swaggerFile.paths = result.paths;
      swaggerFile.definitions = result.definitions;

      callback(null, swaggerFile);
    }
  });

  //fs.readFile(path.join(__dirname + '/../../../public/secured/api-docs/swagger-file.json'), "utf8", function(err, data){
  //
  //});
}

//fiter out paths in the swagger file that don't have the get property
function filterEndpointGet(body, callback) {
  async.filter(Object.keys(body.paths), function (path, cb) {
    cb(body.paths[path].hasOwnProperty('get'));
  }, function (pathNames) {
    callback(null, body, pathNames);
  });
}


//build the json object that will eventually be passed to the client
//it contains some uri info and a paths array that holds the endPoint profiles
function buildEndpointProfiles (body, pathNames, callback) {
  var result = {
    //apiUriBase: 'http://' + body.host + body.basePath,
    apiUriBase: 'http://' + body.host,
    swaggerUriBase: config.swaggerUriBase,
    paths: []
  };
  //console.log(result);
  pathNames.forEach( function (path) {
    var get = body.paths[path].get;
    var endpoint = {
      path: path,
      name: get.displayName,
      description: get.description
    };

    entity_names[getPathName(path)] = endpoint.name;

    if (get.tags.length > 0) { endpoint.domain = get.tags[0]; }

    result.paths.push(endpoint);
  });

  callback(null, result);
}


//fetch and parse the endpoints asynchronously
function getAllEndpoints (profiles, callback) {
  async.map(profiles.paths, function (path, cb) {
    parseEndpoint(path, profiles.apiUriBase, cb);
  }, function (err, paths) {
    profiles.paths = paths;
    callback(null, profiles);
  });
}


// add the 'domain' property to the payload and copy the endpoint profiles
// into their respective domains, using the info from the config file
// print each uncategorized endpoint to the console
// delete the paths property from the payload
function categorizeByDomain (profiles, callback) {

  var domains = {};

  profiles.paths.forEach( function (path) {
    if (path.hasOwnProperty('domain')) {
      if (!domains.hasOwnProperty(path.domain)) {
        domains[path.domain] = [];
      }

      insertPathInDomain(domains[path.domain], path);
      delete path.domain;
    }
  })

  delete profiles.paths;

  profiles.domains = Object.keys(domains).sort().map( function (domainName) {
    return {
      name: domainName,
      entities: domains[domainName]
    };
  });

  callback(null, profiles);
}


// fetch one endpoint, pass endpoint definition to findLinks to get endpoint relationships
function parseEndpoint (endpoint, apiUriBase, callback) {
  fetchEndpoint(endpoint, apiUriBase, function (err, response, body) {
    endpoint.links = findLinks(body, getPathName(endpoint.path));
    callback(null, endpoint);
  });
}


// fetch one endpoint
function fetchEndpoint (endpoint, apiUriBase, callback) {
  request.get({
    url: apiUriBase + endpoint.path.replace('{id}', '1'),
    headers: {
      Authorization: config.key
    },
    json: true
  }, callback);
}


// search the endpoint definition for link objects
// if the 'rel' property of the link object does not equal
// 'self', the path name, and is not already in the links array, push it in
function findLinks (obj, path, links) {

  links = links || [];

  if (Array.isArray(obj)) {

    for (var i = obj.length -1; i >= 0; i -= 1) {
      findLinks(obj[i], path, links);
    }

  } else if (typeof obj === 'object') {

    Object.keys(obj).forEach( function (key) {
      if (key === 'link') {
        obj[key].rel = obj[key].rel.replace(' ', '').toLowerCase();
        if (['self', path].indexOf(obj[key].rel) < 0 && links.indexOf(entity_names[obj[key].rel]) < 0) {
          if (entity_names[obj[key].rel]) { links.push(entity_names[obj[key].rel]); }
        } 
      } else {
        findLinks(obj[key], path, links);
      }
    });
  }

  return links;
}

function insertPathInDomain(domain, path) {
  var i = 0, len = domain.length, inserted = false;
  for (; i < len; i += 1) {
    if (path.name < domain[i].name) {
      domain.splice(i, 0, path);
      inserted = true;
      break;
    }
  }
  if (!inserted) { domain.push(path); }
  return domain;
}


function getPathName (path) {
  var re = /^\/([^\/.]*)\/{id}$/,
    match = re.exec(path);
  return match ? match[1] : null;
}