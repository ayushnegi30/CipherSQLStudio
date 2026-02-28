const express = require("express");
const router = express.Router();

const { executeQuery } = require("../controllers/query.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/execute-query", authMiddleware, executeQuery);

module.exports = router;