
var express =require('express');
var app   =  express();
var session = require('express-session');
var indexRoute = require('./routes/index');
var bodyParser = require('body-parser');

app.set('view engine','ejs');
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: true }));

//Routes configuration

app.use(indexRoute);






app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//************************

app.listen(8000, function()
{


console.log('server running on 8000 port');

}
);
