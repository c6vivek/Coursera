const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// Router for Promotions
promoRouter.route('/')
    .get((request, response, next) => {
        Promotions.find({})
            .then((promotions) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(promotions);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .post((request, response, next) => {
        Promotions.create(request.body)
            .then((promotion) => {
                console.log('Promotion Created ', promotion);
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(promotion);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .put((request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on /promotions');
    })
    .delete((request, response, next) => {
        Promotions.remove({})
            .then((resp) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(resp);
            }, (error) => next(error))
            .catch((error) => next(error));
    });

// Router for One promotion
promoRouter.route('/:promoId')
    .get((request, response, next) => {
        Promotions.findById(request.params.promoId)
            .then((promotion) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(promotion);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .post((request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /promotions/' + request.params.promoId);
    })
    .put((request, response, next) => {
        Promotions.findByIdAndUpdate(request.params.promoId, {
            $set: request.body
        }, { new: true })
            .then((promotion) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(promotion);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .delete((request, response, next) => {
        Promotions.findByIdAndRemove(request.params.promoId)
            .then((resp) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(resp);
            }, (error) => next(error))
            .catch((error) => next(error));
    });

// promoRouter.route('/')
// .all((request, response, next) => {
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/plain');
//     next();
// })
// .get((request, response, next) => {
//     response.end('Will send all the promotions to you');
// })
// .post((request, response, next) => {
//     response.end('Will add the promotion: \'' + request.body.name + '\' with description: \'' + request.body.description + '\'');
// })
// .put((request, response, next) => {
//     response.end('PUT operation not supported on /promotions');
// })
// .delete((request, response, next) => {
//     response.end('Deleting all the promotions');
// });

// promoRouter.route('/:promoId')
// .all((request, response, next) => {
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/plain');
//     next();
// })
// .get((request, response, next) => {
//     response.end('Will send the details of promotion: \'' + request.params.promoId + '\' to you');
// })
// .post((request, response, next) => {
//     response.end('POST operation not supported on /promotions/' + request.params.promoId);
// })
// .put((request, response, next) => {
//     response.write('Updating the promotion: \'' + request.params.promoId + '\'\n');
//     response.end('Will update the promotion: \'' + request.body.name + '\' with details: \'' + request.body.description + '\'');
// })
// .delete((request, response, next) => {
//     response.end('Deleting promotion: \'' + request.params.promoId + '\'');
// });

module.exports = promoRouter;