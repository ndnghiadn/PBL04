import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
