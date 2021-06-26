const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const torrentsSchema = new mongoose.Schema({
  title: String,
  uploader: String,
  seeders: Number,
  leechers: Number,
  size: String,
  category: String,
  link: String,
  downloads: Number,
  photo: String,
});

const TorrentsModel = mongoose.model("torrents", torrentsSchema);

function validateTorrent(data) {
  const schema = joi.object({
    title: joi.string().min(3).required(),
    uploader: joi.string(),
    seeders: joi.number().default(0),
    leechers: joi.number().default(0),
    size: joi.string(),
    category: joi.string().required(),
    link: joi.string().required(),
    downloads: joi.number().default(0),
    photo: joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.TorrentsModel = TorrentsModel;
module.exports.validate = validateTorrent;
