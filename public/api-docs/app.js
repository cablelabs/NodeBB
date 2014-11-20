var express = require('express');
var app = express();
var parser = require('./parser');
var server = require('http').createServer(app);

var json = function(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

    if(typeof data === "string") res.write(data);

    else res.write(JSON.stringify(data));

    res.end();
};

app.get('/', parser);

server.listen(5000);
