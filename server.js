
var express =require('express');
var app   =  express();
var session = require('express-session');
var indexRoute = require('./routes/index');
var bodyParser = require('body-parser');

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




// OCR
var tesseract = require('node-tesseract');
var options = {
    l: 'jpn',
    psm: 6,
    // Increase the allowed amount of data in stdout
   env: {
       maxBuffer: 4096 * 4096
   }

};
tesseract.process('pic.png', options, (err, text) => {
    if(err){
        return console.log("An error occured: ", err);
    }

    console.log("Recognized text:");
    // the text variable contains the recognized text
    console.log(text);
});

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
