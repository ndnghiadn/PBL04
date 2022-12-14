import express from "express";
import { createContest, assignParticipants, startContest, finishContest, getContestsByUserId, getContestById } from "../controllers/contest.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create a contest
router.post("/", createContest);

// Assign participants
router.post("/:contestId/assignParticipants", assignParticipants);

// Start contest
router.get("/:contestId", startContest);

// Finish contest
router.post("/:contestId/finishContest", verifyToken, finishContest);

// Get contests by user id
router.get("/", getContestsByUserId);

// Get contest by id
router.get("/getContestById/:contestId", getContestById);

export default router;
