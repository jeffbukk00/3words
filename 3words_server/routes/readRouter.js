const express = require("express");

const router = express.Router();

const readControllers = require("../controllers/readControllers");

router.get("/:wordsProposalId", readControllers.getWritingsController);

module.exports = router;
