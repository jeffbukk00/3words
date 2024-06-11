const express = require("express");

const router = express.Router();

const isAdminMiddleware = require("../middlewares/isAdmin");
const wordsProposalController = require("../controllers/wordsProposalController");
const authMiddleware = require("../middlewares/auth");

router.get("/", wordsProposalController.getWordsProposalsController);
router.post(
  "/",
  authMiddleware,
  isAdminMiddleware,
  wordsProposalController.createWordsProposalController
);

module.exports = router;
