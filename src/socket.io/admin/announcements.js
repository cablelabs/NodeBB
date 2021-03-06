"use strict";

var async = require('async'),

    groups = require('../../groups'),
    user = require('../../user'),
    announcements = require('../../announcements'),
    privileges = require('../../privileges'),
    Announcements = {};

Announcements.create = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    announcements.create(data, callback);
};

Announcements.purge = function(socket, cid, callback) {
    announcements.purge(cid, callback);
};

Announcements.update = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    announcements.update(data, callback);
};

Announcements.search = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    var	username = data.username,
        cid = data.cid;

    user.search(username, function(err, data) {
        if (err) {
            return callback(err);
        }

        async.map(data.users, function(userObj, next) {
            privileges.announcements.userPrivileges(cid, userObj.uid, function(err, privileges) {
                if(err) {
                    return next(err);
                }

                userObj.privileges = privileges;
                next(null, userObj);
            });
        }, callback);
    });
};

Announcements.setPrivilege = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    groups[data.set ? 'join' : 'leave']('cid:' + data.cid + ':privileges:' + data.privilege, data.uid, callback);
};

Announcements.getPrivilegeSettings = function(socket, cid, callback) {
    var privileges = ['find', 'read', 'topics:create', 'topics:reply', 'mods'];

    async.reduce(privileges, [], function(members, privilege, next) {
        groups.get('cid:' + cid + ':privileges:' + privilege, { expand: true }, function(err, groupObj) {
            if (!err) {
                members = members.concat(groupObj.members);
            }

            next(null, members);
        });
    }, function(err, members) {
        // Remove duplicates
        var	present = [],
            x = members.length,
            uid;
        while(x--) {
            uid = parseInt(members[x].uid, 10);
            if (present.indexOf(uid) !== -1) {
                members.splice(x, 1);
            } else {
                present.push(uid);
            }
        }

        callback(err, members);
    });
};

Announcements.setGroupPrivilege = function(socket, data, callback) {
    if(!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }

    groups[data.set ? 'join' : 'leave']('cid:' + data.cid + ':privileges:' + data.privilege, data.name, function (err) {
        if (err) {
            return callback(err);
        }

        groups.hide('cid:' + data.cid + ':privileges:' + data.privilege, callback);
    });
};

Announcements.groupsList = function(socket, cid, callback) {
    groups.list({
        expand: false,
        showSystemGroups: true
    }, function(err, data) {
        if(err) {
            return callback(err);
        }

        async.map(data, function(groupObj, next) {
            privileges.announcements.groupPrivileges(cid, groupObj.name, function(err, privileges) {
                if(err) {
                    return next(err);
                }

                groupObj.privileges = privileges;
                next(null, groupObj);
            });
        }, callback);
    });
};

module.exports = Announcements;