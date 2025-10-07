import express from "express";
import { submitAnswer, getSubmissions } from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, submitAnswer);
router.get("/:assignmentId", protect, getSubmissions);

export default router;
