const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  getAssignmentById,
} = require("../controllers/assignment.controller");

router.get("/", getAllAssignments);
router.get("/:id", getAssignmentById);

module.exports = router;