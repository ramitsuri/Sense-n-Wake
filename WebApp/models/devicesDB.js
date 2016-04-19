var mongoose = require('mongoose');

var sensorSchema =  mongoose.Schema({
  sensorID: String,
  sensorValues: [{
    value: String
  }]
});

var actuatorSchema = mongoose.Schema({
  actuatorID: String,
  actuatorValues: [{
    value: String
  }]
});

var sensor = mongoose.model('sensors', sensorSchema);
exports.sensor = sensor;

var actuator = mongoose.model('actuators', actuatorSchema);
exports.actuator = actuator;
