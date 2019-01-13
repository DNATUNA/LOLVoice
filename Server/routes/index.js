var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store') (session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

router.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zlekfl123',
  port     : '3306',
  database : 'login'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'LoL Voice'
  });
});




passport.use(new LocalStrategy(
  function(username, password, done){
    var req_ID = username;
    var req_Passwd = password;
    var check=0, check_ID_Num=0, check_Passwd_Num=0;
    var ob;

    sql = "SELECT id AS username, passwd AS password, lol_name AS nickname FROM user_data"
    connection.query( sql , function (err, rows, columns) {
      for(var i = 0; i<rows.length; i++){
        ob=rows[i];
        if(req_ID == ob['username']){
          check_ID_Num=i;
          if(req_Passwd == ob['password']){
            check = 1;
            check_Passwd_Num=i;
        }
      }
      }
      if(check_ID_Num == check_Passwd_Num){
        ob=rows[check_ID_Num];
        console.log(ob);
      }
      if (err) { return done(err); }
      else if(check === 0){return done(null, false, {message : 'df'});}
      else if(check === 1){ console.log('LocalStrategy', ob); return done(null, ob);}
    });

  }

));

module.exports = router;







// router.post('/login', function(req, res, next){
//   var nickname = "";
//   var req_ID = req.body.username;
//   var req_Passwd = req.body.password;
//   connection.connect();
//
//   sql = "SELECT name, id, passwd, lol_name AS nickname FROM user_data WHERE id='"
//   connection.query( sql + req_ID +"'", function (err, rows, columns) {
//
//
//       console.log('rows', rows);
//       var outputs = '';
//       var ob = rows[0];
//
//       console.log(ob['name']);
//       console.log(ob['id']);
//       console.log(ob['passwd']);
//       console.log(req_ID);
//       console.log(req_Passwd);
//
//       if((req_ID == ob['id']) && (req_Passwd == ob['passwd'])){
//
//         res.redirect('home');
//
//         res.render('home',{
//           _nickname : ob['nickname']
//         });
//         return;
//       }
//       else{
//         res.send('<script type="text/javascript">alert("오류발생");</script>');
//       }
//
//   });

// });
