var mongoose = require('mongoose');
var dbModel = require('../models/applicationDB.js');
var Application = dbModel.application;

var getApplication = function(appID, callback){
  Application.findOne({ _id: appID },
    function(err, foundApp) {
      if (err) console.log(err);
      callback(foundApp);
    });
}

var addApplication = function(app, callback){
  var newApplication = new Application({
    applicationID: app.applicationID,
    sensors: app.sensors,
    actuators:app.actuators
  });
  newApplication.save(
    function(err){
      if (err) console.log(err);
      callback("saved");
  });
}

var editApplication = function(givenapp, callback){
  Application.findOneAndUpdate({ applicationID: givenapp.applicationID },{sensors: givenapp.sensors, actuators:givenapp.actuators},
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
