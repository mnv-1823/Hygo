let http = require('http');
let express = require('express');
let app = express();

http.createServer((req, res) => {  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World</h1>');
}).listen(3000);

console.log('Server running at http://localhost:3000/');