var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/trigger.js');

var router = express.Router();

router.use(bodyParser.json());

router.post('/', function(request, response){
  var sensors = request.body;  
  helper.triggerApplication(sensors, function(data){
    response.send(data);
  });
});

module.exports = router;
