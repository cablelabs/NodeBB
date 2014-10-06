"use strict";

var fs = require('fs'),
	nconf = require('nconf'),
	path = require('path'),
	winston = require('winston'),
    mime = require('mime'),
    Client = require('node-rest-client').Client;

var file = {};

function restPost(url, data, callback, errorCallBack) {
    // set content-type header and data as json in args parameter
    var args = {
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    var errorFunction = function(err){
        console.log('Something went wrong on the request', err.request.options);
    }

    if(errorCallBack != null) {
        errorFunction = errorCallBack;
    }

    client.post(url, args, callback)
        .on('error', errorFunction);
};


file.saveFileToLocal = function(filename, tempPath, callback) {

	var uploadPath = path.join(nconf.get('base_dir'), nconf.get('upload_path'), filename);

	winston.info('Saving file '+ filename +' to : ' + uploadPath);

	var is = fs.createReadStream(tempPath);
	var os = fs.createWriteStream(uploadPath);

	is.on('end', function () {
		callback(null, {
			url: nconf.get('upload_url') + filename
		});
	});

	os.on('error', function (err) {
		winston.error(err.message);
		callback(err);
	});

	is.pipe(os);
};

file.saveFileToCloud = function(filename, tempPath, callback) {

    var uploadPath = nconf.get('cloud_upload_url') + filename;

    winston.info('Saving file '+ filename +' to : ' + uploadPath);
    console.log('Saving file '+ filename +' to : ' + uploadPath);

    var content = '';

    var is = fs.createReadStream(tempPath);
    is.on('data', function(chunk) {
        content.append(chunk);
        console.log('got %d bytes of data', chunk.length);
    })
    is.on('end', function() {
        console.log('there will be no more data.');
        callback(null, {
            url: nconf.get('cloud_upload_url') + filename
        });
    });

    var file = {
        name : filename,
        path : uploadPath,
        content: content,
        type: mime.lookup(tempPath)
    }

    console.log(file);

    // Save file to cloud
    restPost(nconf.get('cloud_upload_url'), file, function(data, response){
        console.log("Success");
    }, function(err) {
        console.log("Error while saving file...");
    });


//    is.pipe(os);
};

module.exports = file;