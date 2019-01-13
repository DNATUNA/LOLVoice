var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zlekfl123',
  port     : '3306',
  database : 'login'
});

connection.connect();
var ob;
connection.query('SELECT no, name, id, passwd, lol_name AS nickname FROM user_data', function (err, rows, columns) {

  for(var i = 0; i<rows.length; i++){
    ob=rows[i];
    if( 'asdf' == ob['id']){
      check_ID_Num=i;
      console.log('아이디 체크 완료');
      console.log('진행');
    }
    if( '111111' == ob['passwd']){
          console.log('비밀번호 체크 완료');
    }
    console.log(ob['passwd']);
   if( '111111' != ob['passwd']){
        console.log('비밀번호 불일치');
      }
    }



  if (err){
    console.log(err);
  }
});

connection.end();
