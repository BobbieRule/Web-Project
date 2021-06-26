const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { UsersModel } = require("../../models/usersModel");
const { token } = require("morgan");
const validateUser = require("../../middlewares/validateUser");
const validateSignIn = require("../../middlewares/validateSignIn");
const validateChangePassword = require("../../middlewares/validateChangePassword");

router.get("/signIn", function (req, res) {
  try {
    return res
      .status(200)
      .render("signIn", { title: "Geek Freaks Torrent | Sign In" });
  } catch (error) {
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.post("/signIn", validateSignIn, async function (req, res) {
  try {
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/signUp", function (req, res) {
  try {
    return res
      .status(200)
      .render("signUp", { title: "Geek Freaks Torrent | Sign Up" });
  } catch (error) {
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.post("/signUp", validateUser, async function (req, res) {
  try {
    let user = new UsersModel();

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;
    await user.generateHashedPassword();

    await user.save();

    return res.status(200).redirect("/users/signIn");
  } catch (error) {
    console.log(error);
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/logout", function (req, res) {
  req.session.token = null;
  req.session.username = null;
  return res.status(200).redirect("/");
});

router.get("/account", function (req, res) {
  user = jwt.decode(req.session.token);
  return res.render("userAccount", {
    title: "Welcome | " + user.username,
    user,
  });
});

router.get("/edituser", function (req, res) {
  try {
    const user = jwt.decode(req.session.token);
    return res.render("editUser", { title: "Edit User", user });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.post("/edituser/:id", async function (req, res) {
  try {
    let alreadyUser = await UsersModel.findOne({ username: req.body.username });
    const previousUser = jwt.decode(req.session.token);
    if (alreadyUser && alreadyUser.username != previousUser.username) {
      return res.status(400).render("editUser", {
        title: "Edit User",
        previousUser,
        error: "User with entered username already exists",
      });
    }

    let user = await UsersModel.findById(req.params.id);

    user.username = req.body.username;
    user.gender = req.body.gender;

    await user.save();

    let token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
      },
      config.get("jwtPrivateKey")
    );

    req.session.token = token;

    return res.redirect("/users/account");
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.get("/changepassword", function (req, res) {
  try {
    const user = jwt.decode(req.session.token);
    return res.render("changePassword", { title: "Change Password", user });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.post(
  "/changepassword/:id",
  validateChangePassword,
  async function (req, res) {
    try {
      let user = await UsersModel.findById(req.params.id);

      user.password = req.body.newPassword;
      await user.generateHashedPassword();
      await user.save();

      return res.redirect("/users/account");
    } catch (error) {
      return res.status(400).send("Bad Request");
    }
  }
);

module.exports = router;
