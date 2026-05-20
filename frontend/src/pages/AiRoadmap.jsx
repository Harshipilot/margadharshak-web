import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AiRoadmap() {
  const [interest, setInterest] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [age, setAge] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  // Load age from localStorage on mount
  useEffect(() => {
    const savedAge = localStorage.getItem('userAge');
    const savedAgeGroup = localStorage.getItem('userAgeGroup');
    if (savedAge && savedAgeGroup) {
      setAge(savedAge);
      setAgeGroup(savedAgeGroup);
    }
  }, []);

  const interests = [
    "AI Engineer",
    "Web Developer",
    "Cybersecurity",
    "Data Science"
  ];

  const handleGenerate = async () => {
    // Add token validation
    if (!token) {
      setError("⚠️ No authentication token found. Please login again.");
      return;
    }
    if (!interest || !age || !ageGroup) {
      setError("Please select your interest and ensure age is set");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/roadmap-generate",
        {
          interest,
          age: parseInt(age),
          ageGroup
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setRoadmapData(response.data.data);
        // Initialize completed array
        setCompleted(
          new Array(response.data.data.steps.length).fill(false)
        );
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError(err.response?.data?.error || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const progress = roadmapData && completed.length > 0
    ? Math.round((completed.filter((c) => c).length / roadmapData.steps.length) * 100)
    : 0;

  const chartData = roadmapData?.steps.map((step, idx) => ({
    name: `Level ${step.level}`,
    level: step.level
  })) || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px",
          textAlign: "center",
          background: "rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#4fd1c5" }}>
          🚀 AI Career Roadmap Planner
        </h1>
        <p style={{ color: "#b0bec5", marginTop: "5px" }}>
          Personalized learning paths with real-time resources
        </p>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          width: "100%",
        }}
      >
        {/* Age Group Info */}
        <div style={{ textAlign: "center", marginBottom: "20px", padding: "10px", background: "rgba(79, 209, 197, 0.1)", borderRadius: "8px" }}>
          <p style={{ margin: 0 }}>
            📊 Age: <strong>{age}</strong> | Group: <strong>{ageGroup === 'under17' ? 'Student (13-17)' : 'Professional (18+)'}</strong>
          </p>
        </div>

        {/* Interest Input */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              width: "60%",
              maxWidth: "400px",
              borderRadius: "10px",
              border: "2px solid #4fd1c5",
              marginRight: "10px",
              background: "#1e293b",
              color: "#fff",
            }}
          >
            <option value="">Select Career Interest...</option>
            {interests.map((int) => (
              <option key={int} value={int}>
                {int}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: loading ? "#666" : "#4fd1c5",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "⏳ Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            textAlign: "center",
            color: "#ff6b6b",
            marginBottom: "20px",
            padding: "10px",
            background: "rgba(255, 107, 107, 0.1)",
            borderRadius: "8px"
          }}>
            ❌ {error}
          </div>
        )}

        {/* Roadmap Section */}
        {roadmapData && (
          <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#4fd1c5",
                fontSize: "1.8rem"
              }}
            >
              📚 {roadmapData.interest} Roadmap for {ageGroup === 'under17' ? 'Students' : 'Professionals'}
            </h2>

            {/* Progress Bar */}
            <div
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "30px",
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <p style={{ marginBottom: "10px" }}>✅ Progress: <strong>{progress}%</strong></p>
                <div
                  style={{
                    background: "#475569",
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "25px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background:
                        progress === 100
                          ? "linear-gradient(to right, #16a34a, #22c55e)"
                          : "linear-gradient(to right, #2563eb, #4fd1c5)",
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </div>
              </div>

              {/* Achievements */}
              {progress >= 50 && progress < 100 && (
                <p style={{ marginTop: "15px", color: "#facc15" }}>
                  🏅 You unlocked the Halfway Badge – keep going!
                </p>
              )}
              {progress === 100 && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "limegreen",
                    fontWeight: "bold",
                  }}
                >
                  🎉 Congratulations! You completed the roadmap!
                </p>
              )}
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div
                style={{
                  background: "#1e293b",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "30px",
                }}
              >
                <h3 style={{ color: "#4fd1c5", marginBottom: "15px" }}>
                  📈 Learning Path Progression
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis domain={[0, roadmapData.steps.length]} stroke="#fff" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="level"
                      stroke="#4fd1c5"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#4fd1c5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Roadmap Steps */}
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#1e293b",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ color: "#4fd1c5", marginBottom: "15px" }}>
                📌 Step-by-Step Roadmap ({roadmapData.steps.length} Levels)
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "15px",
                }}
              >
                {roadmapData.steps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "15px",
                      borderRadius: "10px",
                      background: completed[idx] ? "#065f46" : "#334155",
                      border: "2px solid " + (completed[idx] ? "#10b981" : "#4fd1c5"),
                      transition: "0.3s",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleCompleted(idx)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={completed[idx]}
                        readOnly
                        style={{ marginRight: "10px", width: "20px", height: "20px" }}
                      />
                      <div>
                        <strong style={{ color: "#4fd1c5" }}>Level {step.level}: {step.step}</strong>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#b0bec5" }}>
                          ⏱️ {step.duration}
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#7f8c8d" }}>
                          Skills: {step.skills.slice(0, 2).join(", ")}...
                        </p>
                      </div>
                    </div>

                    {/* Collapsible Details */}
                    {completed[idx] && (
                      <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #555" }}>
                        <p style={{ fontSize: "12px", marginBottom: "8px", color: "#4fd1c5" }}>
                          <strong>📚 Resources:</strong>
                        </p>
                        {step.resources.map((res, i) => (
                          <p key={i} style={{ fontSize: "12px", margin: "2px 0", color: "#b0bec5" }}>
                            • {res}
                          </p>
                        ))}
                        <p style={{ fontSize: "12px", marginTop: "8px", marginBottom: "2px", color: "#4fd1c5" }}>
                          <strong>🎯 Projects:</strong>
                        </p>
                        {step.projects.map((proj, i) => (
                          <p key={i} style={{ fontSize: "12px", margin: "2px 0", color: "#b0bec5" }}>
                            • {proj}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Real Resources Section */}
            {roadmapData.resources && (
              <div style={{ marginTop: "30px", padding: "20px", background: "#1e293b", borderRadius: "12px" }}>
                <h3 style={{ color: "#4fd1c5", marginBottom: "15px" }}>
                  🔗 Real-Time Learning Resources
                </h3>

                {/* Free Courses */}
                {roadmapData.resources.courses && roadmapData.resources.courses.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "#facc15", marginBottom: "10px" }}>📖 Free Online Courses</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }}>
                      {roadmapData.resources.courses.map((course, idx) => (
                        <a
                          key={idx}
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "10px",
                            background: "#334155",
                            borderRadius: "8px",
                            color: "#4fd1c5",
                            textDecoration: "none",
                            border: "1px solid #4fd1c5",
                            transition: "0.3s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#475569"}
                          onMouseLeave={(e) => e.target.style.background = "#334155"}
                        >
                          <strong>{course.title}</strong>
                          <p style={{ fontSize: "12px", margin: "5px 0 0 0", color: "#b0bec5" }}>
                            {course.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Channels */}
                {roadmapData.resources.youtube && roadmapData.resources.youtube.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "#facc15", marginBottom: "10px" }}>▶️ YouTube Channels</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }}>
                      {roadmapData.resources.youtube.map((video, idx) => (
                        <a
                          key={idx}
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "10px",
                            background: "#334155",
                            borderRadius: "8px",
                            color: "#4fd1c5",
                            textDecoration: "none",
                            border: "1px solid #4fd1c5",
                            transition: "0.3s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#475569"}
                          onMouseLeave={(e) => e.target.style.background = "#334155"}
                        >
                          <strong>{video.title}</strong>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* GitHub */}
                {roadmapData.resources.github && roadmapData.resources.github.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "#facc15", marginBottom: "10px" }}>💻 GitHub Projects</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }}>
                      {roadmapData.resources.github.map((repo, idx) => (
                        <a
                          key={idx}
                          href={repo.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "10px",
                            background: "#334155",
                            borderRadius: "8px",
                            color: "#4fd1c5",
                            textDecoration: "none",
                            border: "1px solid #4fd1c5",
                            transition: "0.3s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#475569"}
                          onMouseLeave={(e) => e.target.style.background = "#334155"}
                        >
                          <strong>{repo.title}</strong>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documentation */}
                {roadmapData.resources.documentation && roadmapData.resources.documentation.length > 0 && (
                  <div>
                    <h4 style={{ color: "#facc15", marginBottom: "10px" }}>📚 Documentation & References</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }}>
                      {roadmapData.resources.documentation.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "10px",
                            background: "#334155",
                            borderRadius: "8px",
                            color: "#4fd1c5",
                            textDecoration: "none",
                            border: "1px solid #4fd1c5",
                            transition: "0.3s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#475569"}
                          onMouseLeave={(e) => e.target.style.background = "#334155"}
                        >
                          <strong>{doc.title}</strong>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Empty State */}
        {!roadmapData && !loading && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h2 style={{ color: "#4fd1c5" }}>👋 Welcome to the AI Roadmap Planner!</h2>
            <p style={{ color: "#b0bec5", fontSize: "1.1rem" }}>
              Select a career interest above to generate a personalized learning roadmap with real resources.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
