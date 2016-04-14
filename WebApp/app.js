var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var applicationDBRoutes = require('./routes/applicationDB.js');
var htmlRoutes = require('./routes/html.js');
var logDBRoutes = require('./routes/logDB.js');
var triggerRoutes = require('./routes/trigger.js');

var app = express();

var ipAddress = "localhost:27017";
var dbName = "sensenwake";
var port = 1399;

mongoose.connect('mongodb://'+ ipAddress +'/'+ dbName +'');
app.use('/application', applicationDBRoutes);
app.use('/', htmlRoutes);
app.use('/log', logDBRoutes);
app.use('/trigger', triggerRoutes);

app.listen(port);
console.log("Starting on port " + port);
