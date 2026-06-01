import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

function CompanyProfile() {

  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applicants: 0,
    hired: 0,
  });

  const fetchStats = async () => {

    try {

      const res = await API.get(
        "/company/stats"
      );

      setStats(res.data);

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

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    marginTop: "10px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    border: "none",
    padding: "14px 25px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#38bdf8",
    color: "white",
  };

  const [form, setForm] = useState({
    companyName: "",
    location: "",
    website: "",
    helpNumber: "",
    description: "",
  });

  useEffect(() => {

    fetchProfile();
    fetchStats();

  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get(
        "/company/profile"
      );

      if (res.data) {
        setForm(res.data);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const saveProfile = async () => {

    try {

      await API.put(
        "/company/profile",
        form
      );

      toast.success("Saved ✅");

    } catch (err) {
      console.error(err);
    }
  };

  const uploadPhoto = async () => {

    if (!photo) return;

    const data = new FormData();
    data.append("file", photo);

    try {

      const res = await API.post(
        "/company/profile/upload-photo",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setForm({
        ...form,
        profilePhotoUrl: res.data,
      });

      toast.success("Photo uploaded ✅");

    } catch (err) {
      console.error(err);
    }
  };

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
      <h1>Company Profile 🏢</h1>

      <div style={{ maxWidth: "1000px", margin: "auto" }}>

        {/* Header Card */}

        <div style={sectionStyle}>
          <h2>🖼 Company Logo</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhoto(e.target.files[0])
            }
          />

          <br />
          <br />

          <button
            style={buttonStyle}
            onClick={uploadPhoto}
          >
            Upload Logo
          </button>
        </div>
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#334155",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "3rem",
              }}
            >
              {form.profilePhotoUrl ? (
                <img
                  src={`http://localhost:8080${form.profilePhotoUrl}`}
                  alt="company"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "🏢"
              )}
            </div>

            <div>
              <h2>
                {form.companyName || "Company Name"}
              </h2>

              <p>
                📍 {form.location || "Location not added"}
              </p>

              <p>
                🌐 {form.website || "Website not added"}
              </p>

              <p>
                ☎️ {form.helpNumber || "Help number not added"}
              </p>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div style={sectionStyle}>
          <h2>🏢 About Company</h2>

          {editMode ? (
            <textarea
              rows="6"
              name="description"
              value={form.description}
              onChange={handleChange}
              style={inputStyle}
            />
          ) : (
            <p>
              {form.description ||
                "Company description not added yet"}
            </p>
          )}
        </div>

        {/* Company Information */}
        <div style={sectionStyle}>
          <h2>📋 Company Information</h2>

          {editMode ? (
            <>
              <input
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                name="helpNumber"
                placeholder="Help Number"
                value={form.helpNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </>
          ) : (
            <>
              <p>
                <strong>Company:</strong>{" "}
                {form.companyName || "-"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {form.location || "-"}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {form.website || "-"}
              </p>

              <p>
                <strong>Help Number:</strong>{" "}
                {form.helpNumber || "-"}
              </p>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div style={sectionStyle}>
            <h2>💼 Jobs Posted</h2>
            <h1>{stats.jobsPosted}</h1>
          </div>

          <div style={sectionStyle}>
            <h2>👥 Applicants</h2>
            <h1>{stats.applicants}</h1>
          </div>

          <div style={sectionStyle}>
            <h2>🎯 Hired</h2>
            <h1>{stats.hired}</h1>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            style={buttonStyle}
            onClick={() =>
              setEditMode(!editMode)
            }
          >
            {editMode
              ? "Cancel"
              : "Edit Profile ✏️"}
          </button>

          {editMode && (
            <button
              style={buttonStyle}
              onClick={saveProfile}
            >
              Save Profile 🚀
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

export default CompanyProfile;