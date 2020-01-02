
var router = { 
    requiredFile : false,
    urlArray     : false,
    requestType  : false,
    data         : "",
    queryParams  : "",

    parseUrl : function(url){
        this.urlArray =   url.substr(1).split('/');

    },
    setRequiredFile:function(file,fs){
        if(file  || (fs.existsSync("../controller/"+file))){
            
            this.requiredFile = require("../controller/"+file);
        }else{
            
            this.requiredFile = require("../controller/index");

        }
    },
    setRequestType : function (reqType){
        if(reqType == "GET"  ||
           reqType == "POST" ||
           reqType == "PUT"  || 
           reqType == "DELETE"  ){

           this.requestType = reqType;

        }
    },
    setQueryParams : function(queryParams){
        this.queryParams = queryParams;
    },
    setData:function(req){
        
        req.on("data", chunk => {
            this.data += chunk.toString();
              
         })
         
        
    },



    routeController : function(res,fs){
        this.requiredFile[this.requestType](this.urlArray,this.queryParams,res);
        
    },
     
 
    
};
module.exports = router;
//module.exports.var = router.var;

