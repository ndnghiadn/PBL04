import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find();

    res.status(200).json({ success: true, data: foundUsers });
  } catch (err) {
    next(err);
  }
};
