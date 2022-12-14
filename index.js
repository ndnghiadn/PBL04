import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import bunkerRoutes from "./routes/bunker.js";
import contestRoutes from "./routes/contest.js";
import resultRoutes from "./routes/result.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bunker", bunkerRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/user", userRoutes);

// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong!";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });

app.listen(8080, () => {
  connectDB();
  console.log(`Server is running at port 8080`);
});
