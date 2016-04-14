var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/trigger.js');

var router = express.Router();

router.use(bodyParser.json());

router.post('/', function(request, response){
  console.log(request.body);
  helper.triggerApplication( request.body.actionID, request.body.actionValue, function(data){
    response.send(data);
  });
});

module.exports = router;
