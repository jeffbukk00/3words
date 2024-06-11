const mongoose = require("mongoose");

const wordsProposalSchema = mongoose.Schema({
  first: String,
  second: String,
  third: String,
  date: Date,
});

module.exports = mongoose.model("words-Proposal", wordsProposalSchema);
