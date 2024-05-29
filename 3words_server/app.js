// require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${$process.env.MONGO_PASSWORD}@3words.wwmjmmw.mongodb.net/3words?retryWrites=true&w=majority&appName=3words`;

const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return next();
});

app.use(express.json());

const authRouter = require("./routes/authRouter");
const wordsProposalRouter = require("./routes/wordsProposalRouter");
const readRouter = require("./routes/readRouter");
const writeRouter = require("./routes/writeRouter");

app.use("/auth", authRouter);
app.use("/wordsProposal", wordsProposalRouter);
app.use("/read", readRouter);
app.use("/write", writeRouter);

app.use((error, req, res, next) => {
  const errorStatus = error.errorStatus || 500;
  const errorMessage = error.errorMessage || "알 수 없는 에러가 발생했습니다.";
  res.status(errorStatus).json({ errorMessage });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTION SUCCEEDED");
    // const port = process.env.PORT || 8080;

    app.listen(3000, "0.0.0.0", () => {
      console.log(`LISTENING ON 3000`);
    });
  })
  .catch((error) => {
    console.log("MONGO CONNECTION FAILED");
    console.log(error);
  });
