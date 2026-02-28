const { GoogleGenerativeAI } = require("@google/generative-ai");
const Assignment = require("../models/Assignment");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.getHint = async (req, res) => {
  const { assignmentId, userQuery } = req.body;

  console.log("getHint payload:", req.body);
  if (!assignmentId || !userQuery) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in server environment.");
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const tableSchema = (assignment.tables || [])
      .map((t) => `${t.name}(${t.columns.join(", ")})`)
      .join("\n");

    const prompt = `
      You are a SQL tutor.

      Assignment:
      ${assignment.question}

      Available Tables:
      ${tableSchema}

      User Query:
      ${userQuery}

      IMPORTANT:
      - Give only a small conceptual hint.
      - DO NOT provide the full SQL solution.
      - DO NOT write the complete SELECT statement.
      - Guide logically and briefly.
      `;

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const hint = response.text();

    res.json({ hint });

  } catch (err) {
    console.error("GEMINI ERROR:", err);
    res.status(500).json({ error: err.message || "Failed to generate hint" });
  }
};