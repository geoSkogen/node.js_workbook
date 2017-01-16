var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var formidable = require('formidable');
var credentials = require('./credentials.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(function(req, res, next) {
  console.log('requested file: ' + req.url);
  next();
});

app.get('/home', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact', {csrf: 'CSRF token here'});
});

app.get('/submitted', function(req, res) {
  res.render('submitted');
});

app.post('/process', function(req, res) {
  console.log('Form: ' + req.query.form);
  console.log('CSRF token: ' + req.body._csrf);
  console.log('email: ' + req.body.email);
  console.log('question: ' + req.body.ques);
  res.redirect(303, '/submitted');
});

app.use(function(req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404');
})

app.use(function(req, res) {
  res.type('text/html');
  res.status(500);
  res.render('500');
})





var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port

  console.log("app listening at port %s", port);
});
