var path = require('path');
var express = require('express');
var router = express.Router();

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

module.exports = router;
