// const app = require('./server');
import app from './server.js';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const httpService = app.listen(port, () => {     
    console.log(`Listening on port ${port}`); 
})

// const http = require('http');
// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello Node.js! [${req.method}] ${req.url}</h1>');
//   res.end();
// });

// server.listen(8080, () => {
//   console.log("Web service listening on port 8080");
// });