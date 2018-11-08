const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// routers
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev')); // http request logger - gives type of request and some other info
app.use(bodyParser.json()); // JSON body-parser module middleware 

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
// refactored to ./routes/dishRouter.js 
// app.all('/dishes', (request, response, next) => {
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/plain');
//     next();
// });
// app.get('/dishes', (request, response, next) => {
//     response.end('Will send all the dishes to you');
// });
// app.post('/dishes', (request, response, next) => {
//     response.end('Will add the dish: \'' + request.body.name + '\' with description: \'' + request.body.description + '\'');
// });
// app.put('/dishes', (request, response, next) => {
//     response.end('PUT operation not supported on /dishes');
// });
// app.delete('/dishes', (request, response, next) => {
//     response.end('Deleting all the dishes');
// });
// app.get('/dishes/:dishId', (request, response, next) => {
//     response.end('Will send the details of dish: \'' + request.params.dishId + '\' to you');
// });
// app.post('/dishes/:dishId', (request, response, next) => {
//     response.end('POST operation not supported on /dishes/' + request.params.dishId);
// });
// app.put('/dishes/:dishId', (request, response, next) => {
//     response.write('Updating the dish: \'' + request.params.dishId + '\'\n');
//     response.end('Will update the dish: \'' + request.body.name + '\' with details: \'' + request.body.description + '\'');
// });
// app.delete('/dishes/:dishId', (request, response, next) => {
//     response.end('Deleting dish: \'' + request.params.dishId + '\'');
// });

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