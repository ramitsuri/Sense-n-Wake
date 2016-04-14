var triggerApplication = function(actuatorID, actuatorValue, callback){
  //TO-DO find document with application.actuator.actionID = actuatorID
  console.log(actuatorID+" "+ actuatorValue);
  callback("hello");
}

module.exports = {
    triggerApplication: triggerApplication
  }
