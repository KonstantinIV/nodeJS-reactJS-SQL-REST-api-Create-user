const http = require('http');
var  fs    = require('fs');
var  database = require('./src/mysql');


const hostname = '192.168.1.246';
const port = 3001;



const server = http.createServer(function(req, res) { 
  
  var url = req.url; 
  var sUrl  = url.split('/');
  console.log(sUrl);
  //console.log("****");
    if(url ==='/') { 
      
       res.writeHeader(200, {"Content-Type": "text/html"}); 
      fs.readFile('./build/index.html', function (err, html) {
        
        if (err) {
          throw err; 
        } 
        
        res.end(html, 'utf-8'); 
        
       }); 
    }else if(url ==='/content/main.css'){
      res.writeHeader(200, {"Content-Type": "text/css"}); 
      fs.readFile('./content/main.css', function (err, html) {
        if (err) {
          throw err; 
        } 
        
        res.write(html)
        res.end(); 
       });
    }else if(url ==='/content/main.js'){
      res.writeHeader(200, {"Content-Type": "text/javascript"}); 
      fs.readFile('./content/main.js', function (err, html) {
        if (err) {
          throw err; 
        } 
        
        res.write(html)
        res.end(); 
       });
    }else if(url ==='/user'){
      res.writeHeader(200, {"Content-Type": "text/text"}); 
      
      
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        database.createUser(body);
        console.log(typeof(body));
    });
    
      res.end();
       }else if(sUrl[1] ==='static'){
        var path     = sUrl.slice(-2)[0]+"/"+sUrl.slice(-1)[0];
        console.log(path);
        var fileName = url;
        res.writeHeader(200, {"Content-Type": "text/css"}); 
        
        
        fs.readFile('./build'+fileName, function (err, html) {
          
          if (err) {
            throw err; 
          } 
          
          res.end(html, 'utf-8'); 
          
         }); 
         }
  
  
    
  
}).listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
   });

