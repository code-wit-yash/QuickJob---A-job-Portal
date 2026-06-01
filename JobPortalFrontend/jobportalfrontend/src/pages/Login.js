import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);

      console.log(sessionStorage.getItem("role"));

      toast.success("Login successful 🚀");

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      console.log("ERROR RESPONSE:", err.response);
      toast.error("Login failed ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(6,182,212,0.18), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "20px",
      }}
    >
      {/* Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "-180px",
          left: "-180px",
          width: "420px",
          height: "420px",
          background: "#2563eb",
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: 0.18,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-180px",
          right: "-180px",
          width: "420px",
          height: "420px",
          background: "#06b6d4",
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: 0.18,
        }}
      />

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "32px",
          padding: "50px 40px",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 18px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#cbd5e1",
            fontSize: "0.9rem",
            fontWeight: "500",
            marginBottom: "24px",
          }}
        >
          👋 Welcome Back to QuickJob
        </div>

        {/* Heading */}
        <h1
          style={{
            color: "#fff",
            marginBottom: "12px",
            fontSize: "2.5rem",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
        User Login
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "34px",
            fontSize: "1rem",
            lineHeight: "1.7",
          }}
        >
          Access your account and continue your
          career journey with QuickJob.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: "24px",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.35s ease",
            boxShadow:
              "0 14px 30px rgba(37,99,235,0.30)",
            letterSpacing: "0.3px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-4px)";
            e.target.style.boxShadow =
              "0 20px 35px rgba(37,99,235,0.45)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow =
              "0 14px 30px rgba(37,99,235,0.30)";
          }}
        >
          Login to Account
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "28px 0 18px",
            color: "#64748b",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ margin: "0 12px" }}>
            new here?
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Signup Redirect */}
        <Link
          to="/signup"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "0.98rem",
            transition: "0.3s ease",
          }}
        >
          Create a new account →
        </Link>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px 18px",
  marginBottom: "18px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  outline: "none",
  fontSize: "0.98rem",
  boxSizing: "border-box",
  transition: "0.3s ease",
  backdropFilter: "blur(10px)",
};

export default Login;