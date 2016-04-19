var mongoose = require('mongoose');
var dbModel = require('../models/devicesDB.js');

var Sensor = dbModel.sensor;
var Actuator = dbModel.actuator;

var getAllActuators = function(callback){
  Actuator.find({},
    function(err, actuators) {
      if (err) console.log(err);
      callback(actuators);
    });
}

var getAllSensors = function(callback){
  Sensor.find({},
    function(err, sensors) {
      if (err) console.log(err);
      callback(sensors);
    });
}

var getActuator = function(aID, callback){
  Actuator.findOne({ actuatorID: aID },
    function(err, foundActuator) {
      if (err) console.log(err);
      callback(foundActuator);
    });
}

var getSensor = function(sID, callback){
  Sensor.findOne({ sensorID: sID },
    function(err, foundSensor) {
      if (err) console.log(err);
      callback(foundSensor);
    });
}


module.exports = {
    getAllActuators: getAllActuators,
    getAllSensors: getAllSensors,
    getActuator: getActuator,
    getSensor: getSensor
}
