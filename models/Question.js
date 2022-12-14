import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: [],
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
