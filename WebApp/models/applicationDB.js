var mongoose = require('mongoose');

var applicationSchema = mongoose.Schema({
  applicationID: String,
  sensors: [{
    sensorID: String,
    sensorValue: String
  }],
  actuators:[{
    actionID: String,
    actionValue: String
  }]
});

var application = mongoose.model('applications', applicationSchema);
exports.application = application;
