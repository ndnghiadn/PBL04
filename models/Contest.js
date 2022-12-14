import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    bunkerId: {
      type: mongoose.Types.ObjectId,
      ref: "Bunker",
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Contest", ContestSchema);
