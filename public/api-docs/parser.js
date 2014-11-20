var fs = require('fs');
var async = require('async');
var jf = require('jsonfile');
var util = require('util');

var output = '[';
var template = {};
var requests = [];

module.exports = function(req, res) {
    jf.readFile('./input/billcharge.json', function(err, template) {
        jf.readFile('./input/postman.json', function(err, postman) {
            for(var cnt in postman.requests) {
                var request = postman.requests[cnt];

                var endpointName = getEndpoint(request.url);
                var tagName = request.name;

                var firstWord = tagName.match('(^[A-Z].[a-z]*)')[1];
                var displayName = tagName.replace(firstWord, firstWord + ' ');

                // Apply Template
                //applyTemplate(endpointName, tagName, displayName);

                var templateString = JSON.stringify(template);

                templateString = templateString.replace(/#endpointName/g, endpointName);
                templateString = templateString.replace(/#tagName/g, tagName);
                templateString = templateString.replace(/#displayName/g, displayName);

                console.log(templateString.substring(1, templateString.length -1));

                output += templateString;

            }
        });

    });

    processRequests(requests);

    output += ']';
    //console.log(output);

    jf.writeFileSync('./input/output.json', JSON.parse(output))

    res.send('{"status" : "Dumped it, check it out" }');
};

function applyTemplate(endpointName, tagName, displayName) {
    var templateString = JSON.stringify(template);

    templateString = templateString.replace("#endpointName", endpointName);
    templateString = templateString.replace("#tagName", tagName);
    templateString = templateString.replace("#displayName", displayName);

    console.log(templateString);

    output += templateString;
}

function processRequests(requests) {
    for(var cnt in requests) {
        var request = requests[cnt];

        var endpointName = getEndpoint(request.url);
        var tagName = request.name;

        var firstWord = tagName.match('(^[A-Z].[a-z]*)')[1];
        var displayName = tagName.replace(firstWord, firstWord + ' ');

        // Apply Template
        applyTemplate(endpointName, tagName, displayName);
    }
}

function getEndpoint(url) {
    return url.match('.*}(.*)\/')[1];
}