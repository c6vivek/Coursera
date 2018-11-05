const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((request, response) => {
//     console.log(request.headers);
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/html');
//     response.end('<html><body><h1>Hello World!</h1></body></html>');
// });

const server = http.createServer((request, response) => {
    console.log('Request for ' + request.url + ' by method ' + request.method);
    if (request.method == 'GET') {
        var fileUrl;
        if (request.url == '/') {
            fileUrl = '/index.html';
        }
        else {
            fileUrl = request.url;
        }
        var filePath = path.resolve('./public' + fileUrl);
        const fileExtension = path.extname(filePath);
        if (fileExtension == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    response.statusCode = 404;
                    response.setHeader('Content-type', 'text/html');
                    response.end('<html><body><h1>Error: ' + fileUrl + ' not found</h1></body></html>');
                    return;
                }
                response.statusCode = 200;
                response.setHeader('Content-type', 'text/html');
                fs.createReadStream(filePath).pipe(response);
            });
        }
        else {
            response.statusCode = 404;
            response.setHeader('Content-type', 'text/html');
            response.end('<html><body><h1>Error: ' + fileUrl + ' is not a html file</h1></body></html>');
        }
    }
    else {
        response.statusCode = 404;
        response.setHeader('Content-type', 'text/html');
        response.end('<html><body><h1>Error: ' + request.method + ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, () => {
    console.log(`server running at ${hostname}:${port}`);
});