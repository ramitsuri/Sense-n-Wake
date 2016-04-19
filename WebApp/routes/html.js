var path = require('path');
var express = require('express');
var router = express.Router();

var appDBHelper = require('../helper/applicationDB')

var root = __dirname;
var public = '/public/';
var views =  '/views';

router.use(express.static(path.join(root, '../', public)));
//router.set('views', path.join(root, '../', public, views));

router.get('/', function(request, response){
  response.sendFile(path.join(root, '../', public,'index.html'));
});

router.get('/hello', function(request, response){
  response.render(path.join(root, '../', public, views,'index.jade'), {title: 'Ramit Suri'});
});

router.get('/application/get/:appID', function(request, response){

  var appID = request.params.appID;
  appDBHelper.getApplication(appID, function(application){
    //console.log(application);
    response.render(path.join(root, '../', public, views,'application.jade'), {application: application});
  });
});

module.exports = router;
