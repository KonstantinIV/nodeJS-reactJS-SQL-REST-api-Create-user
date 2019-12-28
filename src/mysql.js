var mysql  = require('mariadb');
var con = mysql.createPool({
  host: 'localhost', 
  user:'user', 
  password: 'qwerty',
  database: "user"
});

module.exports.createUser = function createUser(username){
    con.getConnection()
    .then(conn => {
      
        
          
           conn.query('INSERT  iNTO user (username) values (?);',[username])
          .then(result => { 
              console.log(result);
              })
        
        
    }).catch(err => {
      //not connected
      console.log(err)
    });
}
