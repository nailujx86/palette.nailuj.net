function requiresLogin(req, res, next) {
  if (req.session && req.session.userId)
    return next();
  var err = new Error('You are not logged in!');
  err.status = 401;
  return next(err);
}