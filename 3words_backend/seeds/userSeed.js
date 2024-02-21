// {
//     name: String,
//     password: String,
// }

const DUMMY_USER = {
    name: "jeffbukk00",
    password: "123123yj",
};

require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@3words.hueijl3.mongodb.net/3words_dev?retryWrites=true&w=majority`;

const User = require("../models/user");

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MONGO CONNECTION SUCCEEDED");
        return User.deleteMany({});
    })
    .then(() => {
        const user = new User(DUMMY_USER);
        return user.save();
    })
    .catch((error) => {
        console.log("MONGO CONNECTION FAILED");
        console.log(error);
    });
