const Writing = require("../models/writing");
const WordsProposal = require("../models/wordsProposal");

const getWritingController = async (req, res, next) => {
    const { userId } = req;
    const { wordsProposalId } = req.params;

    const existingWriting = await Writing.findOne({ userId, wordsProposalId });

    if (!existingWriting) {
        const wordsProposal = await WordsProposal.findById(wordsProposalId);

        const newWriting = new Writing({
            userId,
            wordsProposalId,
            first: { word: wordsProposal.first, text: "" },
            second: { word: wordsProposal.second, text: "" },
            third: { word: wordsProposal.third, text: "" },
            opened: false,
        });

        await newWriting.save();

        return res.status(200).json({
            data: newWriting,
        });
    }

    return res.status(200).json({ data: existingWriting });
};

const updateWritingController = async (req, res, next) => {
    const { userId } = req;
    const { wordsProposalId } = req.params;
    const { first, second, third } = req.body;

    const updatedWriting = await Writing.findOne({ userId, wordsProposalId });
    updatedWriting.first = first;
    updatedWriting.second = second;
    updatedWriting.third = third;
    await updatedWriting.save();

    return res.status(201).json({ data: updatedWriting });
};

const updateStateOfWritingController = async (req, res, next) => {
    const { userId } = req;
    const { wordsProposalId } = req.params;
    const { opened } = req.body;

    const updatedWriting = await Writing.findOne({ userId, wordsProposalId });
    updatedWriting.opened = !opened;
    await updatedWriting.save();

    return res.status(201).json({ data: { opened: updatedWriting.opened } });
};

const resetWritingController = async (req, res, next) => {
    const { userId } = req;
    const { wordsProposalId } = req.params;

    const resetWriting = await Writing.findOne({ userId, wordsProposalId });

    const wordsProposal = await WordsProposal.findById(wordsProposalId);

    resetWriting.first = { word: wordsProposal.first, text: "" };
    resetWriting.second = { word: wordsProposal.second, text: "" };
    resetWriting.third = { word: wordsProposal.third, text: "" };
    resetWriting.opened = false;

    await resetWriting.save();

    return res.status(201).json({ data: resetWriting });
};

module.exports = {
    getWritingController,
    updateWritingController,
    updateStateOfWritingController,
    resetWritingController,
};
