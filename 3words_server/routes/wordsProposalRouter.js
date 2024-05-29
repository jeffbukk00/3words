const express = require("express");

const router = express.Router();

const wordsProposalController = require("../controllers/wordsProposalController");

router.get("/", wordsProposalController.getWordsProposalsController);

module.exports = router;
