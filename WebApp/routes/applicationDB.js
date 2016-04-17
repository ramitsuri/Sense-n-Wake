var express = require('express');
var bodyParser = require('body-parser');
var dbHelper = require('../helper/applicationDB.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  dbHelper.getAllApplications(function(applications){
    response.send(applications);
  });
});

router.get('/:appID', function(request, response){
  var appID = request.params.appID;
  dbHelper.getApplication(appID, function(application){
    response.send(application);
  });
});

router.delete('/:appID', function(request, response){
  var appID = request.params.appID;
  dbHelper.deleteApplication(appID, function(data){
    response.send(data);
  });
});

//Add a new Application
router.post('/', function(request, response){
  var app = request.body.application;
  dbHelper.addApplication(app, function(data){
    response.send(data);
  });
});
//Edit the existing Application 
router.put('/', function(request, response){
  var app = request.body.application;
  dbHelper.editApplication(app, function(data){
    response.send(data);
  });
});

module.exports = router;
