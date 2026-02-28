const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/mongo");
const assignmentRoutes = require("./routes/assignment.routes");
const pool = require("./config/postgres");
const queryRoutes = require("./routes/query.routes");
const llmRoutes = require("./routes/llm.routes");


const app = express();

connectMongo();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CipherSQLStudio API running");
});

app.use("/api/assignments", assignmentRoutes);
pool.query("SELECT 1")
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("PostgreSQL error", err.message));

app.use("/api", queryRoutes);
app.use("/api", llmRoutes);
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

module.exports = app;