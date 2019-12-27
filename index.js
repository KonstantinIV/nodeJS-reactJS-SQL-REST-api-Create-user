const http = require('http');
const hostname = '192.168.1.246';
const port = 3001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  var url = req.url; 
      
    if(url ==='/about') { 
        res.write(' Welcome to about us page');  
        console.log(req);
        //console.log(res);
        res.end();  
    } 
    else if(url ==='/contact') { 
        res.write(' Welcome to contact us page');  
        res.end();  
    } 
    else { 
        res.write('Hello World!');  
        res.end();  
    } 
  res.end('Hello World\n');
});
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
