const { UsersModel, validate } = require("../models/usersModel");

async function validateUser(req, res, next) {
  let { error } = validate(req.body);

  if (error) {
    return res.status(400).render("signUp", {
      title: "Geek Freaks Torrent | Sign Up",
      error: error.details[0].message,
    });
  }

  let alreadyUser = await UsersModel.findOne({ email: req.body.email });
  if (alreadyUser) {
    return res.status(400).render("signUp", {
      title: "Geek Freaks Torrent | Sign Up",
      error: "User with entered email already exists",
    });
  }

  alreadyUser = await UsersModel.findOne({ username: req.body.username });
  if (alreadyUser) {
    return res.status(400).render("signUp", {
      title: "Geek Freaks Torrent | Sign Up",
      error: "User with entered username already exists",
    });
  }

  next();
}

module.exports = validateUser;
