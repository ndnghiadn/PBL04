import { createError } from "../error.js";
import Bunker from "../models/Bunker.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export const createBunker = async (req, res, next) => {
  try {
    const newBunker = new Bunker(req.body);

    await newBunker.save();
    res.status(200).json({ success: true, data: newBunker });
  } catch (err) {
    next(err);
  }
};

export const getAllBunkers = async (req, res, next) => {
  try {
    const bunkers = await Bunker.find();

    res.status(200).json({ success: true, data: bunkers });
  } catch (err) {
    next(err);
  }
};

export const addQuestions = async (req, res, next) => {
  try {
    const { data } = req.body;

    const questions = data.split("\\n").map((question) => {
      const label = question.substring(0, question.indexOf("[") - 1);
      const type = question.substring(
        question.indexOf("[") + 1,
        question.indexOf("]")
      );
      const content = question
        .substring(question.indexOf("||") + 3, question.lastIndexOf("||") - 1)
        .split("_")
        .map((item) => {
          return {
            label: item.substring(1, item.indexOf("/")),
            value: item.substring(item.indexOf("/") + 1, item.indexOf(")")),
          };
        });
      const answer = question.substring(question.lastIndexOf("||") + 3);
      return {
        label,
        type,
        content,
        answer,
      };
    });

    if (!questions.length) return createError(401, "Data is invalid!");

    questions.forEach(async (question) => {
      const newQuestion = new Question({
        label: question.label,
        type: question.type,
        content: question.content,
      });
      await newQuestion.save();

      const newAnswer = new Answer({
        questionId: newQuestion._id,
        value: question.answer,
      });
      await newAnswer.save();

      await Bunker.findByIdAndUpdate(req.params.bunkerId, {
        $push: { questions: newQuestion._id },
      });
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
