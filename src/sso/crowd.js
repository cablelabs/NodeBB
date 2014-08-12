"use strict";

var AtlassianCrowd = require('atlassian-crowd');

var options = {
    "crowd": {
        "base": "http://10.5.0.171:8095/crowd"
    },
    "application": {
        "name": "ethercat",
        "password": "3th3rN3t!C@t"
    }
}

var crowd = new AtlassianCrowd(options);

exports.crowd_ping = function() {
    crowd.ping(function (err, res) {
        if(err) {
            throw err;
        }
        else {
            console.log(res)
        }
    });
};

exports.crowd_search = function(username) {
    crowd.search('user', 'firstName="' + username + '*"', function (err, res) {
        if(err) {
            throw err;
        }
        else {
            console.log(res);
        }
    });
}


