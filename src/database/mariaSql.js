var mysql  = require('mariadb');
var con = mysql.createPool({
  host: 'localhost', 
  user:'user', 
  password: 'qwerty',
  database: "user"
});

module.exports.connect = function connect(){
    return con.getConnection();
    
}

module.exports.runQuery =  function runQuery(query,data){
  return this.connect().then(conn => {
  return conn.query( query,data).then( (result,callback) => { 
    conn.end(); 
     return result;/*console.log(result);*/ });

})

}

module.exports.releaseCon =  function releaseCon(){
  con.release();

}