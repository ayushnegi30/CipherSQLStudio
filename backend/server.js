require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/auth", authRoutes);

const llmRoutes = require("./src/routes/llm.routes");
app.use("/api", llmRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/api/preview/:tableName", async (req, res) => {
  const { tableName } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tableName} LIMIT 5`
    );

    res.json({
      columns: result.fields.map((field) => field.name),
      rows: result.rows.map((row) => Object.values(row)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch preview data" });
  }
});
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});