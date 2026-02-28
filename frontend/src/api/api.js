const API_BASE = "https://ciphersqlstudio-8ac2.onrender.com/";

/* =========================
   AUTH APIs
========================= */

export const signup = async (data) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* =========================
   ASSIGNMENTS
========================= */

export const getAssignments = async () => {
  const res = await fetch(`${API_BASE}/assignments`);
  return res.json();
};

export const getAssignmentById = async (id) => {
  const res = await fetch(`${API_BASE}/assignments/${id}`);
  return res.json();
};

/* =========================
   EXECUTE QUERY (Protected)
========================= */

export const executeQuery = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/execute-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // 🔥 Important
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized. Please login again.");
  }

  return res.json();
};

/* =========================
   GET HINT (Protected if needed)
========================= */

export const getHint = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/get-hint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Failed to fetch hint");
  }

  return res.json();
};

/* =========================
   TABLE PREVIEW
========================= */

export const getTablePreview = async (tableName) => {
  const res = await fetch(`${API_BASE}/preview/${tableName}`);
  return res.json();
};

/* =========================
   COMPLETION TRACKING
========================= */

export const getCompletedAssignments = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/auth/completed-assignments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!res.ok) return [];

  const text = await res.text();
  try {
    return text ? JSON.parse(text) : [];
  } catch (err) {
    console.error("Failed to parse completed assignments:", err);
    return [];
  }
};

export const toggleAssignmentCompletion = async (assignmentId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/auth/assignments/${assignmentId}/toggle`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to toggle completion");
  return res.json();
};