import { useEffect, useState } from "react";
import API from "../api";

function AppliedJobs() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(
        "/user/my-applications"
      );

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(applications);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 30%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
        color: "white",
        fontFamily:
          "'Inter', 'Poppins', sans-serif",
        padding: "50px 30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
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
          opacity: 0.15,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-180px",
          right: "-180px",
          width: "400px",
          height: "400px",
          background: "#8b5cf6",
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: 0.15,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
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
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 18px",
              borderRadius: "999px",
              background:
                "rgba(255,255,255,0.08)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              marginBottom: "18px",
              color: "#cbd5e1",
              fontSize: "0.9rem",
            }}
          >
            📄 Career Progress
          </div>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "10px",
              letterSpacing: "-1px",
            }}
          >
            My Applications
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.05rem",
              lineHeight: "1.8",
            }}
          >
            Track all the jobs you've applied
            for and monitor application
            progress.
          </p>
        </div>

        {/* Applications Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "26px",
          }}
        >
          {applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app.applicationId}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                  e.currentTarget.style.border =
                    "1px solid rgba(96,165,250,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.08)";
                }}
              >
                {/* Top Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "2rem",
                        marginBottom: "10px",
                      }}
                    >
                      💼
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: "1.4rem",
                        fontWeight: "700",
                      }}
                    >
                      {app.title}
                    </h2>
                  </div>

                  <StatusBadge
                    status={app.status}
                  />
                </div>

                {/* Info */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.95rem",
                      }}
                    >
                      Company
                    </span>

                    <p
                      style={{
                        margin: "5px 0 0",
                        fontWeight: "600",
                        color: "#e2e8f0",
                      }}
                    >
                      {app.companyEmail}
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.95rem",
                      }}
                    >
                      Application Status
                    </span>

                    <p
                      style={{
                        margin: "5px 0 0",
                        fontWeight: "600",
                        color: "#f8fafc",
                      }}
                    >
                      {app.status}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "20px",
                }}
              >
                📭
              </div>

              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "10px",
                }}
              >
                No Applications Yet
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Start applying to jobs and
                track your progress here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isAccepted =
    status?.toLowerCase() === "accepted";

  const isRejected =
    status?.toLowerCase() === "rejected";

  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: "999px",
        fontWeight: "600",
        fontSize: "0.9rem",
        background: isAccepted
          ? "rgba(34,197,94,0.15)"
          : isRejected
          ? "rgba(239,68,68,0.15)"
          : "rgba(59,130,246,0.15)",
        color: isAccepted
          ? "#22c55e"
          : isRejected
          ? "#ef4444"
          : "#60a5fa",
        border: isAccepted
          ? "1px solid rgba(34,197,94,0.3)"
          : isRejected
          ? "1px solid rgba(239,68,68,0.3)"
          : "1px solid rgba(59,130,246,0.3)",
      }}
    >
      {status}
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.06)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "28px",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.35)",
  transition: "all 0.35s ease",
};

export default AppliedJobs;