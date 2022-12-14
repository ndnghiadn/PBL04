
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("You are unauthorized !");

  try {
    const encoded = jwt.verify(token, process.env.JWT);
    req.userId = encoded.id;
    next();
  } catch (error) {
    res.status(401).send("Your token is invalid !");
  }
};
