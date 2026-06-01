import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function MyJobs() {
  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await API.get(
        "/company/my-jobs"
      );

      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to fetch jobs ❌"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
        fontFamily:
          "'Inter','Poppins',sans-serif",
        padding: "50px 25px",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Glow Effects */}
      <div
        style={{
          position: "absolute",
          top: "-180px",
          left: "-180px",
          width: "400px",
          height: "400px",
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
          width: "400px",
          height: "400px",
          background: "#7c3aed",
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: 0.18,
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              display:
                "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding:
                "10px 18px",
              borderRadius:
                "999px",
              background:
                "rgba(255,255,255,0.06)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              color: "#cbd5e1",
              marginBottom:
                "18px",
            }}
          >
            💼 Recruiter Dashboard
          </div>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom:
                "12px",
              letterSpacing:
                "-1px",
            }}
          >
            My Posted Jobs
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize:
                "1.05rem",
              lineHeight:
                "1.8",
              maxWidth:
                "650px",
            }}
          >
            Manage your active
            job listings and
            review applicants
            from your recruiter
            dashboard.
          </p>
        </div>

        {/* Jobs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "28px",
          }}
        >
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                style={jobCardStyle}
                onMouseEnter={(
                  e
                ) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.border =
                    "1px solid rgba(96,165,250,0.25)";
                }}
                onMouseLeave={(
                  e
                ) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.08)";
                }}
              >
                {/* Top */}
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    marginBottom:
                      "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize:
                          "2rem",
                        marginBottom:
                          "10px",
                      }}
                    >
                      💼
                    </div>

                    <h2
                      style={{
                        margin:
                          0,
                        fontSize:
                          "1.5rem",
                        fontWeight:
                          "700",
                      }}
                    >
                      {
                        job.title
                      }
                    </h2>
                  </div>

                  <div
                    style={{
                      background:
                        "rgba(59,130,246,0.15)",
                      color:
                        "#60a5fa",
                      border:
                        "1px solid rgba(59,130,246,0.25)",
                      borderRadius:
                        "999px",
                      padding:
                        "8px 14px",
                      fontSize:
                        "0.85rem",
                      fontWeight:
                        "600",
                    }}
                  >
                    Active
                  </div>
                </div>

                {/* Details */}
                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "14px",
                    marginBottom:
                      "24px",
                  }}
                >
                  <JobInfo
                    icon="📍"
                    label="Location"
                    value={
                      job.location
                    }
                  />

                  <JobInfo
                    icon="💰"
                    label="Salary"
                    value={`₹${job.salary}`}
                  />

                  <JobInfo
                    icon="⏳"
                    label="Experience"
                    value={`${job.experienceRequired} Years`}
                  />

                  <JobInfo
                    icon="🛠"
                    label="Skills"
                    value={
                      job.skillsRequired
                    }
                  />
                </div>

                {/* Description */}
                <div
                  style={{
                    marginBottom:
                      "24px",
                  }}
                >
                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "8px",
                      fontWeight:
                        "600",
                    }}
                  >
                    Job
                    Description
                  </p>

                  <p
                    style={{
                      color:
                        "#cbd5e1",
                      lineHeight:
                        "1.8",
                    }}
                  >
                    {
                      job.description
                    }
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to={`/applicants/${job.id}`}
                  style={{
                    textDecoration:
                      "none",
                  }}
                >
                  <button
                    style={
                      buttonStyle
                    }
                  >
                    👥 View
                    Applicants
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn:
                  "1 / -1",
                textAlign:
                  "center",
                marginTop:
                  "80px",
              }}
            >
              <div
                style={{
                  fontSize:
                    "4rem",
                  marginBottom:
                    "18px",
                }}
              >
                📭
              </div>

              <h2
                style={{
                  fontSize:
                    "2rem",
                  marginBottom:
                    "10px",
                }}
              >
                No Jobs Posted
                Yet
              </h2>

              <p
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Start hiring by
                posting your
                first opportunity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JobInfo({
  icon,
  label,
  value,
}) {
  return (
    <div>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "0.9rem",
          marginBottom: "5px",
        }}
      >
        {icon} {label}
      </p>

      <p
        style={{
          margin: 0,
          fontWeight: "600",
          color: "#e2e8f0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

const jobCardStyle = {
  background:
    "rgba(255,255,255,0.06)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "30px",
  padding: "30px",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter:
    "blur(28px)",
  boxShadow:
    "0 25px 50px rgba(0,0,0,0.35)",
  transition:
    "all 0.35s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg,#2563eb 0%, #7c3aed 100%)",
  color: "white",
  fontWeight: "700",
  fontSize: "1rem",
  cursor: "pointer",
  transition:
    "all 0.3s ease",
  boxShadow:
    "0 15px 35px rgba(37,99,235,0.25)",
};

export default MyJobs;