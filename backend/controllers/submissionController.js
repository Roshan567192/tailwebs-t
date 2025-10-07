import Submission from "../models/Submission.js";

// ✅ Student submits once
export const submitAnswer = async (req, res) => {
  const { assignmentId, answer } = req.body;

  const exists = await Submission.findOne({ assignment: assignmentId, student: req.user.id });
  if (exists) return res.status(400).json({ message: "Already submitted" });

  const submission = await Submission.create({
    assignment: assignmentId,
    student: req.user.id,
    answer,
  });

  res.json(submission);
};

// ✅ Get submissions for assignment (used in teacher dashboard)
export const getSubmissions = async (req, res) => {
  const { assignmentId } = req.params;

  const submissions = await Submission.find({ assignment: assignmentId }).populate("student", "name");

  res.json(submissions);
};
