var express = require('express');
var router = express.Router();

router.get('', (req, res, next) => {
  if(req.session){
    req.session.destroy((err) => {
      if(err)
        return next(err);
      return res.redirect('/');
    });
  }
  return res.redirect('/');
});