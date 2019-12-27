const http = require('http');
var  fs = require('fs');


const hostname = '192.168.1.246';
const port = 3001;




const server = http.createServer(function(request, response) { 
  response.writeHeader(200, {"Content-Type": "text/html"}); 
  
  fs.readFile('./index.html', function (err, html) {
    if (err) {
      throw err; 
    } 
    response.write(html); 
    response.end(); 
    
   }); 
  
  
}).listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
   });

