const express = require("express");
const router = express.Router();
const { signup, login, toggleAssignmentCompletion, getCompletedAssignments } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/completed-assignments", authMiddleware, getCompletedAssignments);
router.post("/assignments/:assignmentId/toggle", authMiddleware, toggleAssignmentCompletion);

module.exports = router;