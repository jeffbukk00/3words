const mongoose = require("mongoose");

const wordsProposalSchema = mongoose.Schema({
    first: String,
    second: String,
    third: String,
    dateString: String,
    dayCount: Number,
});

module.exports = mongoose.model("words-Proposal", wordsProposalSchema);
