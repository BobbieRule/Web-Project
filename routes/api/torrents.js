const express = require("express");
const jwt = require("jsonwebtoken");
const { TorrentsModel } = require("../../models/torrentsModel");
const router = express.Router();
const validateTorrent = require("../../middlewares/validateTorrent");
const validateEditTorrent = require("../../middlewares/validateEditTorrent");

router.get("/games", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.category === "Games") {
        return torrent;
      }
    });

    res.render("torrent", { title: "Geek Freaks | Games", torrentsList });
  } catch (error) {
    res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/movies", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.category === "Movies") {
        return torrent;
      }
    });

    res.render("torrent", { title: "Geek Freaks | Movies", torrentsList });
  } catch (error) {
    res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/animes", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.category === "Animes") {
        return torrent;
      }
    });

    res.render("torrent", { title: "Geek Freaks | Animes", torrentsList });
  } catch (error) {
    res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/books", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.category === "Books") {
        return torrent;
      }
    });

    res.render("torrent", { title: "Geek Freaks | Books", torrentsList });
  } catch (error) {
    res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/id/:id", async function (req, res) {
  try {
    let singleTorrent = await TorrentsModel.findById(req.params.id);
    res.render("singleTorrent", {
      title: "Geek Freaks | " + singleTorrent.title,
      singleTorrent,
    });
  } catch (error) {
    res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/uploader/:uploader", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.uploader === req.params.uploader) {
        return torrent;
      }
    });

    res.render("torrent", {
      title: "Geek Freaks | " + req.params.uploader,
      torrentsList,
    });
  } catch (error) {
    res.status(400).send("h1 Bad Request");
  }
});

router.get("/newtorrent", async function (req, res) {
  return res.render("newTorrent", { title: "Add New Torrent" });
});

router.post("/newtorrent", validateTorrent, async function (req, res) {
  try {
    let torrent = new TorrentsModel();

    const user = jwt.decode(req.session.token);

    torrent.title = req.body.title;
    torrent.uploader = user.username;
    torrent.category = req.body.category;
    torrent.size = req.body.sizeNo + " " + req.body.sizeType;
    torrent.link = req.body.link;
    torrent.photo = req.body.photo;
    torrent.seeders = 0;
    torrent.leechers = 0;
    torrent.downloads = 0;

    await torrent.save();

    return res.redirect("/users/account");
  } catch (error) {
    res.send(400).send("h1 Bad Request");
  }
});

router.get("/mytorrents", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();
    const user = jwt.decode(req.session.token);

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.uploader === user.username) {
        return torrent;
      }
    });

    return res.render("myTorrents", {
      title: "My Torrents",
      torrentsList,
    });
  } catch (error) {
    res.status(400).send("h1 Bad Request");
  }
});

router.get("/delete/:id", async function (req, res) {
  try {
    await TorrentsModel.findByIdAndDelete(req.params.id);

    let torrentsList = await TorrentsModel.find();
    const user = jwt.decode(req.session.token);

    torrentsList = torrentsList.filter((torrent) => {
      if (torrent.uploader === user.username) {
        return torrent;
      }
    });

    return res.status(200).render("myTorrents", {
      title: "My Torrents",
      torrentsList,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(400).send("h1 Bad Request");
  }
});

router.get("/mytorrents/edit/:id", async function (req, res) {
  try {
    let torrent = await TorrentsModel.findOne({ _id: req.params.id });
    splitSize = torrent.size.split(" ");
    sizeType = splitSize[1];
    return res.render("editTorrent", {
      title: "Edit Torrent",
      torrent,
      sizeType,
    });
  } catch (error) {
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.post(
  "/mytorrents/edit/:id",
  validateEditTorrent,
  async function (req, res) {
    try {
      let torrent = await TorrentsModel.findById(req.params.id);

      torrent.title = req.body.title;
      torrent.category = req.body.category;
      torrent.size = req.body.sizeNo + " " + req.body.sizeType;
      torrent.link = req.body.link;
      torrent.photo = req.body.photo;

      await torrent.save();

      return res.redirect("/torrents/mytorrents");
    } catch (error) {
      return res.status(400).send("<h1>Bad Request</h1>");
    }
  }
);

router.post("/searched", function (req, res) {
  try {
    return res.redirect("/torrents/searched?search=" + req.body.torrentSearch);
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.get("/searched", async function (req, res) {
  try {
    let torrentsList = await TorrentsModel.find();

    let { search } = req.query;

    if (search) {
      torrentsList = torrentsList.filter(function (torrent) {
        if (torrent.title.toLowerCase().includes(search.toLowerCase())) {
          return torrent;
        }
      });
    }

    return res.render("torrent", {
      title: "Searched For " + search,
      torrentsList,
    });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

module.exports = router;
