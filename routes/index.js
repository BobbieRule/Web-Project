const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.token) {
    let user = jwt.decode(req.session.token);
    req.session.username = user.username;
    res.render("index", {
      title: "Geek Freaks Torrent | Home",
      username: user.username,
    });
  } else {
    res.render("index", { title: "Geek Freaks Torrent | Home" });
  }
});

module.exports = router;
