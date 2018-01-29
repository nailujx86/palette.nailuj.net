var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user.js');
router.use(bodyParser.urlencoded());

router.post('', (req, res, next) => {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (err, user) => {
      if(err || !user) {
        var err = new Error('Wrong email or password..');
        err.status = 401;
        return next(err);
      } else {
        req.session.user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Missing fields..');
    err.status = 401;
    return next(err);
  }
});