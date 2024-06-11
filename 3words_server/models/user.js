const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", userSchema);
