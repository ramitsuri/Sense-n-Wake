var weave = require('../helper/weaveProxy.js');
var dbHelper = require('./applicationDB.js');

var triggerApplication = function(appId, callback){
  dbHelper.getApplication(appId, function(app){
    actuators = app.actuators;
    weave.processRequest(actuators, function(data){  
      console.log(data);
    });
  });

}

module.exports = {
    triggerApplication: triggerApplication
  }

