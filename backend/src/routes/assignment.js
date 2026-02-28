router.get("/preview/:tableName", async (req, res) => {
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