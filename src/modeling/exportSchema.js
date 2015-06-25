var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path  = require('path');

var entity = require('./entity');
var scopeEntity = require('./scope-entity');

var nameSpacePrefix = "https://diadeveloper.cablelabs.com/schema/v1/"

module.exports.generateSchema = function (name, callback) {
    var schema = {
        $schema                 : "http://json-schema.org/draft-04/schema#",
        type                    : "object",
        required                : [],
        properties              : {},
        definitions             : {}
    };
    var definitions = [];

    function getJsonSchema(name, subRef, next) {
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

        entity.getScopeUidByName(name.toLowerCase(), function(err, uid) {
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
                                        // Add the type to definition array for processing later.
                                        definitions.push(refVal);
                                    }
                                    val["$ref"] = "#/definitions/" + refVal;
                                } else if(typeVal == 'array') {
                                    if(schema.definitions[val["items"].$ref] == null) {
                                        // Add the type to definition array for processing later.
                                        definitions.push(val["items"].$ref);
                                    }
                                    val["items"].$ref = "#/definitions/" + val["items"].$ref;
                                }
                            }
                        });

                        if(!subRef) {
                            schema.properties = properties;
                            next();
                        } else {
                            subSchema.properties = properties;
                            schema.definitions[name] = subSchema;
                            next();
                        }
                    } else {
                        schema.definitions[name] = subSchema;
                        next();
                    }
                });
            } else if(subRef) {
                schema.definitions[name] = subSchema;
                next();
            }
        });
    }

    getJsonSchema(name, false, function() {
        // Recursive function fetch all the definitions of the types inside definitions array.
        (function insertOne() {
            var def = definitions.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
            getJsonSchema(def, true, function(err) {
                if (err) { callback(err); return }

                // Items get added to definition array and they get deleted when they are processed.
                // Check to end recursion.
                if (definitions.length == 0) {
                    callback(schema);
                } else {
                    // recursive call.
                    insertOne();
                }
            })
        })();
    });
};


module.exports.generateScopeSchema = function (name, scope, callback) {
    var schema = {
        $schema                 : "http://json-schema.org/draft-04/schema#",
        type                    : "object",
        required                : [],
        properties              : {},
        definitions             : {}
    };
    var definitions = [];

    function getJsonSchema(name, subRef, next) {
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

        scopeEntity.getScopeUidByName(name, scope, function(err, uid) {
            if(uid != null) {
                scopeEntity.getScopeEntities([uid], scope, function(err, entities) {
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
                                        // Add the type to definition array for processing later.
                                        definitions.push(refVal);
                                    }
                                    val["$ref"] = "#/definitions/" + refVal;
                                } else if(typeVal == 'array') {
                                    if(schema.definitions[val["items"].$ref] == null) {
                                        // Add the type to definition array for processing later.
                                        definitions.push(val["items"].$ref);
                                    }
                                    val["items"].$ref = "#/definitions/" + val["items"].$ref;
                                }
                            }
                        });

                        if(!subRef) {
                            schema.properties = properties;
                            next();
                        } else {
                            subSchema.properties = properties;
                            schema.definitions[name] = subSchema;
                            next();
                        }
                    } else {
                        schema.definitions[name] = subSchema;
                        next();
                    }
                });
            } else if(subRef) {
                schema.definitions[name] = subSchema;
                next();
            }
        });
    }

    getJsonSchema(name, false, function() {
        // Recursive function fetch all the definitions of the types inside definitions array.
        (function insertOne() {
            var def = definitions.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
            getJsonSchema(def, true, function(err) {
                if (err) { callback(err); return }

                // Items get added to definition array and they get deleted when they are processed.
                // Check to end recursion.
                if (definitions.length == 0) {
                    callback(schema);
                } else {
                    // recursive call.
                    insertOne();
                }
            })
        })();
    });
};
