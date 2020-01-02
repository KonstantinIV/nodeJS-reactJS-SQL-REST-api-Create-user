//Modules
const http = require('http');
const  fs    = require('fs');
const url         = require('url');

//Files
const  database = require('./src/database/mariaSql');
const  router = require('./src/core/router');

//Params
const hostname = '192.168.1.246';
const port = 3001;



const server = http.createServer(function(req, res) { 
  
   console.log(req.url);
   var parsedUrl = url.parse(req.url,true);
   console.log(parsedUrl.query.username);


router.parseUrl(parsedUrl.pathname);
router.setQueryParams(parsedUrl.query);

router.setRequiredFile(router.urlArray[0],fs);
router.setRequestType(req.method);
router.setData(req);



req.on('end', function () {
   router.routeController(res,fs);
 
});
  
  

/*
var data ;

function data(chunk){
   data += chunk.toString();
   
}
req.on("data", data());
router.setData(data);
   */





//
}).listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
   });

