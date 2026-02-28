const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true
  },
  query: {
    type: String,
    required: true
  },
  success: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);