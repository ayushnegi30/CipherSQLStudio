import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAssignments, getCompletedAssignments } from "../api/api";
import "../styles/AssignmentList.scss";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Fetch assignments and completed status in parallel
        const [assignmentsData, completedIds] = await Promise.all([
          getAssignments(),
          getCompletedAssignments(),
        ]);

        const completedSet = new Set(completedIds.map(String));
        const assignmentsWithStatus = assignmentsData.map((assignment) => ({
          ...assignment,
          isCompleted: completedSet.has(assignment._id),
        }));

        setAssignments(assignmentsWithStatus);
      } catch (err) {
        setError("Failed to load assignments. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <p className="loading">Loading assignments...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredAssignments =
    filter === "All"
      ? assignments
      : assignments.filter(
          (a) => a.difficulty.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="assignment-page">
      
      {/* Header */}
      <div className="header-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>SQL Assignments</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>
        <p>
          Practice your SQL skills with structured challenges across all
          difficulty levels.
        </p>

        <div className="filters">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              className={`filter-btn ${
                filter === level ? "active" : ""
              } ${level.toLowerCase()}`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="assignment-grid">
        {filteredAssignments.map((assignment) => (
          <div key={assignment._id} className="assignment-card">
            {assignment.isCompleted && (
              <div className="completed-badge" title="Completed">
                ✓
              </div>
            )}

            <span className="sql-tag">SQL</span>

            <h3>{assignment.title}</h3>

            <p className="description">
              {assignment.description}
            </p>

            <div className="card-footer">
              <span
                className={`difficulty ${assignment.difficulty.toLowerCase()}`}
              >
                {assignment.difficulty}
              </span>

              <Link
                to={`/assignment/${assignment._id}`}
                state={{ isCompleted: assignment.isCompleted }}
                className="attempt-btn"
              >
                ▶ Attempt
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AssignmentList;