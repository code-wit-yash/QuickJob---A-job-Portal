import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = sessionStorage.getItem("token");
    console.log("TOKEN:", token);

    try {
      const res = await API.get("/user/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const apply = async (jobId) => {
    try {
      await API.post(`/user/apply/${jobId}`);
      toast.success("Applied successfully ✅");
    } catch (err) {
      const message =
        err.response?.data || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #312e81 100%)",
        padding: "40px",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "#8b5cf6",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "#06b6d4",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Explore Jobs 💼
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1rem",
          }}
        >
          Discover opportunities and apply to your dream job
        </p>
      </div>

      {/* Jobs Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "24px",
                padding: "28px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.25)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.35)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.25)";
              }}
            >
              {/* Job Info */}
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "12px",
                  }}
                >
                  💼
                </div>

                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "12px",
                    color: "white",
                  }}
                >
                  {job.title}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: "1.7",
                    marginBottom: "25px",
                    minHeight: "80px",
                  }}
                >
                  {job.description}
                </p>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => apply(job.id)}
                style={{
                  border: "none",
                  borderRadius: "14px",
                  padding: "14px",
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    "0 8px 20px rgba(59,130,246,0.35)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform =
                    "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform =
                    "translateY(0px)";
                }}
              >
                Apply Now 🚀
              </button>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#cbd5e1",
              marginTop: "80px",
            }}
          >
            <h2>No jobs available 😕</h2>
            <p>Check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;