const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  gender: String,
});

usersSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

const UsersModel = mongoose.model("users", usersSchema);

function validateUser(data) {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    gender: joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.UsersModel = UsersModel;
module.exports.validate = validateUser;
