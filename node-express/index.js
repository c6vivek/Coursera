const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((request, response, next) => {
    console.log(request.headers);
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');
    response.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});