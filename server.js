var express =require('express');

var app   =  express();
var session = require('express-session');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


// OCR
var tesseract = require('node-tesseract');

tesseract.process('pic.png', (err, text) => {
    if(err){
        return console.log("An error occured: ", err);
    }

    console.log("Recognized text:");
    // the text variable contains the recognized text
    console.log(text);
});





//************************

app.listen(8000, function()
{


console.log('server running on 8000 port');

}
);
