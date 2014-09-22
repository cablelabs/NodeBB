'use strict';
/**
* Configuration store
* @class Conf
* @module conf
*/
var Conf = {
/**
* Connection configuration to mongodb
* @property MONGO_xxx
* @type {String}
*/
	APPLICATION_PORT : 5000,
	HOST : 'localhost:5000',
//    HOST : 'raml-store.herokuapps.com',
	MONGO_COLLECTION : 'files'
};

module.exports = Conf;