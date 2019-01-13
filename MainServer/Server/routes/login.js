var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login.js OPEN!!');
});

module.exports = router;
