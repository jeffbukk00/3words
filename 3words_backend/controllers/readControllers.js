const Writing = require("../models/writing");

const getWritingsController = async (req, res, next) => {
    const { wordsProposalId } = req.params;
    const { n, c, s } = req.query;

    const writings = await Writing.find({ wordsProposalId, opened: true })
        .sort({ [s]: -1 })
        .skip(Number(n) * Number(c))
        .limit(Number(n));

    return res.status(200).json({ data: writings });
};

module.exports = { getWritingsController };
