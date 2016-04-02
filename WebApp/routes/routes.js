module.exports = function(app){


  app.get('/', function(req, res){
    res.sendFile(public);
  });

  app.get('/hello', function(req, res){
    res.render('index.jade', {title: 'Ramit Suri'});
  });
}
