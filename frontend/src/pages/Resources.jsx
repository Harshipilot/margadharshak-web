import React, { useState } from "react";
import { getResources } from "../api";

function Resources() {
  const [interest, setInterest] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    if (!interest) {
      alert("Please enter an interest");
      return;
    }
    setLoading(true);
    try {
      const { data } = await getResources(interest);
      if (data.success) {
        setResources(data.data);
      } else {
        setResources([]);
        alert(data.message);
      }
    } catch (err) {
      console.error("Error fetching resources:", err);
      alert("Server error. Check backend is running.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #f3f4f6, #e0f2fe)",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "28px",
          marginBottom: "30px",
        }}
      >
        🔎 Find Learning Resources
      </h2>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Enter interest (e.g. AI, Web Development)"
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
        <button
          onClick={fetchResources}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center", color: "#555" }}>Loading...</p>
      )}

      {/* Results */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {resources.map((res, i) => (
          <a
            key={i}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "18px",
              background: "white",
              borderRadius: "12px",
              textDecoration: "none",
              border: "1px solid #ddd",
              color: "#111",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.15)")
            }
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <h3 style={{ margin: "0 0 8px", color: "#2563eb" }}>
              {res.title}
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              {res.link}
            </p>
          </a>
        ))}
      </div>

      {/* No results */}
      {!loading && resources.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          No resources yet. Try searching above!
        </p>
      )}
    </div>
  );
}

export default Resources;
