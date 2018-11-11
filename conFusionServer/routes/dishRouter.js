const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((request, response, next) => {
    Dishes.find({})
    .then((dishes) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dishes);
    }, (error) => next(error))
    .catch((error) => next(error));
})
.post((request, response, next) => {
    Dishes.create(request.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (error) => next(error))
    .catch((error) => next(error));
})
.put((request, response, next) => {
    response.statusCode = 403;
    response.end('PUT operation not supported on /dishes');
})
.delete((request, response, next) => {
    Dishes.remove({})
    .then((resp) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (error) => next(error))
    .catch((error) => next(error));
});

dishRouter.route('/:dishId')
.get((request, response, next) => {
    Dishes.findById(request.params.dishId)
    .then((dish) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (error) => next(error))
    .catch((error) => next(error));
})
.post((request, response, next) => {
    response.statusCode = 403;
    response.end('POST operation not supported on /dishes/'+ request.params.dishId);
})
.put((request, response, next) => {
    Dishes.findByIdAndUpdate(request.params.dishId, {
        $set: request.body
    }, { new: true })
    .then((dish) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (error) => next(error))
    .catch((error) => next(error));
})
.delete((request, response, next) => {
    Dishes.findByIdAndRemove(request.params.dishId)
    .then((resp) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (error) => next(error))
    .catch((error) => next(error));
});

module.exports = dishRouter;