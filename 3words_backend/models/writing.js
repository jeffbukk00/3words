const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const writingSchema = mongoose.Schema({
    userId: { type: ObjectId, required: true },
    wordsProposalId: { type: ObjectId, required: true },
    first: { word: String, text: String },
    second: { word: String, text: String },
    third: { word: String, text: String },
    opened: Boolean,
});

module.exports = mongoose.model("writing", writingSchema);
