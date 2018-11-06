const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev')); // http request logger - gives type of request and some other info
app.use(express.static(__dirname + '/public')); // express component - serves static files
app.use((request, response, next) => {
    console.log(request.headers);
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');
    response.end('<html><body><h1>This is an Express Server</h1></body></html>');
}); // standard express handler

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});