const authMiddleware = require("../middlewares/auth");

const express = require("express");

const router = express.Router();

const writeControllers = require("../controllers/writeControllers");

router.use(authMiddleware);

router.get("/:wordsProposalId", writeControllers.getWritingController);
router.put("/:wordsProposalId", writeControllers.updateWritingController);
router.patch(
    "/state/:wordsProposalId",
    writeControllers.updateStateOfWritingController
);
router.delete("/:wordsProposalId", writeControllers.resetWritingController);

module.exports = router;
