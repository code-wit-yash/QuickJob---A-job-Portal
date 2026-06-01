import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function ApplicantProfile() {

  const { email } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get(
        `/company/profile/${email}`
      );

      setProfile(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const sectionStyle = {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "25px",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  

  if (!profile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
        padding: "40px",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* Header */}

        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {profile.profilePhotoUrl ? (
              <img
                src={`http://localhost:8080${profile.profilePhotoUrl}`}
                alt="Profile"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #38bdf8",
                }}
              />
            ) : (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "#334155",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "4rem",
                }}
              >
                👤
              </div>
            )}

            <div>
              <h1>
                {profile.name || "Applicant"}
              </h1>

              <p>
                📧 {profile.email}
              </p>

              <p>
                📱 {profile.phoneNumber || "-"}
              </p>

              <p>
                📍 {profile.location || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Education */}

        <div style={sectionStyle}>
          <h2>🎓 Education</h2>

          <p>
            {profile.education || "Not Added"}
          </p>
        </div>

        {/* Experience */}

        <div style={sectionStyle}>
          <h2>💼 Experience</h2>

          <p>
            {profile.experience || "Not Added"}
          </p>
        </div>

        {/* Skills */}

        <div style={sectionStyle}>
          <h2>🛠 Skills</h2>

          <p>
            {profile.skills || "Not Added"}
          </p>
        </div>

        {/* Projects */}

        <div style={sectionStyle}>
          <h2>🚀 Projects</h2>

          <p>
            {profile.projects || "Not Added"}
          </p>
        </div>

        {/* LinkedIn */}

        <div style={sectionStyle}>
          <h2>🔗 LinkedIn</h2>

          {profile.linkedinUrl ? (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#38bdf8",
              }}
            >
              Open LinkedIn Profile
            </a>
          ) : (
            <p>Not Added</p>
          )}
        </div>

        {/* Publications */}

        <div style={sectionStyle}>
          <h2>📚 Publications</h2>

          <p>
            {profile.publications || "Not Added"}
          </p>
        </div>

        {/* Certifications */}

        <div style={sectionStyle}>
          <h2>🏆 Certifications</h2>

          <p>
            {profile.certifications || "Not Added"}
          </p>
        </div>

        {/* Resume */}

        <div style={sectionStyle}>
          <h2>📄 Resume</h2>

          {profile.resumeUrl ? (
            <a
              href={`http://localhost:8080${profile.resumeUrl}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
              }}
            >
              View Resume 📄
            </a>
          ) : (
            <p>No Resume Uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicantProfile;