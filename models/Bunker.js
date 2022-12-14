import mongoose from "mongoose";

const BunkerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Bunker", BunkerSchema);
