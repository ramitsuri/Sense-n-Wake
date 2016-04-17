var https = require('https');
var request  = require('request');
var weaveProxyAddress = "http://gaia.cise.ufl.edu:1398";
var weaveProxyAddressOmega = "http://omega.myusc.net:1398";
var weaveProxyAddressLocal = "http://localhost:1399";


var processRequest = function(actuators, callback){

  for(var i in actuators){
    sendRequest(actuators[i].actionID, actuators[i].actionValue, callback);
  }
}


var sendRequest = function(actionID, actionValue, callback){
  console.log(weaveProxyAddress + '/' + actionID +'/'+ actionValue);
    request(weaveProxyAddress + '/' + actionID +'/'+ actionValue , function (error, response, body) {
    callback(body);
  });
}

module.exports = {
    processRequest: processRequest
}
