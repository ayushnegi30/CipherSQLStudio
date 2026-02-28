const express = require("express");
const router = express.Router();
const { getHint } = require("../controllers/llm.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/get-hint", authMiddleware, getHint);

module.exports = router;