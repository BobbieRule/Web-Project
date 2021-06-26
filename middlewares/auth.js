const config = require("config");
const jwt = require("jsonwebtoken");
const { UsersModel } = require("../models/usersModel");

async function auth(req, res, next) {
  let token = req.session.user;
  if (!token) {
    return res.status(400).send("Token not provided");
  }

  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    foundUser = await UsersModel.findOne(user._id);
    if (foundUser) {
      next();
    }
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
}

module.exports = auth;
