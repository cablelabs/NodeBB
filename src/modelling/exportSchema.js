var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path  = require('path');

var entity = require('./entity');

var nameSpacePrefix = "https://diadeveloper.cablelabs.com/schema/v1/"
var schema = {
    $schema                 : "http://json-schema.org/draft-04/schema#",
    type                    : "object",
    required                : [],
    properties              : {},
    definitions             : {}
};

module.exports.generateSchema = function (name, callback) {
    getJsonSchema(name, false, function() {
        //console.log(schema);
        callback(schema);
    });

};

function getJsonSchema(name, subRef, callback) {
    var subSchema = {
        $schema                 : "http://json-schema.org/draft-04/schema#",
        type                    : "object",
        required                : [],
        properties              : {},
        definitions             : {}
    };

    if(!subRef) {
        schema.id       =   nameSpacePrefix + name;
        schema.title    =   name;
    } else {
        subSchema.id       =   nameSpacePrefix + name;
        subSchema.title    =   name;
    }

    entity.getUidByName(name.toLowerCase(), function(err, uid) {
        if(uid != null) {
            entity.getEntities([uid], function(err, entities) {
                if(err) {
                    next(err);
                }
                if(entities[0].definition != null && entities[0].definition.properties != null) {
                    var properties = entities[0].definition.properties;
                    Object.keys(properties).forEach(function(key) {

                        var val = properties[key];
                        if(JSON.stringify(val).indexOf("$ref") > 0) {
                            var refVal  = val["$ref"];
                            var typeVal = val["type"];

                            if(refVal != undefined) {
                                if(schema.definitions[refVal] == null) {
                                    getJsonSchema(refVal, true);
                                }
                                val["$ref"] = "#/definitions/" + refVal;
                            } else if(typeVal == 'array') {
                                if(schema.definitions[val["items"].$ref] == null) {
                                    getJsonSchema(val["items"].$ref, true);
                                }
                                val["items"].$ref = "#/definitions/" + val["items"].$ref;
                            }
                        }
                    });

                    console.log(name + " " + subRef + " " + JSON.stringify(properties));
                    if(!subRef) {
                        schema.properties = properties;
                        callback();
                    } else {
                        subSchema.properties = properties;
                        schema.definitions[name] = subSchema;
                    }
                }
            });
        } else if(subRef) {
            schema.definitions[name] = subSchema;
        }
    });
}