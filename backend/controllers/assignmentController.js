import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";

// ✅ Create Assignment (Draft by default)
export const createAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    status: "Draft",
    createdBy: req.user.id,
  });
  res.status(201).json(assignment);
};

// ✅ Get Assignments (role-aware)
export const getAssignments = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const studentSubmissions = await Submission.find({ student: req.user.id });
      const submittedAssignmentIds = studentSubmissions.map(s => s.assignment.toString());

      const assignments = await Assignment.find({
        $or: [
          { status: "Published" },
          { _id: { $in: submittedAssignmentIds } }
        ]
      }).sort({ createdAt: -1 });

      const withSubmission = await Promise.all(
        assignments.map(async (a) => {
          const submission = studentSubmissions.find(
            s => s.assignment.toString() === a._id.toString()
          );
          return { ...a.toObject(), submission };
        })
      );

      return res.json(withSubmission);
    }

    // Teacher: all assignments + submissions
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    const withSubmissions = await Promise.all(
      assignments.map(async (a) => {
        const submissions = await Submission.find({ assignment: a._id }).populate("student", "name");
        return { ...a.toObject(), submissions };
      })
    );

    res.json(withSubmissions);
  } catch (err) {
    console.error("Error fetching assignments", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Status (Draft, Published, Completed)
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await Assignment.findByIdAndUpdate(id, { status }, { new: true });

  if (!updated) return res.status(404).json({ message: "Assignment not found" });

  res.json(updated);
};
