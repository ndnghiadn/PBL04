import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
