const database = require("'../database/mariaSql'");

var public = { 
    file: false,

    run : function(urlArray,requestType,data,res,fs){
        this.file ;
        if(){
            res.writeHeader(200, {"Content-Type": "text/html"}); 
        }else if(){
            res.writeHeader(200, {"Content-Type": "text/html"}); 
        }
        
        

        
        fs.readFile(__dirname+'/../public/'+file, function (err, html) {
          
          if (err) {
            throw err; 
          } 
          
          res.end(file, 'utf-8'); 
          
         }); 

        
    },
    
     
 
    
};
module.exports = public;
//module.exports.var = router.var;

