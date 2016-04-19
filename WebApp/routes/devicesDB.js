var express = require('express');
var bodyParser = require('body-parser');
var devicesHelper = require('../helper/devicesDB.js');

var router = express.Router();
router.use(bodyParser.json());

router.get('/sensors', function(request, response) {
    devicesHelper.getAllSensors(function(sensors){
        response.send(sensors)
    });
});

router.get('/actuators', function(request, response) {
    devicesHelper.getAllActuators(function(actuators){
        response.send(actuators)
    });
});

router.get('/sensor/:sensorID', function(request, response){
    var sID = request.params.sensorID;
   devicesHelper.getSensor(sID, function(sensor) {
       response.send(sensor);
   })
});

router.get('/actuator/:actuatorID', function(request, response){
    var aID = request.params.actuatorID;
    devicesHelper.getActuator(aID, function (actuator) {
        response.send(actuator);
    });
});

module.exports = router;

