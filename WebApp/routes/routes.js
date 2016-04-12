var path = require('path');
var express = require('express');

var root = __dirname;
var public = '/public/';
var views =  '/views';

module.exports = function(app){
app.use(express.static(path.join(root, '../', public)));
  app.set('views', path.join(root, '../', public, views));
  app.get('/', function(req, res){
    res.sendFile(path.join(root, '../', public,'index.html'));
  });

  app.get('/hello', function(req, res){
    res.render('index.jade', {title: 'Ramit Suri'});
  });
}
