const { TorrentsModel } = require("../models/torrentsModel");

async function validateEditTorrent(req, res, next) {
  if (!req.body.title) {
    let torrent = await TorrentsModel.findOne({ _id: req.params.id });
    splitSize = torrent.size.split(" ");
    sizeType = splitSize[1];
    return res.status(400).render("editTorrent", {
      title: "Edit Torrent",
      torrent,
      sizeType,
      error: "Please specify the torrent title",
    });
  }

  if (!req.body.link) {
    let torrent = await TorrentsModel.findOne({ _id: req.params.id });
    splitSize = torrent.size.split(" ");
    sizeType = splitSize[1];
    return res.status(400).render("editTorrent", {
      title: "Edit Torrent",
      torrent,
      sizeType,
      error: "Please specify the torrent magnet link",
    });
  }

  if (!req.body.photo) {
    let torrent = await TorrentsModel.findOne({ _id: req.params.id });
    splitSize = torrent.size.split(" ");
    sizeType = splitSize[1];
    return res.status(400).render("editTorrent", {
      title: "Edit Torrent",
      torrent,
      sizeType,
      error: "Please specify the torrent photo url",
    });
  }

  if (!req.body.sizeNo) {
    let torrent = await TorrentsModel.findOne({ _id: req.params.id });
    splitSize = torrent.size.split(" ");
    sizeType = splitSize[1];
    return res.status(400).render("editTorrent", {
      title: "Edit Torrent",
      torrent,
      sizeType,
      error: "Please specify the torrent size",
    });
  }

  next();
}

module.exports = validateEditTorrent;
