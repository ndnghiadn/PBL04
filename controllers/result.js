import Result from "../models/Result.js";

export const getResultByContestId = async (req, res, next) => {
  try {
    const foundResult = await Result.find({
      contestId: req.params.contestId,
    }).populate("info", "username fullname");

    res.status(200).json({ success: true, data: foundResult });
  } catch (err) {
    next(err);
  }
};
