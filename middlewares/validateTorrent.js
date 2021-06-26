function validateTorrent(req, res, next) {
  if (!req.body.title) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent title",
    });
  }

  if (!req.body.link) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent magnet link",
    });
  }

  if (!req.body.photo) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent photo url",
    });
  }

  if (!req.body.sizeNo) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent size",
    });
  }

  if (!req.body.sizeType) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent size Type",
    });
  }

  if (!req.body.category) {
    return res.status(400).render("newTorrent", {
      title: "Add New Torrent",
      error: "Please specify the torrent category",
    });
  }

  next();
}

module.exports = validateTorrent;
