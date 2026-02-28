import mongoose from "mongoose";
import dotenv from "dotenv";
import Assignment from "../src/models/Assignment.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Assignment.deleteMany();

    await Assignment.insertMany([
      {
        title: "Basic SELECT",
        description: "Filtering rows using WHERE",
        difficulty: "Easy",
        question: "List all students older than 18.",
        tables: [
          {
            name: "students",
            columns: ["id", "name", "age", "course"],
          },
        ],
        expectedQuery: "SELECT * FROM students WHERE age > 18;",
      },
      {
        title: "Count Students",
        description: "Using COUNT function",
        difficulty: "Easy",
        question: "Count total number of students.",
        tables: [
          {
            name: "students",
            columns: ["id", "name", "age", "course"],
          },
        ],
        expectedQuery: "SELECT COUNT(*) FROM students;",
      },
    ]);

    console.log("Assignments seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();