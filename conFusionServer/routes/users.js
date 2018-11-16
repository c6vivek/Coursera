var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport');

const User = require('../models/users');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

// session authentication
// router.post('/signup', (req, res, next) => {
//   User.findOne({ username: req.body.username })
//     .then((user) => {
//       if (user != null) {
//         var err = new Error('User ' + req.body.username + ' already exists!');
//         err.status = 403;
//         next(err);
//       }
//       else {
//         return User.create({
//           username: req.body.username,
//           password: req.body.password
//         });
//       }
//     })
//     .then((user) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({ status: 'Registration Successful!', user: user });
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

// Passport authentication
router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname) { user.firstname = req.body.firstname; }
        if (req.body.lastname) { user.lastname = req.body.lastname; }
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});

// session authentication
// // TODO: update to check in body for username and password as well
// router.post('/login', (req, res, next) => {
//   if (!req.session.user) {
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//     }
//     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var username = auth[0];
//     var password = auth[1];
//     User.findOne({ username: username })
//       .then((user) => {
//         if (user === null) {
//           var err = new Error('User ' + username + ' does not exist!');
//           err.status = 403;
//           return next(err);
//         }
//         else if (user.password !== password) {
//           var err = new Error('Your password is incorrect!');
//           err.status = 403;
//           return next(err);
//         }
//         else if (user.username === username && user.password === password) {
//           req.session.user = 'authenticated';
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'text/plain');
//           res.end('You are authenticated!')
//         }
//       })
//       .catch((err) => next(err));
//   }
//   else {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('You are already authenticated!');
//   }
// });

// Passport authentication
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({success: true, status: 'You are successfully logged in!'});
// });

// Passport JWT authentication
router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});


// TODO: lectures didn't handle logout well, fix it yourself
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
