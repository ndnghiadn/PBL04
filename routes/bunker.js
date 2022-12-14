import express from "express";
import { createBunker, getAllBunkers, addQuestions } from "../controllers/bunker.js";

const router = express.Router();

// Create a bunker
router.post("/", createBunker);

// Get all bunkers
router.get("/", getAllBunkers);

// Add questions
router.post("/:bunkerId/addQuestions", addQuestions);

export default router;
