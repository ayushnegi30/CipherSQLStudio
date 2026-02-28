/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getAssignmentById,
  executeQuery,
  getHint,
  getTablePreview,
  toggleAssignmentCompletion,
} from "../api/api";
import Editor from "@monaco-editor/react";
import "../styles/AssignmentAttempt.scss";

const AssignmentAttempt = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loadingAssignment, setLoadingAssignment] = useState(true);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [executing, setExecuting] = useState(false);

  const [hint, setHint] = useState("");
  const [hintLoading, setHintLoading] = useState(false);

  const [isCompleted, setIsCompleted] = useState(
    location.state?.isCompleted || false
  );
  const [isToggling, setIsToggling] = useState(false);

  const [previewData, setPreviewData] = useState({});

  // Fetch assignment
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoadingAssignment(true);
        const data = await getAssignmentById(id);
        setAssignment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAssignment(false);
      }
    };

    fetchAssignment();
  }, [id]);

  // Automatically load table previews
  useEffect(() => {
    const loadPreviews = async () => {
      if (!assignment?.tables) return;

      try {
        const previews = {};

        for (const table of assignment.tables) {
          const data = await getTablePreview(table.name);
          previews[table.name] = data;
        }

        setPreviewData(previews);
      } catch (err) {
        console.error("Failed to load previews", err);
      }
    };

    loadPreviews();
  }, [assignment]);

  // Execute SQL
  const handleExecute = async () => {
    if (!query.trim()) {
      setError("Query cannot be empty.");
      return;
    }

    setError("");
    setResult(null);
    setExecuting(true);

    try {
      const data = await executeQuery({
        assignmentId: id,
        query,
      });

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong while executing query.");
      }
    } finally {
      setExecuting(false);
    }
  };

  // Get Hint
  const handleHint = async () => {
    console.log("HINT BUTTON CLICKED");
    if (!query.trim()) {
      setHint("Try writing some query first 🙂");
      return;
    }

    setHint("");
    setHintLoading(true);

    try {
      const data = await getHint({
        assignmentId: id,
        userQuery: query,
      });
      setHint(data.hint);
    } catch (err) {
      setHint(err.message || "Failed to fetch hint.");
    } finally {
      setHintLoading(false);
    }
  };

  // Mark as done
  const handleToggleComplete = async () => {
    setIsToggling(true);
    try {
      await toggleAssignmentCompletion(id);
      setIsCompleted(!isCompleted);
    } catch (err) {
      // Optionally show an error to the user
      console.error("Failed to update completion status", err);
    } finally {
      setIsToggling(false);
    }
  };

  if (loadingAssignment) {
    return <p className="loading">Loading assignment...</p>;
  }

  if (!assignment) {
    return <p className="error">Assignment not found.</p>;
  }

  return (
  <div className="attempt-page">

    {/* Back */}
    <div className="back-link"
      onClick={() => navigate("/")}>
      ← Back to assignments
    </div>

    {/* Header */}
    <div className="attempt-header">
      <div>
        <h1>{assignment.title}</h1>
        <p>{assignment.question}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        <span className={`difficulty ${assignment.difficulty.toLowerCase()}`}>
          {assignment.difficulty}
        </span>
        <button
          onClick={handleToggleComplete}
          disabled={isToggling}
          className={`toggle-complete-btn ${isCompleted ? "completed" : ""}`}
        >
          {isToggling ? "Updating..." : isCompleted ? "✓ Completed" : "Mark as Done"}
        </button>
      </div>
    </div>

    {/* Tables */}
    <section className="tables-section">
      <h2>Available Tables</h2>

      {Object.keys(previewData).map(tableName => (
        <div key={tableName} className="table-card">

          <div className="table-header">
            <span className="table-name">{tableName}</span>
            <span className="columns">
              Columns: {previewData[tableName]?.columns?.join(", ")}
            </span>
          </div>

          <table>
            <thead>
              <tr>
                {previewData[tableName]?.columns?.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData[tableName]?.rows?.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ))}
    </section>

    {/* Editor */}
    <section className="editor-section">
      <h2>Write your SQL query</h2>

      <div className="editor-wrapper">
        <Editor
          height="220px"
          theme="vs-dark"
          language="sql"
          value={query}
          onChange={(value) => setQuery(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="editor-actions">
        <button className="execute" onClick={handleExecute}>
          ▶ Execute Query
        </button>

        <button className="hint" onClick={handleHint} disabled={hintLoading}>
          {hintLoading ? "Thinking..." : "💡 Get Hint"}
        </button>

        <button className="reset" onClick={() => setQuery("")}>
          ⟳ Reset
        </button>
      </div>
      {hint && (
        <div className="hint-box">
          💡 <strong>Hint:</strong> {hint}
        </div>
      )}
    </section>
    {error && (
        <div className="error-box">
          ❌ {error}
        </div>
    )}

    {/* Result */}
    {result && (
      <section className="result-section">
        <h2>Query Result</h2>
        <table>
          <thead>
            <tr>
              {result.columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )}

  </div>
);
};

export default AssignmentAttempt;