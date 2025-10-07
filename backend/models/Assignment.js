import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, enum: ["Draft", "Published", "Completed"], default: "Draft" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Assignment", assignmentSchema);
