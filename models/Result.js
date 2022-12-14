import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    contestId: {
        type: mongoose.Types.ObjectId,
        ref: "Contest",
    },
    info: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    time: {
      type: Number,
      required: true,
    },
    point: {
      type: Number,
      default: 0,
    },
    warn: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", ResultSchema);
