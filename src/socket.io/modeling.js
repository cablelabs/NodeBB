'use strict';

var	async = require('async'),
    nconf = require('nconf'),
    user = require('../user'),
    groups = require('../groups'),
    topics = require('../topics'),
    posts = require('../posts'),
    notifications = require('../notifications'),
    messaging = require('../messaging'),
    plugins = require('../plugins'),
    utils = require('../../public/src/utils'),
    websockets = require('./index'),
    meta = require('../meta'),
    paths = require('../modeling/path'),
    scopePaths = require('../modeling/scope-path'),
    SocketModeling = {};

SocketModeling.postPath = function(socket, data, callback) {
    var userId = socket.uid;
    groups.isMember(userId, 'modeling', function(err, isMember) {
        if(!isMember) {
            return callback("User Not authorized to perform operation.");
        } else {
            scopePaths.createScopePath(data, data.scope, function(err, uid) {
                data.uid = uid;
                return callback(err ? err : data);
            });
        }
    });
};

SocketModeling.getProfile = function(socket, data, callback) {
    if(!data || !data.uid) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    if(socket.uid === parseInt(data.uid, 10)) {
        return user.updateProfile(socket.uid, data, callback);
    }

    user.isAdministrator(socket.uid, function(err, isAdmin) {
        if(err) {
            return callback(err);
        }

        if(!isAdmin) {
            return callback(new Error('[[error:no-privileges]]'));
        }

        user.updateProfile(data.uid, data, callback);
    });
};

SocketModeling.changePicture = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    var type = data.type;

    function changePicture(uid, callback) {
        user.getUserField(uid, type, function(err, picture) {
            if(err) {
                return callback(err);
            }

            user.setUserField(uid, 'picture', picture, callback);
        });
    }

    if (type === 'gravatar') {
        type = 'gravatarpicture';
    } else if (type === 'uploaded') {
        type = 'uploadedpicture';
    } else {
        return callback(new Error('[[error:invalid-image-type]]'));
    }

    if(socket.uid === parseInt(data.uid, 10)) {
        changePicture(socket.uid, function(err) {
            if(err) {
                return callback(err);
            }
        });
        return;
    }

    user.isAdministrator(socket.uid, function(err, isAdmin) {
        if(err) {
            return callback(err);
        }

        if(!isAdmin) {
            return callback(new Error('[[error:no-privileges]]'));
        }

        changePicture(data.uid, callback);
    });
};

/* Exports */

module.exports = SocketModeling;
