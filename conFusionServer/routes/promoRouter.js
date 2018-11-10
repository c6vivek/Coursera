const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    next();
})
.get((request, response, next) => {
    response.end('Will send all the promotions to you');
})
.post((request, response, next) => {
    response.end('Will add the promotion: \'' + request.body.name + '\' with description: \'' + request.body.description + '\'');
})
.put((request, response, next) => {
    response.end('PUT operation not supported on /promotions');
})
.delete((request, response, next) => {
    response.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    next();
})
.get((request, response, next) => {
    response.end('Will send the details of promotion: \'' + request.params.promoId + '\' to you');
})
.post((request, response, next) => {
    response.end('POST operation not supported on /promotions/' + request.params.promoId);
})
.put((request, response, next) => {
    response.write('Updating the promotion: \'' + request.params.promoId + '\'\n');
    response.end('Will update the promotion: \'' + request.body.name + '\' with details: \'' + request.body.description + '\'');
})
.delete((request, response, next) => {
    response.end('Deleting promotion: \'' + request.params.promoId + '\'');
});

module.exports = promoRouter;