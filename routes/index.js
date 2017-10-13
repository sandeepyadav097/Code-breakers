var express = require("express");
var router = express.Router();

router.get('/', (req, res)=>{
  console.log('landing page');
});

module.exports = router;
