const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  question: String,
  tables: [
    {
      name: String,
      columns: [String]
    }
  ]
});

module.exports = mongoose.model("Assignment", assignmentSchema);