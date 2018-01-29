var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user.js');
router.use(bodyParser.urlencoded());

router.post('', (req, res, next) => {
  if(req.body.email && req.body.username && req.body.password){
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    
    User.create(userData, (err, user) => {
      if(err)
        return next(err);
      req.session.userId = user._id;
      return res.redirect('/profile');
    });
  } else {
    var err = new Error('Missing fields..');
    err.status = 400;
    return next(err);
  }
});