const database = require("../database/mariaSql");
const model    = require("../model/user");

var user = { 
    requiredFile : false,
    urlArray     : false,
    requestType  : false,
    data         : false,


    GET :  function(urlArray,data,res){
        if(!data.username){
     

         database.runQuery(model.getUsers(),[]).then(result=> {

            var respo = JSON.stringify(result);
            res.write(respo);
            res.end();
         });
         
         
     


        }else{
            database.runQuery(model.getUser(),[data.username]).then(result => {
                console.log(result)
                
             });
        }
         
     

        console.log("GET")
        

    },
    POST : (urlArray,data,res) =>{
        database.runQuery(model.insertUser(),[data.username]).then(result => {
            console.log(result)
            res.write(JSON.stringify(result.insertId));
            res.end();

         }).catch(error => {
            console.log(error);
          });;
         //database.releaseCon();
       
    },
    DELETE : (urlArray,data,res) =>{
        database.runQuery(model.deleteUser(),[data.ID]).then(result => {
            console.log(result)
            res.end(JSON.stringify(result));


         });

    },
    PUT : (urlArray,data,res) =>{
        console.log(data)
        database.runQuery(model.updateUser(),[data.usernameNew,data.ID]).then(result => {
            console.log(result)
            res.end(JSON.stringify(result));

         });
    },

    
     
 
    
};
module.exports = user;
//module.exports.var = router.var;

