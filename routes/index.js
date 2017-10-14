var express             = require("express");
var router              = express.Router();
var lang                = 'english';
var shlang              = 'eng';

var watson = require('watson-developer-cloud');
var language_translator = watson.language_translator({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  username: "7eaba3c5-a26f-4ff4-924e-176a6e2940c9",
  password: "dvwLp6JdVlrE",
  version: 'v2'
});

var request = require('request')
var fs = require('fs');

var imgUrl;

var fileName = 'pic.jpg';
const Translate = require('@google-cloud/translate');
var translate   = Translate();




//landing page
router.get("/",function(req, res){
 res.render("landing.ejs");
});

router.get("/index",function(req,res){
  res.render("index.ejs")
})

router.post('/index', function(req,res)
{

lang = req.body.lang;
console.log(lang);

res.redirect('/options');


}
);

router.get('/options', function(req,res){

res.render('buttons');


});

// router.post('/urldata', function(req,res)
// {
//
// //  var writeFileStream = fs.createWriteStream(fileName);
// //
// // request(imgUrl).pipe(writeFileStream).on('close', function() {
// //   console.log(imgUrl, 'saved to', fileName)
// // });
//
// });




//OCR
router.post('/recimage',function(req,res){

  imgUrl = req.body.url;
var writeFileStream = fs.createWriteStream(fileName)

request(imgUrl).pipe(writeFileStream).on('close', function() {
  console.log(imgUrl, 'saved to', fileName);

  switch(lang){
  case 'english': shlang = 'eng';
                  break;
  case 'japanese': shlang ='jpn';
                    break;
  case 'german' :   shlang ='deu';
                    break;
  case 'french' :   shlang ='fra';
                    break;
  case 'arabic':   shlang = 'ara';
                    break;
  case 'chineese':  shlang ='chi_sim';
                   break;
  }



  var tesseract = require('node-tesseract');


  var options = {
      l: 'chi_sim',
      psm: 6,
      // Increase the allowed amount of data in stdout
     env: {

         maxBuffer: 4096 * 4096
     }

  };
  tesseract.process(fileName, options, (err, text) => {
      if(err){
          return console.log("An error occured: ", err);
      }

      console.log("Recognized text:");
      // the text variable contains the recognized text
      console.log(text);
      language_translator.identify({ text: text},
  function(err, identifiedLanguages) {
    if (err)
      console.log(err)
    else{
      console.log(identifiedLanguages.languages[0].language);
      var detectedLanguage = identifiedLanguages.languages[0].language;

      switch(lang){
        case 'japanese': shlang = 'ja';
                  break;
        case 'english': shlang='en-us';
                      break;
        case 'arabic' : shlang ='ar-sa'
         break;
         case 'hindi' : shlang ='hi';
         break;

         case 'german' : shlang = 'de';
                     break;

         case 'french' : shlang = 'fr';
                    break;


      }


      language_translator.translate({
          text: text,
          source: detectedLanguage,
          target: shlang
        }, function(err, translation) {
          if (err)
            console.log(err)
          else
            console.log(translation.translation[0].translation);
      });


    }
});



  });
});

  console.log(req.body.url);

  //IBM translate




});
//*************************************

module.exports  =  router;
