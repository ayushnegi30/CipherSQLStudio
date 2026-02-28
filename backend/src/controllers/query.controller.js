const pool = require("../config/postgres");
const validateSQL = require("../utils/validateSQL");
const Assignment = require("../models/Assignment");
const Attempt = require("../models/Attempt");

exports.executeQuery = async (req, res) => {
  const { assignmentId, query } = req.body;

  if (!assignmentId || !query) {
    return res.status(400).json({ error: "Missing assignmentId or query" });
  }

  // Step 1: Validate SQL
  const validation = validateSQL(query);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    // Step 2: Check assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Step 3: Execute query
    const result = await pool.query(query);

    await Attempt.create({
      user: req.user.id,
      assignment: assignmentId,
      query,
      success: true
    });

    // Step 4: Format response
    const columns = result.fields.map((field) => field.name);
    const rows = result.rows.map((row) => Object.values(row));

    res.json({ columns, rows });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};