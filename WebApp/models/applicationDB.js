var mongoose = require('mongoose');

var applicationSchema = mongoose.Schema({
  applicationID: String,
  sensor: {
    sensorID: String,
    sensorValue: String
  },
  actuator:{
    actionID: String,
    actionValue: String
  }
});

var application = mongoose.model('applications', applicationSchema);
exports.application = application;
