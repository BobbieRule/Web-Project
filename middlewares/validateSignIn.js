const { UsersModel } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

async function validateSignIn(req, res, next) {
  let alreadyUser = await UsersModel.findOne({ email: req.body.email });

  if (!alreadyUser) {
    return res.status(400).render("signIn", {
      error: "No account exist with the entered email!",
    });
  }

  let isValid = await bcrypt.compare(req.body.password, alreadyUser.password);

  if (!isValid) {
    return res.status(401).render("signIn", {
      error: "Invalid Password",
    });
  }

  let token = jwt.sign(
    {
      _id: alreadyUser._id,
      username: alreadyUser.username,
      email: alreadyUser.email,
      gender: alreadyUser.gender,
    },
    config.get("jwtPrivateKey")
  );

  req.session.token = token;

  next();
}

module.exports = validateSignIn;
