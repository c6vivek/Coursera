const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


// Router for Dishes
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

// Router for One dish
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
        response.end('POST operation not supported on /dishes/' + request.params.dishId);
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

// Router for Comments on a dish
dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.push(req.body);
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes/'
            + req.params.dishId + '/comments');
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    for (var i = (dish.comments.length - 1); i >= 0; i--) {
                        dish.comments.id(dish.comments[i]._id).remove();
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Router for a comment on a dish
dishRouter.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId
            + '/comments/' + req.params.commentId);
    })
    .put((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err));
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    dish.comments.id(req.params.commentId).remove();
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err));
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dishRouter;