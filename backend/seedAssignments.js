require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

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

const Assignment = mongoose.model("Assignment", assignmentSchema);

const assignments = [

  // ================= EASY =================

  {
    title: "List All Students",
    description: "Basic SELECT",
    difficulty: "Easy",
    question: "List all students.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Students Older Than 20",
    description: "Using WHERE",
    difficulty: "Easy",
    question: "List students older than 20.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "List All Courses",
    description: "Basic SELECT",
    difficulty: "Easy",
    question: "List all courses.",
    tables: [{ name: "courses", columns: ["id", "course_name", "instructor_id"] }]
  },
  {
    title: "Sort Students By Age",
    description: "Using ORDER BY",
    difficulty: "Easy",
    question: "List students ordered by age descending.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Distinct Course Names",
    description: "Using DISTINCT",
    difficulty: "Easy",
    question: "List distinct course names.",
    tables: [{ name: "courses", columns: ["id", "course_name", "instructor_id"] }]
  },

  // ================= MEDIUM =================

  {
    title: "Count Students",
    description: "Using COUNT",
    difficulty: "Medium",
    question: "Count total number of students.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Average Student Age",
    description: "Using AVG",
    difficulty: "Medium",
    question: "Find the average age of students.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Students With Course Names",
    description: "Basic JOIN",
    difficulty: "Medium",
    question: "List student names along with their course names.",
    tables: [
      { name: "students", columns: ["id", "name", "age"] },
      { name: "enrollments", columns: ["id", "student_id", "course_id"] },
      { name: "courses", columns: ["id", "course_name"] }
    ]
  },
  {
    title: "Courses With Instructor Names",
    description: "JOIN Practice",
    difficulty: "Medium",
    question: "List course names along with instructor names.",
    tables: [
      { name: "courses", columns: ["id", "course_name", "instructor_id"] },
      { name: "instructors", columns: ["id", "name"] }
    ]
  },
  {
    title: "Students Between Ages",
    description: "Using BETWEEN",
    difficulty: "Medium",
    question: "List students aged between 18 and 22.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Highest Marks",
    description: "Using MAX",
    difficulty: "Medium",
    question: "Find the highest score from marks table.",
    tables: [{ name: "marks", columns: ["id", "student_id", "course_id", "score"] }]
  },
  {
    title: "Total Marks Per Course",
    description: "GROUP BY",
    difficulty: "Medium",
    question: "Find total marks per course.",
    tables: [
      { name: "marks", columns: ["id", "student_id", "course_id", "score"] }
    ]
  },
  {
    title: "Students Count Per Course",
    description: "GROUP BY + JOIN",
    difficulty: "Medium",
    question: "Count students enrolled in each course.",
    tables: [
      { name: "enrollments", columns: ["id", "student_id", "course_id"] },
      { name: "courses", columns: ["id", "course_name"] }
    ]
  },

  // ================= HARD =================

  {
    title: "Students Above Average Age",
    description: "Subquery",
    difficulty: "Hard",
    question: "List students older than the average age.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Second Highest Age",
    description: "Subquery",
    difficulty: "Hard",
    question: "Find the second highest age among students.",
    tables: [{ name: "students", columns: ["id", "name", "age"] }]
  },
  {
    title: "Students With Highest Marks",
    description: "Subquery + JOIN",
    difficulty: "Hard",
    question: "Find students who scored the highest marks.",
    tables: [
      { name: "students", columns: ["id", "name", "age"] },
      { name: "marks", columns: ["id", "student_id", "course_id", "score"] }
    ]
  },
  {
    title: "Courses With More Than 1 Student",
    description: "HAVING",
    difficulty: "Hard",
    question: "Find courses with more than 1 enrolled student.",
    tables: [
      { name: "enrollments", columns: ["id", "student_id", "course_id"] },
      { name: "courses", columns: ["id", "course_name"] }
    ]
  },
  {
    title: "Average Marks Greater Than 80",
    description: "HAVING + AVG",
    difficulty: "Hard",
    question: "Find courses where average marks are greater than 80.",
    tables: [
      { name: "marks", columns: ["id", "student_id", "course_id", "score"] }
    ]
  },
  {
    title: "Students Not Enrolled In Any Course",
    description: "LEFT JOIN",
    difficulty: "Hard",
    question: "Find students who are not enrolled in any course.",
    tables: [
      { name: "students", columns: ["id", "name", "age"] },
      { name: "enrollments", columns: ["id", "student_id", "course_id"] }
    ]
  },
  {
    title: "Instructor Teaching Most Courses",
    description: "GROUP BY + ORDER BY",
    difficulty: "Hard",
    question: "Find instructor who teaches the most courses.",
    tables: [
      { name: "instructors", columns: ["id", "name"] },
      { name: "courses", columns: ["id", "course_name", "instructor_id"] }
    ]
  },
  {
    title: "Top 3 Students By Marks",
    description: "ORDER BY + LIMIT",
    difficulty: "Hard",
    question: "Find top 3 students based on highest marks.",
    tables: [
      { name: "students", columns: ["id", "name", "age"] },
      { name: "marks", columns: ["id", "student_id", "course_id", "score"] }
    ]
  },
  {
    title: "Courses With No Enrollments",
    description: "LEFT JOIN",
    difficulty: "Hard",
    question: "Find courses that have no students enrolled.",
    tables: [
      { name: "courses", columns: ["id", "course_name", "instructor_id"] },
      { name: "enrollments", columns: ["id", "student_id", "course_id"] }
    ]
  }

];

async function seed() {
  try {
    await Assignment.deleteMany(); // clears old data
    await Assignment.insertMany(assignments);
    console.log("20 Assignments Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();