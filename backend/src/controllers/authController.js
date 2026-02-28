const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.toggleAssignmentCompletion = async (req, res) => {
  const { assignmentId } = req.params;
  const userId = req.user.id; // Assumes auth middleware provides user ID

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const assignmentIndex = user.completedAssignments.indexOf(assignmentId);

    if (assignmentIndex > -1) {
      // If exists, remove it (unmark)
      user.completedAssignments.splice(assignmentIndex, 1);
    } else {
      // If not exists, add it (mark)
      user.completedAssignments.push(assignmentId);
    }

    await user.save();
    res.json({ completedAssignments: user.completedAssignments });
  } catch (err) {
    res.status(500).json({ error: "Failed to update completion status" });
  }
};

exports.getCompletedAssignments = async (req, res) => {
  const userId = req.user.id; // Assumes auth middleware provides user ID
  try {
    const user = await User.findById(userId).select("completedAssignments").lean();
    res.json(user?.completedAssignments || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to get completed assignments" });
  }
};
