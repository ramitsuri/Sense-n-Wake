var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('../helper/dbHelper.js');

var root = __dirname;
var public = '/public/';
var views =  '/views';

module.exports = function(app){
  app.use(bodyParser.json());
  app.use(express.static(path.join(root, '../', public)));
  app.set('views', path.join(root, '../', public, views));


  app.get('/', function(request, response){
    res.sendFile(path.join(root, '../', public,'index.html'));
  });

  app.get('/hello', function(request, response){
    res.render('index.jade', {title: 'Ramit Suri'});
  });


  //trigger routes
  app.post('/trigger', function(request, response){

  });


  //db routes
  app.get('/applications', function(request, response){
    dbHelper.getAllApplications(function(applications){
      response.send(applications);
    });
  });

  app.get('/application/:appID', function(request, response){
    var appID = request.params.appID;
    dbHelper.getApplication(appID, function(application){
      response.send(application);
    });
  });

  app.put('/application', function(request, response){
    var app = request.body.application;
    dbHelper.editApplication(app.applicationID, app.sensor.sensorID, app.sensor.sensorValue, app.actuator.actionID, app.actuator.actionValue, function(data){
      response.send(data);
    });
  });

  app.delete('/application/:appID', function(request, response){
    var appID = request.params.appID;
    dbHelper.deleteApplication(appID, function(data){
      response.send(data);
    });
  });

  app.post('/application', function(request, response){
    var app = request.body.application;
    dbHelper.addApplication(app.applicationID, app.sensor.sensorID, app.sensor.sensorValue, app.actuator.actionID, app.actuator.actionValue, function(data){
      response.send(data);
    });
  });

}
