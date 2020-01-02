
var index = { 
    requiredFile : false,
    urlArray     : false,
    requestType  : false,
    data         : false,

    GET : function(urlArray,requestType,data,res,fs){
        res.writeHeader(200, {"Content-Type": "text/html"}); 
        

        
        fs.readFile(__dirname+'/../view/index.html', function (err, html) {
          
          if (err) {
            throw err; 
          } 
          
          res.end(html, 'utf-8'); 
          
         }); 

        
    },
    
     
 
    
};
module.exports = index;
//module.exports.var = router.var;

