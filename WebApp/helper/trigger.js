var triggerApplication = function(actuatorID, actuatorValue, callback){
  //TO-DO find document with application.actuator.actionID = actuatorID  
  callback("hello");
}

module.exports = {
    triggerApplication: triggerApplication
  }
