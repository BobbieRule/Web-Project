function sessionAuth(req, res, next) {
  res.locals.token = req.session.token;
  res.locals.username = req.session.username;
  next();
}

module.exports = sessionAuth;
