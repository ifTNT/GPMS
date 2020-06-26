var express = require('express');
var router = express.Router();
const userInformation = require('./userInformation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userInformation.addTestUser();  
  res.send('respond with a resource');
});

module.exports = router;
