var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('../helper/logDB.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  dbHelper.getAllLogs(function(logs){
    response.send(logs);
  });
});

router.get('/:logID', function(request, response){
  var logID = request.params.logID;
  dbHelper.getLog(logID, function(log){
    response.send(log);
  });});

router.post('/', function(request, response){
  var log = request.body.log;
  dbHelper.addLog(log.logID, Date.now(), log.activity.text, function(data){    
    response.send(data);
  });
});

module.exports = router;
