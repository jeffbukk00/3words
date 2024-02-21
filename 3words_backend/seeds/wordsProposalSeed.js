// {
//     first: String,
//     second: String,
//     third: String,
//     date: Date,
//     dayCount: Number,
// }

const DUMMY_WORDS_PROPOSALS = [
    {
        first: "겨울",
        second: "눈사람",
        third: "크리스마스",
        dateString: new Date("Sat Jan 10 2024").toDateString(),
        dayCount: 1,
    },
    {
        first: "여름",
        second: "바다",
        third: "축구",
        dateString: new Date("Sat Jan 11 2024").toDateString(),
        dayCount: 2,
    },
    {
        first: "캠핑",
        second: "디퓨저",
        third: "생수",
        dateString: new Date("Sat Jan 12 2024").toDateString(),
        dayCount: 3,
    },
    {
        first: "아이패드",
        second: "전자레인지",
        third: "짜장면",
        dateString: new Date("Sat Jan 13 2024").toDateString(),
        dayCount: 4,
    },
    {
        first: "거울",
        second: "편의점",
        third: "소나타",
        dateString: new Date("Sat Jan 14 2024").toDateString(),
        dayCount: 5,
    },
];

require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@3words.hueijl3.mongodb.net/3words_dev?retryWrites=true&w=majority`;

const WordsProposal = require("../models/wordsProposal");

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MONGO CONNECTION SUCCEEDED");
        return WordsProposal.deleteMany({});
    })
    .then(() => {
        return WordsProposal.insertMany(DUMMY_WORDS_PROPOSALS);
    })
    .catch((error) => {
        console.log("MONGO CONNECTION FAILED");
        console.log(error);
    });
