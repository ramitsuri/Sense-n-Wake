var mongoose = require('mongoose');
var dbModel = require('../models/logDB.js');
var Log = dbModel.log;

var getLog = function(logID, callback){
    Log.find({ logID: logID },
        function(err, foundLog) {
            if (err) console.log(err);
            callback(foundLog);
        });
}

var addLog = function(logID, activityTime, activityText, callback){
    var newLog = new Log({
        logID: logID,
        activity: {
            time: activityTime,
            text: activityText
        }
    });
    newLog.save(
        function(err){
            if (err) console.log(err);
            callback("saved");
        });
}

var getAllLogs = function(callback){
    Log
        .find({},
            null,
            {
                sort : {time : -1},
                limit : 10
            },
            function(err, logs) {
                if (err) console.log(err);
                callback(logs);
            });
}

module.exports = {
    getLog: getLog,
    addLog: addLog,
    getAllLogs: getAllLogs
}
