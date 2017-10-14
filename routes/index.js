var express             = require("express");
var router              = express.Router();
var lang                = 'english';
var shlang              = 'eng';

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


}
);




//OCR
router.post('',function(req,res){


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
case 'chinese':  shlang ='chi_sim';
                 break;
}




var tesseract = require('node-tesseract');
var options = {
    l: shlang,
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
});
//*************************************

module.exports  =  router;
