var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('../helper/applicationDB.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  dbHelper.getAllApplications(function(applications){
    response.send(applications);
  });
});

router.get('/:appID', function(request, response){
  var appID = request.params.appID;
  dbHelper.getApplication(appID, function(application){
    response.send(application);
  });
});

router.put('/', function(request, response){
  var app = request.body.application;
  dbHelper.editApplication(app.applicationID, app.sensor.sensorID, app.sensor.sensorValue, app.actuator.actionID, app.actuator.actionValue, function(data){
    response.send(data);
  });
});

router.delete('/:appID', function(request, response){
  var appID = request.params.appID;
  dbHelper.deleteApplication(appID, function(data){
    response.send(data);
  });
});

router.post('/', function(request, response){
  var app = request.body.application;
  dbHelper.addApplication(app.applicationID, app.sensor.sensorID, app.sensor.sensorValue, app.actuator.actionID, app.actuator.actionValue, function(data){
    response.send(data);
  });
});

module.exports = router;
