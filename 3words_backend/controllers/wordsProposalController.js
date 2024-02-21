const WordsProposal = require("../models/wordsProposal");

const getWordsProposalsController = async (req, res, next) => {
    const { n, c, s } = req.query;

    const wordsProposals = await WordsProposal.find({})
        .sort({ [s]: -1 })
        .skip(Number(n) * Number(c))
        .limit(Number(n));

    return res.status(200).json({ data: wordsProposals });
};

module.exports = { getWordsProposalsController };
