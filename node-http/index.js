const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((request, response) => {
    console.log(request.headers);
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');
    response.end('<html><body><h1>Hello World!</h1></body></html>');
});

server.listen(port, hostname, () => {
    console.log(`server running at ${hostname}:${port}`);
});