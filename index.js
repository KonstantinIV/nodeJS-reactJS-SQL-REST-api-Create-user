const http = require('http');
var  fs    = require('fs');
var  database = require('./src/mysql');


const hostname = '192.168.1.246';
const port = 3001;



const server = http.createServer(function(req, res) { 
  
  var url = req.url; 
    if(url ==='/') { 
      
       res.writeHeader(200, {"Content-Type": "text/html"}); 
      fs.readFile('./index.html', function (err, html) {
        
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
       }
  
  
    
  
}).listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
   });

