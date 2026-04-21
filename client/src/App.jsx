import { useState } from "react";
import axios from "axios";

import neutralFace from "./assets/neutral.png";
import thinkingFace from "./assets/thinking.png";
import lowFace from "./assets/low.png";
import mediumFace from "./assets/medium.png";
import highFace from "./assets/high.png";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5001/analyze", {
        message,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error calling backend");
    }

    setLoading(false);
  };

  const getFace = () => {
    if (loading) return thinkingFace;
    if (!result) return neutralFace;

    if (result.priority === "high") return highFace;
    if (result.priority === "medium") return mediumFace;
    return lowFace;
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6",
      color: "#111827",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 600,
        background: "white",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}>

        {/* TITLE */}
        <h2 style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "16px",
          color: "#111827"
        }}>
          AI OPS AGENT
        </h2>

        {/* INPUT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please enter your issue here..."
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#f9fafb",
              color: "#111827",
              resize: "none",
              outline: "none",
              boxSizing: "border-box"
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={!message || loading}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* OUTPUT */}
        <div style={{
          marginTop: 20,
          display: "flex",
          gap: 20,
          alignItems: "flex-start"
        }}>

          {/* FACE */}
          <div style={{
            width: 90,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <img
              src={getFace()}
              alt="status"
              style={{ width: 80, height: 80 }}
            />
          </div>

          {/* TEXT */}
          <div style={{ flex: 1 }}>
            <div style={{
              opacity: 0.6,
              fontSize: 12,
              marginBottom: 8
            }}>
              SYSTEM OUTPUT
            </div>

            {result ? (
              <>
                <p><b>Type:</b> {result.type}</p>
                <p><b>Priority:</b> {result.priority}</p>
                <p><b>Response:</b> {result.response}</p>
              </>
            ) : (
              <p style={{ opacity: 0.5 }}>
                No analysis yet — submit a message to begin.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}