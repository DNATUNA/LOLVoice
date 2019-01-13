var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */

var link = url.parse('host');
router.get('/', function(req, res, next) {
  res.render('audio', {
    _link : link
  });
});

module.exports = router;
