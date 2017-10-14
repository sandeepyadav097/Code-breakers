var express             = require("express");
var router              = express.Router();
var lang                = 'english';
var shlang              = 'eng';
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var watson = require('watson-developer-cloud');
var language_translator = watson.language_translator({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  username: "7eaba3c5-a26f-4ff4-924e-176a6e2940c9",
  password: "dvwLp6JdVlrE",
  version: 'v2'
});
var text_to_speech= new TextToSpeechV1(
  {
    // if left unspecified here, the SDK will fall back to the TEXT_TO_SPEECH_USERNAME and TEXT_TO_SPEECH_PASSWORD
    // environment properties, and then Bluemix's VCAP_SERVICES environment property
    username: '2fff705f-064f-408f-96af-0ee9eb9fd3a3',
    password: 'NrntiwGWDjVb',
    headers: {
   'X-Watson-Learning-Opt-Out': 'true'
 }
  }
);

var request = require('request')
var fs = require('fs');

var imgUrl;

var fileName = 'pic.png';
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
router.post('/recimg', function(req,res)
{

console.log(req.body.filename);
file = __dirname+'/req.body.filename';

var writeFileStream = fs.createWriteStream(file);
var tesseract = require('node-tesseract');


var options = {
    l: 'fr',
    psm: 6,
    // Increase the allowed amount of data in stdout
   env: {

       maxBuffer: 4096 * 4096
   }

};

tesseract.process(file, options, (err, text) => {
    if(err){
        return console.log("An error occured: ", err);
    }


    // the text variable contains the recognized text
    console.log("Recognized text:");
    console.log(text);





}



);
});

router.post('/recimage',function(req,res){

  imgUrl = req.body.url;


var writeFileStream = fs.createWriteStream(fileName)

request(imgUrl).pipe(writeFileStream).on('close', function() {
  console.log(imgUrl, 'saved to', fileName);

  // switch(lang){
  // case 'english': shlang = 'eng';
  //                 break;
  // case 'japanese': shlang ='jpn';
  //                   break;
  // case 'german' :   shlang ='deu';
  //                   break;
  // case 'french' :   shlang ='fra';
  //                   break;
  // case 'arabic':   shlang = 'ara';
  //                   break;
  // case 'chineese':  shlang ='chi_sim';
  //                  break;
  // }



  var tesseract = require('node-tesseract');


  var options = {
      l: 'fra',
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

      // the text variable contains the recognized text
      console.log("Recognized text:");
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
          else{
            console.log(translation);
            console.log(translation.translations[0].translation);
            var translation = translation.translations[0].translation;
            // var translation = translation.translation[0].translation;
            res.render('show',{text:text, translation:translation});

            var params = {
    text: translation,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  };

  // Pipe the synthesized text to a file.
  text_to_speech.synthesize(params).on('error', function(error) {
    console.log('Error:', error);
  }).pipe(fs.createWriteStream('hello_world.wav'));

}
      });




    }
});



  });
});

  console.log(req.body.url);

  //IBM translate




});

router.get('/show', function(req, res)
{

  res.render('show');
}
);
//*************************************


module.exports  =  router;
