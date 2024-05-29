// {
//     userId: { type: ObjectId, required: true },
//     wordsProposalId: { type: ObjectId, required: true },
//     first: { word: String, text: String },
//     second: { word: String, text: String },
//     third: { word: String, text: String },
//     opened: Boolean,
// }

const DUMMY_WRITINGS = [
    {
        userId: "65aca2eeb257d81dc0c8b15e",
        wordsProposalId: "65ad110621d95e58b0ae4e69",
        first: { word: "겨울", text: "aaaaaa" },
        second: { word: "편의점", text: "aaaaaa" },
        third: { word: "소나타", text: "aaaaaa" },
        opened: true,
    },
    {
        userId: "65aca2eeb257d81dc0c8b15e",
        wordsProposalId: "65ad110621d95e58b0ae4e69",
        first: { word: "겨울", text: "aaaaaa" },
        second: { word: "편의점", text: "aaaaaa" },
        third: { word: "소나타", text: "aaaaaa" },
        opened: true,
    },
    {
        userId: "65aca2eeb257d81dc0c8b15e",
        wordsProposalId: "65ad110621d95e58b0ae4e69",
        first: { word: "겨울", text: "aaaaaa" },
        second: { word: "편의점", text: "aaaaaa" },
        third: { word: "소나타", text: "aaaaaa" },
        opened: true,
    },
    {
        userId: "65aca2eeb257d81dc0c8b15e",
        wordsProposalId: "65ad110621d95e58b0ae4e69",
        first: { word: "겨울", text: "aaaaaa" },
        second: { word: "편의점", text: "aaaaaa" },
        third: { word: "소나타", text: "aaaaaa" },
        opened: true,
    },
];

require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@3words.hueijl3.mongodb.net/3words_dev?retryWrites=true&w=majority`;

const Writing = require("../models/writing");

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MONGO CONNECTION SUCCEEDED");
        return Writing.deleteMany({});
    })
    .then(() => {
        return Writing.insertMany(DUMMY_WRITINGS);
    })
    .catch((error) => {
        console.log("MONGO CONNECTION FAILED");
        console.log(error);
    });
