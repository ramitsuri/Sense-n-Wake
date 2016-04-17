
var mongoose = require('mongoose');
var dbModel = require('../models/applicationDB.js');
var Application = dbModel.application;

var triggerApplication = function(paramsensorID, paramsensorValue, callback){ //In beacon case we are not using the value but once we detect the beacon , actuator value is set according to the rule
    Application.find({"sensor.sensorID": "sensor4"},
        function(err, app){
            if (err) console.log(err);
            console.log(app);
            if(app[0])
            callback(app[0].actuator);
            else
                callback("Sensor  Id not found in DB");
        });

};

module.exports = {
    triggerApplication: triggerApplication
}

