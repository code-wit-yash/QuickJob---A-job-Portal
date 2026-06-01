import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "16px 38px",
    border: "none",
    borderRadius: "16px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.35s ease",
    letterSpacing: "0.3px",
    minWidth: "170px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(99,102,241,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(6,182,212,0.15), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 35%, #111827 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "20px",
      }}
    >
      {/* Ambient Glow Effects */}
      <div
        style={{
          position: "absolute",
          top: "-180px",
          left: "-180px",
          width: "450px",
          height: "450px",
          background: "#7c3aed",
          borderRadius: "50%",
          filter: "blur(160px)",
          opacity: 0.18,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-180px",
          right: "-180px",
          width: "450px",
          height: "450px",
          background: "#06b6d4",
          borderRadius: "50%",
          filter: "blur(160px)",
          opacity: 0.16,
        }}
      />

      {/* Floating Accent */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "12%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(168,85,247,0.08))",
          filter: "blur(50px)",
        }}
      />

      {/* Main Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          borderRadius: "34px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
          padding: "75px 55px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#cbd5e1",
            fontSize: "0.92rem",
            marginBottom: "28px",
            fontWeight: "500",
          }}
        >
          🚀 Smart Career & Hiring Platform
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2.7rem, 5vw, 4.5rem)",
            fontWeight: "800",
            lineHeight: "1.08",
            color: "#ffffff",
            marginBottom: "22px",
            letterSpacing: "-1.5px",
          }}
        >
          Welcome to{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #60a5fa, #22d3ee, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            QuickJob
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.15rem",
            color: "#94a3b8",
            lineHeight: "1.9",
            maxWidth: "650px",
            margin: "0 auto 50px auto",
            fontWeight: "400",
          }}
        >
          Discover meaningful career opportunities, connect with
          top companies, and hire exceptional talent — all in one
          seamless recruitment platform.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              ...buttonStyle,
              background:
                "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
              color: "#fff",
              boxShadow:
                "0 12px 30px rgba(37,99,235,0.35)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow =
                "0 18px 35px rgba(37,99,235,0.45)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 12px 30px rgba(37,99,235,0.35)";
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            style={{
              ...buttonStyle,
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              color: "#fff",
              boxShadow:
                "0 12px 30px rgba(168,85,247,0.35)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow =
                "0 18px 35px rgba(168,85,247,0.45)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 12px 30px rgba(168,85,247,0.35)";
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;