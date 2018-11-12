const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// Router for Leaders
leaderRouter.route('/')
    .get((request, response, next) => {
        Leaders.find({})
            .then((leaders) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(leaders);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .post((request, response, next) => {
        Leaders.create(request.body)
            .then((leader) => {
                console.log('Leader Created ', leader);
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(leader);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .put((request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on /leaders');
    })
    .delete((request, response, next) => {
        Leaders.remove({})
            .then((resp) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(resp);
            }, (error) => next(error))
            .catch((error) => next(error));
    });

// Router for One leader
leaderRouter.route('/:leaderId')
    .get((request, response, next) => {
        Leaders.findById(request.params.leaderId)
            .then((leader) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(leader);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .post((request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /leaders/' + request.params.leaderId);
    })
    .put((request, response, next) => {
        Leaders.findByIdAndUpdate(request.params.leaderId, {
            $set: request.body
        }, { new: true })
            .then((leader) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(leader);
            }, (error) => next(error))
            .catch((error) => next(error));
    })
    .delete((request, response, next) => {
        Leaders.findByIdAndRemove(request.params.leaderId)
            .then((resp) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(resp);
            }, (error) => next(error))
            .catch((error) => next(error));
    });

// leaderRouter.route('/')
// .all((request, response, next) => {
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/plain');
//     next();
// })
// .get((request, response, next) => {
//     response.end('Will send all the leaders to you');
// })
// .post((request, response, next) => {
//     response.end('Will add the leader: \'' + request.body.name + '\' with description: \'' + request.body.description + '\'');
// })
// .put((request, response, next) => {
//     response.end('PUT operation not supported on /leaders');
// })
// .delete((request, response, next) => {
//     response.end('Deleting all the leaders');
// });

// leaderRouter.route('/:leaderId')
// .all((request, response, next) => {
//     response.statusCode = 200;
//     response.setHeader('Content-type', 'text/plain');
//     next();
// })
// .get((request, response, next) => {
//     response.end('Will send the details of leader: \'' + request.params.leaderId + '\' to you');
// })
// .post((request, response, next) => {
//     response.end('POST operation not supported on /leaders/' + request.params.leaderId);
// })
// .put((request, response, next) => {
//     response.write('Updating the leader: \'' + request.params.leaderId + '\'\n');
//     response.end('Will update the leader: \'' + request.body.name + '\' with details: \'' + request.body.description + '\'');
// })
// .delete((request, response, next) => {
//     response.end('Deleting leader: \'' + request.params.leaderId + '\'');
// });

module.exports = leaderRouter;