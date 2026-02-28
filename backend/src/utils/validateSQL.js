const forbiddenKeywords = [
  "insert",
  "update",
  "delete",
  "drop",
  "alter",
  "truncate",
  "create",
  "grant",
  "revoke"
];

const validateSQL = (query) => {
  if (!query || typeof query !== "string") {
    return { valid: false, message: "Query is empty or invalid." };
  }

  const normalizedQuery = query.trim().toLowerCase();

  // 1️⃣ Only allow SELECT
  if (!normalizedQuery.startsWith("select")) {
    return { valid: false, message: "Only SELECT queries are allowed." };
  }

  // 2️⃣ Block multiple statements
  if (normalizedQuery.includes(";")) {
    return { valid: false, message: "Multiple statements are not allowed." };
  }

  // 3️⃣ Block dangerous keywords
  for (let keyword of forbiddenKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "i");
    if (regex.test(normalizedQuery)) {
      return {
        valid: false,
        message: `Forbidden keyword detected: ${keyword}`,
      };
    }
  }

  return { valid: true };
};

module.exports = validateSQL;