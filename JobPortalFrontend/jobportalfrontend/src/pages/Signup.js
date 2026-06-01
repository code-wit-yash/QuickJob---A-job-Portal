import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify/unstyled";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register", form);

      console.log("REGISTER RESPONSE:", res.data);

      toast.success("Signup successful 🎉");

      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Signup failed ❌");
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
          "radial-gradient(circle at top left, rgba(124,58,237,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(6,182,212,0.18), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
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
          background: "#8b5cf6",
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

      {/* Signup Card */}
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
          ✨ Join QuickJob Today
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
          Create Account
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "34px",
            fontSize: "1rem",
            lineHeight: "1.7",
          }}
        >
          Build your profile and unlock better career
          opportunities with QuickJob.
        </p>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Create Password"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Role Select */}
        <select
          name="role"
          onChange={handleChange}
          style={{
            ...inputStyle,
            cursor: "pointer",
            color: "#e2e8f0",
          }}
        >
          <option
            value="ROLE_USER"
            style={{ background: "#0f172a" }}
          >
            User
          </option>

          <option
            value="ROLE_COMPANY"
            style={{ background: "#0f172a" }}
          >
            Company
          </option>
        </select>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.35s ease",
            boxShadow:
              "0 14px 30px rgba(168,85,247,0.30)",
            marginTop: "8px",
            letterSpacing: "0.3px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-4px)";
            e.target.style.boxShadow =
              "0 20px 35px rgba(168,85,247,0.45)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow =
              "0 14px 30px rgba(168,85,247,0.30)";
          }}
        >
          Create Account
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
            already registered?
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

        {/* Login Redirect */}
        <Link
          to="/login"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "0.98rem",
            transition: "0.3s ease",
          }}
        >
          Login to your account →
        </Link>
      </div>
    </div>
  );
}

/* Input Style */
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

export default Signup;