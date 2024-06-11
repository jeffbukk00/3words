const WordsProposal = require("../models/wordsProposal");

const getWordsProposalsController = async (req, res, next) => {
  const { n, c, s } = req.query;

  const wordsProposals = await WordsProposal.find({})
    .sort({ [s]: -1 })
    .skip(Number(n) * Number(c))
    .limit(Number(n));

  return res.status(200).json({ data: wordsProposals });
};

const createWordsProposalController = async (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({ message: "관리자가 아닙니다." });
  }

  const { first, second, third } = req.body;

  const wordProposal = new WordsProposal({
    first,
    second,
    third,
    date: new Date(),
  });

  await wordProposal.save();

  return res.status(201).json({ message: "생성 완료." });
};

module.exports = { getWordsProposalsController, createWordsProposalController };
