const { UsersModel } = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function validateChangePassword(req, res, next) {
  let user = await UsersModel.findById(req.params.id);
  let isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    const user = jwt.decode(req.session.token);
    return res.status(401).render("changePassword", {
      title: "Change Password",
      user,
      error: "Old password must be correct",
    });
  }

  isValid = await bcrypt.compare(req.body.newPassword, user.password);
  if (isValid) {
    const user = jwt.decode(req.session.token);
    return res.status(401).render("changePassword", {
      title: "Change Password",
      user,
      error: "New password can't be the old password",
    });
  }

  next();
}

module.exports = validateChangePassword;
