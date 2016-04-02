var express = require('express');
var path = require('path');
var routes = require('./routes/routes.js');
var port = 1399;
var app = express();

var public = __dirname + '/public/';
var views = __dirname + '/views';

app.set('views', views);
app.use(express.static(public));

routes(app);
app.listen(port);
