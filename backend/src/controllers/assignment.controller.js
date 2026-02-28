const Assignment = require("../models/Assignment");

// GET all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().select(
      "title description difficulty"
    );
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

// GET single assignment
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
};