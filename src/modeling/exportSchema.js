var request = require('request'),
    async   = require('async'),
    fs      = require('fs'),
    path  = require('path');

var entity = require('./entity');

var nameSpacePrefix = "https://diadeveloper.cablelabs.com/schema/v1/"

module.exports.generateSchema = function (name, callback) {
    var schema = {
        $schema                 : "http://json-schema.org/draft-04/schema#",
        type                    : "object",
        required                : [],
        properties              : {},
        definitions             : {}
    };

    function getJsonSchema(name, cnt, subRef, callback) {
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
                                        getJsonSchema(refVal, cnt + 1, true, function() {
                                            console.log(cnt);
                                        });
                                    }
                                    val["$ref"] = "#/definitions/" + refVal;
                                } else if(typeVal == 'array') {
                                    if(schema.definitions[val["items"].$ref] == null) {
                                        cnt++;
                                        getJsonSchema(val["items"].$ref, cnt + 1, true, function() {
                                            console.log(cnt);
                                        });
                                    }
                                    val["items"].$ref = "#/definitions/" + val["items"].$ref;
                                }
                            }
                        });

                        if(!subRef) {
                            //var timeoutId = setTimeout(checkResponse, 1000);
                            //
                            //function checkResponse() {
                            //    console.log("Response "  + cnt);
                            //    if(cnt == 0) {
                            //        clearTimeout(timeoutId);
                            //        schema.properties = properties;
                            //        callback();
                            //    }
                            //}
                            //if(cnt == 0) {
                            //    clearTimeout(timeoutId);
                            //    schema.properties = properties;
                            //    callback();
                            //}
                        } else {
                            subSchema.properties = properties;
                            schema.definitions[name] = subSchema;
                            cnt--;
                        }
                    }
                });
            } else if(subRef) {
                schema.definitions[name] = subSchema;
            }
        });
    }

    function getJsonSubSchema(name, callback) {
        var cnt = 0;
        var subSchema = {
            $schema                 : "http://json-schema.org/draft-04/schema#",
            type                    : "object",
            required                : [],
            properties              : {},
            definitions             : {}
        };

        subSchema.id       =   nameSpacePrefix + name;
        subSchema.title    =   name;

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
                                        cnt++;
                                        getJsonSubSchema(refVal, function() {
                                            cnt--;
                                        });
                                    }
                                    val["$ref"] = "#/definitions/" + refVal;
                                } else if(typeVal == 'array') {
                                    if(schema.definitions[val["items"].$ref] == null) {
                                        cnt++
                                        getJsonSubSchema(val["items"].$ref, function() {
                                            cnt--;
                                        });
                                    }
                                    val["items"].$ref = "#/definitions/" + val["items"].$ref;
                                }
                            }
                        });

                        //console.log(name + " " + subRef + " " + JSON.stringify(properties));
                        //if(!subRef) {
                        //    schema.properties = properties;
                        //    callback();
                        //} else {
                        var timeoutId = setTimeout(checkResponse, 1000);

                        function checkResponse() {
                            console.log("Response - SUB "  + cnt);
                            if(cnt == 0) {
                                subSchema.properties = properties;
                                schema.definitions[name] = subSchema;
                                clearTimeout(timeoutId);
                                callback();
                            }
                        }

                        //}
                    }
                });
            }
            //else if(subRef) {
            //    schema.definitions[name] = subSchema;
            //}
        });
    }

    getJsonSchema(name, 0, false, function() {
        //console.log(schema);
        callback(schema);
    });

};