var express = require('express');
var path = require('path');
var routes = require('./routes/routes.js');

var port = 1399;
var app = express();

routes(app);
app.listen(port);
