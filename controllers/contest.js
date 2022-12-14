import { createError } from "../error.js";
import Contest from "../models/Contest.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import Bunker from "../models/Bunker.js";

export const createContest = async (req, res, next) => {
  try {
    const newContest = new Contest(req.body);

    await newContest.save();

    res.status(200).json({ success: true, data: newContest });
  } catch (err) {
    next(err);
  }
};

export const assignParticipants = async (req, res, next) => {
  try {
    await Contest.findByIdAndUpdate(req.params.contestId, {
      $set: { participants: req.body.participants },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const startContest = async (req, res, next) => {
  try {
    const { bunkerId, type } = await Contest.findById(req.params.contestId);
    const foundBunker = await Bunker.findById(bunkerId).populate(
      "questions",
      "label type content"
    );

    const questions = [];

    if (type === "semi-final") {
      for (let i = 0; i < 10; i++) {
        questions.push(
          foundBunker.questions[
            Math.floor(Math.random() * foundBunker.questions.length)
          ]
        );
      }
    } else {
      // type === final
      for (let i = 0; i < 25; i++) {
        questions.push(
          foundBunker.questions[
            Math.floor(Math.random() * foundBunker.questions.length)
          ]
        );
      }
    }

    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
};

const equalsIgnoreOrder = (a, b) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

export const finishContest = async (req, res, next) => {
  try {
    const { data, time, warn } = req.body;
    if (!data) return next(createError(400, "Data should not be empty!"));

    const newResult = new Result({
      contestId: req.params.contestId,
      info: req.userId,
      time,
      warn,
    });
    await newResult.save();

    data.forEach(async (result) => {
      try {
        const { value } = await Answer.findOne({
          questionId: result.questionId,
        });
        const foundQuestion = await Question.findById(result.questionId);

        if (foundQuestion.type === "radio") {
          if (result.value === value) {
            await Result.findByIdAndUpdate(newResult._id, {
              $inc: { point: 1 },
            });
          }
        } else {
          // type === "select"
          if (equalsIgnoreOrder(value?.split(","), result.value)) {
            await Result.findByIdAndUpdate(newResult._id, {
              $inc: { point: 1 },
            });
          }
        }
      } catch (err) {
        next(err);
      }
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getContestsByUserId = async (req, res, next) => {
  try {
    // const foundContests = await Contest.find({
    //   participants: mongoose.Types.ObjectId(req.userId),
    // });
    const foundContests = await Contest.find();

    res.status(200).json({ success: true, data: foundContests });
  } catch (err) {
    next(err);
  }
};

export const getContestById = async (req, res, next) => {
  try {
    const foundContest = await Contest.findById(req.params.contestId);

    res.status(200).json({ success: true, data: foundContest });
  } catch (err) {
    next(err);
  }
};
