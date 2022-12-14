import express from "express";
import { getResultByContestId } from "../controllers/result.js";

const router = express.Router();

// Get result by contest id
router.get("/:contestId", getResultByContestId);

export default router;
