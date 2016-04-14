var mongoose = require('mongoose');
var dbModel = require('../models/applicationDB.js');
var Application = dbModel.application;

var getApplication = function(appID, callback){
  Application.find({ applicationID: appID },
    function(err, foundApp) {
      if (err) console.log(err);
      callback(foundApp);
    });
}

var addApplication = function(appID, appSensorID, appSensorValue, appActionID, appActionValue, callback){
  var newApplication = new Application({
    applicationID: appID,
    sensor: {
      sensorID: appSensorID,
      sensorValue: appSensorValue
    },
    actuator:{
      actionID: appActionID,
      actionValue: appActionValue
    }
  });
  newApplication.save(
    function(err){
      if (err) console.log(err);
      callback("saved");
  });
}

var editApplication = function(appID, appSensorID, appSensorValue, appActionID, appActionValue, callback){
  Application.findOneAndUpdate({ applicationID: appID },
    { applicationID: appID,
      sensor: {
        sensorID: appSensorID,
        sensorValue: appSensorValue
      },
      actuator:{
        actionID: appActionID,
        actionValue: appActionValue
      }
    },
    function(err, app){
      if (err) console.log(err);
      callback("updated");
    });
}

var deleteApplication = function(appID, callback){
  Application.findOneAndRemove({ applicationID: appID },
    function(err) {
      if (err) console.log(err);
      callback("deleted");
    });
}


var getAllApplications = function(callback){
  Application.find({},
    function(err, applications) {
      if (err) console.log(err);
      callback(applications);
    });
}

module.exports = {
    getApplication: getApplication,
    addApplication: addApplication,
    getAllApplications: getAllApplications,
    editApplication: editApplication,
    deleteApplication: deleteApplication
}
