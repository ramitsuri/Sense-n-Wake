var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/trigger.js');

var router = express.Router();

router.use(bodyParser.json());

router.post('/', function(request, response){
  var actuator = request.body.actuator;
  helper.triggerApplication(actuator.actionID, actuator.actionValue, function(data){
    response.send(data);
  });
});

module.exports = router;
