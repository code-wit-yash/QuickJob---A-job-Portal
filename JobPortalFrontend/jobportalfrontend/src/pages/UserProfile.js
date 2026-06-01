import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

const injectFonts = () => {
  if (document.getElementById("qj-fonts")) return;
  const link = document.createElement("link");
  link.id = "qj-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);
};

function UserProfile() {
  injectFonts();

  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    education: "",
    experience: "",
    linkedinUrl: "",
    skills: "",
    projects: "",
    publications: "",
    certifications: "",
  });

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      if (res.data) setForm(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      await API.put("/user/profile", form);
      toast.success("Profile updated ✅");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed ❌");
    }
  };

  const uploadPhoto = async () => {
    if (!photo) return;
    const data = new FormData();
    data.append("file", photo);
    try {
      const res = await API.post("/user/profile/upload-photo", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, profilePhotoUrl: res.data });
      toast.success("Photo uploaded ✅");
    } catch (err) { console.error(err); }
  };

  const uploadResume = async () => {
    if (!resume) return;
    const data = new FormData();
    data.append("file", resume);
    try {
      const res = await API.post("/user/profile/upload-resume", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, resumeUrl: res.data });
      toast.success("Resume uploaded ✅");
    } catch (err) { console.error(err); }
  };

  const initials = form.name
    ? form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills & Projects" },
    { id: "docs", label: "Documents" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="up-root">
        <div className="up-orb up-orb1" />
        <div className="up-orb up-orb2" />

        {/* ── TOP BAR ── */}
        <header className="up-topbar">
          <a href="/dashboard" className="up-back-link">
            ← Back to Dashboard
          </a>
          <div className="up-topbar-actions">
            {editMode && (
              <button className="up-btn-save" onClick={saveProfile}>
                Save Changes
              </button>
            )}
            <button
              className={editMode ? "up-btn-cancel" : "up-btn-edit"}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "✏️ Edit Profile"}
            </button>
          </div>
        </header>

        <div className="up-layout">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="up-sidebar">
            {/* Avatar */}
            <div className="up-avatar-wrap">
              {form.profilePhotoUrl ? (
                <img
                  src={`http://localhost:8080${form.profilePhotoUrl}`}
                  alt="profile"
                  className="up-avatar-img"
                />
              ) : (
                <div className="up-avatar-placeholder">{initials}</div>
              )}
              {editMode && (
                <div className="up-avatar-upload">
                  <label className="up-file-label" htmlFor="photo-input">
                    Change Photo
                  </label>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    className="up-file-hidden"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && (
                    <button className="up-upload-btn" onClick={uploadPhoto}>
                      Upload →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Name & Quick Info */}
            <div className="up-sidebar-info">
              {editMode ? (
                <>
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="up-inline-input up-name-input"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="up-inline-input"
                  />
                  <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="up-inline-input"
                  />
                  <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="up-inline-input"
                  />
                </>
              ) : (
                <>
                  <h2 className="up-name">{form.name || "Your Name"}</h2>
                  <div className="up-contact-list">
                    {form.email && (
                      <div className="up-contact-item">
                        <span className="up-contact-icon">📧</span>
                        <span>{form.email}</span>
                      </div>
                    )}
                    {form.phoneNumber && (
                      <div className="up-contact-item">
                        <span className="up-contact-icon">📱</span>
                        <span>{form.phoneNumber}</span>
                      </div>
                    )}
                    {form.location && (
                      <div className="up-contact-item">
                        <span className="up-contact-icon">📍</span>
                        <span>{form.location}</span>
                      </div>
                    )}
                    {form.linkedinUrl && (
                      <div className="up-contact-item">
                        <span className="up-contact-icon">🔗</span>
                        <a
                          href={form.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="up-linkedin-link"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Skills preview chips in sidebar */}
            {!editMode && form.skills && (
              <div className="up-sidebar-skills">
                <p className="up-sidebar-section-label">Top Skills</p>
                <div className="up-skill-chips">
                  {form.skills
                    .split(",")
                    .slice(0, 6)
                    .map((s, i) => (
                      <span key={i} className="up-skill-chip">
                        {s.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* LinkedIn edit field */}
            {editMode && (
              <div className="up-sidebar-linkedin">
                <p className="up-field-label">LinkedIn URL</p>
                <input
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedinUrl}
                  onChange={handleChange}
                  className="up-inline-input"
                />
              </div>
            )}
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="up-content">
            {/* Tabs */}
            <div className="up-tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`up-tab ${activeSection === t.id ? "up-tab--active" : ""}`}
                  onClick={() => setActiveSection(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW ── */}
            {activeSection === "overview" && (
              <div className="up-tab-body">
                <ProfileSection title="🎓 Education" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="education"
                      value={form.education}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="e.g. B.Tech Computer Science, XYZ University (2020–2024)"
                      rows={4}
                    />
                  ) : (
                    <p className="up-field-value">{form.education || "Not added yet"}</p>
                  )}
                </ProfileSection>

                <ProfileSection title="📚 Publications" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="publications"
                      value={form.publications}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="Add your published research, articles…"
                      rows={4}
                    />
                  ) : (
                    <p className="up-field-value">{form.publications || "Not added yet"}</p>
                  )}
                </ProfileSection>

                <ProfileSection title="🏆 Certifications" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="certifications"
                      value={form.certifications}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="AWS, GCP, Coursera certificates…"
                      rows={4}
                    />
                  ) : (
                    <p className="up-field-value">{form.certifications || "Not added yet"}</p>
                  )}
                </ProfileSection>
              </div>
            )}

            {/* ── EXPERIENCE ── */}
            {activeSection === "experience" && (
              <div className="up-tab-body">
                <ProfileSection title="💼 Work Experience" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="Describe your work experience, roles, companies…"
                      rows={8}
                    />
                  ) : (
                    <p className="up-field-value up-preformatted">
                      {form.experience || "Not added yet"}
                    </p>
                  )}
                </ProfileSection>
              </div>
            )}

            {/* ── SKILLS & PROJECTS ── */}
            {activeSection === "skills" && (
              <div className="up-tab-body">
                <ProfileSection title="🛠 Skills" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="React, Node.js, Java, Python… (comma separated)"
                      rows={3}
                    />
                  ) : form.skills ? (
                    <div className="up-skill-chips up-skill-chips--lg">
                      {form.skills.split(",").map((s, i) => (
                        <span key={i} className="up-skill-chip up-skill-chip--lg">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="up-field-value">Not added yet</p>
                  )}
                </ProfileSection>

                <ProfileSection title="🚀 Projects" editMode={editMode}>
                  {editMode ? (
                    <textarea
                      name="projects"
                      value={form.projects}
                      onChange={handleChange}
                      className="up-textarea"
                      placeholder="Describe your personal or academic projects…"
                      rows={8}
                    />
                  ) : (
                    <p className="up-field-value up-preformatted">
                      {form.projects || "Not added yet"}
                    </p>
                  )}
                </ProfileSection>
              </div>
            )}

            {/* ── DOCUMENTS ── */}
            {activeSection === "docs" && (
              <div className="up-tab-body">
                <ProfileSection title="📄 Resume" editMode={editMode}>
                  <div className="up-doc-area">
                    {form.resumeUrl ? (
                      <div className="up-doc-preview">
                        <div className="up-doc-icon">📄</div>
                        <div>
                          <p className="up-doc-name">Resume.pdf</p>
                          <a
                            href={`http://localhost:8080${form.resumeUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="up-doc-link"
                          >
                            View Resume →
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="up-field-value">No resume uploaded yet.</p>
                    )}

                    <div className="up-upload-row">
                      <label className="up-file-label" htmlFor="resume-input">
                        Choose PDF
                      </label>
                      <input
                        id="resume-input"
                        type="file"
                        accept=".pdf"
                        className="up-file-hidden"
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                      {resume && (
                        <button className="up-upload-btn" onClick={uploadResume}>
                          Upload Resume →
                        </button>
                      )}
                    </div>
                    {resume && (
                      <p className="up-file-chosen">{resume.name}</p>
                    )}
                  </div>
                </ProfileSection>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div className="up-section">
      <h3 className="up-section-title">{title}</h3>
      <div className="up-section-body">{children}</div>
    </div>
  );
}

/* ─── STYLES ─── */
const css = `
  .up-root {
    min-height: 100vh;
    background: #080c14;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .up-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .up-orb1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #1a3a6e44 0%, transparent 70%);
    top: -150px; right: -100px;
  }
  .up-orb2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #0d3a2f33 0%, transparent 70%);
    bottom: -100px; left: -80px;
  }

  /* ── TOP BAR ── */
  .up-topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,12,20,0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-wrap: wrap;
    gap: 12px;
  }
  .up-back-link {
    font-size: 0.875rem;
    color: #5a6480;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.18s;
  }
  .up-back-link:hover { color: #c5cce8; }

  .up-topbar-actions {
    display: flex;
    gap: 10px;
  }
  .up-btn-edit {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(59,130,246,0.3);
    background: rgba(59,130,246,0.08);
    color: #60a5fa;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
  }
  .up-btn-edit:hover {
    background: rgba(59,130,246,0.18);
    border-color: rgba(59,130,246,0.5);
  }
  .up-btn-cancel {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #6b7aa0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.18s;
  }
  .up-btn-cancel:hover { background: rgba(255,255,255,0.08); color: #c5cce8; }

  .up-btn-save {
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #2563eb, #0ea5e9);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.18s, transform 0.18s;
  }
  .up-btn-save:hover { opacity: 0.88; transform: scale(0.98); }

  /* ── LAYOUT ── */
  .up-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 48px 80px;
    position: relative;
    z-index: 1;
    align-items: start;
  }

  /* ── SIDEBAR ── */
  .up-sidebar {
    position: sticky;
    top: 88px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .up-avatar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  .up-avatar-img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(59,130,246,0.3);
  }
  .up-avatar-placeholder {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e3a5f, #0f2744);
    border: 3px solid rgba(59,130,246,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #60a5fa;
    letter-spacing: 0.02em;
  }
  .up-avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .up-sidebar-info {
    background: rgba(15,22,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .up-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #f0f4ff;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .up-contact-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .up-contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: #6b7aa0;
    overflow: hidden;
  }
  .up-contact-icon { flex-shrink: 0; font-size: 0.85rem; }
  .up-linkedin-link {
    color: #60a5fa;
    text-decoration: none;
    font-size: 0.82rem;
  }
  .up-linkedin-link:hover { text-decoration: underline; }

  .up-sidebar-skills {
    background: rgba(15,22,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 20px;
  }
  .up-sidebar-section-label {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3b82f6;
    font-weight: 500;
    margin: 0 0 12px;
  }
  .up-field-label {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #4a5272;
    font-weight: 500;
    margin: 0 0 8px;
  }

  .up-sidebar-linkedin {
    background: rgba(15,22,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 20px;
  }

  /* ── TABS ── */
  .up-tabs {
    display: flex;
    gap: 4px;
    padding: 5px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    margin-bottom: 28px;
    width: fit-content;
  }
  .up-tab {
    padding: 9px 20px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #5a6480;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .up-tab:hover { color: #c5cce8; background: rgba(255,255,255,0.05); }
  .up-tab--active {
    background: rgba(59,130,246,0.15) !important;
    color: #93c5fd !important;
    border: 1px solid rgba(59,130,246,0.2);
  }

  /* ── CONTENT ── */
  .up-content { min-width: 0; }
  .up-tab-body { display: flex; flex-direction: column; gap: 20px; }

  /* ── SECTION ── */
  .up-section {
    background: rgba(15,22,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 26px 28px;
    transition: border-color 0.2s;
  }
  .up-section:hover { border-color: rgba(255,255,255,0.1); }

  .up-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #c5cce8;
    margin: 0 0 16px;
    letter-spacing: -0.01em;
  }
  .up-section-body {}

  .up-field-value {
    font-size: 0.9rem;
    color: #6b7aa0;
    margin: 0;
    line-height: 1.7;
  }
  .up-preformatted { white-space: pre-wrap; }

  /* ── FORM INPUTS ── */
  .up-textarea {
    width: 100%;
    padding: 13px 15px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1.6;
    resize: vertical;
    outline: none;
    transition: border-color 0.18s, background 0.18s;
    box-sizing: border-box;
  }
  .up-textarea:focus {
    border-color: rgba(59,130,246,0.4);
    background: rgba(255,255,255,0.06);
  }
  .up-textarea::placeholder { color: #3a4260; }

  .up-inline-input {
    width: 100%;
    padding: 10px 13px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.18s;
    box-sizing: border-box;
  }
  .up-inline-input:focus { border-color: rgba(59,130,246,0.4); }
  .up-inline-input::placeholder { color: #3a4260; }
  .up-name-input {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
  }

  /* ── SKILLS ── */
  .up-skill-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .up-skill-chip {
    font-size: 0.75rem;
    padding: 5px 12px;
    border-radius: 8px;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.15);
    color: #60a5fa;
    font-weight: 500;
  }
  .up-skill-chips--lg { gap: 8px; }
  .up-skill-chip--lg {
    font-size: 0.82rem;
    padding: 7px 16px;
    border-radius: 10px;
  }

  /* ── UPLOAD ── */
  .up-file-hidden { display: none; }
  .up-file-label {
    display: inline-block;
    padding: 9px 18px;
    border-radius: 10px;
    border: 1px dashed rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03);
    color: #6b7aa0;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
  }
  .up-file-label:hover { border-color: rgba(59,130,246,0.3); color: #93c5fd; background: rgba(59,130,246,0.05); }

  .up-upload-btn {
    padding: 9px 18px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #2563eb, #0ea5e9);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.18s;
  }
  .up-upload-btn:hover { opacity: 0.85; }

  .up-upload-row { display: flex; align-items: center; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
  .up-file-chosen { font-size: 0.78rem; color: #4a5272; margin: 6px 0 0; }

  /* ── DOCUMENTS ── */
  .up-doc-area { display: flex; flex-direction: column; gap: 16px; }
  .up-doc-preview {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
  }
  .up-doc-icon { font-size: 1.8rem; }
  .up-doc-name { font-size: 0.875rem; color: #c5cce8; margin: 0 0 4px; font-weight: 500; }
  .up-doc-link { font-size: 0.82rem; color: #60a5fa; text-decoration: none; }
  .up-doc-link:hover { text-decoration: underline; }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .up-layout {
      grid-template-columns: 1fr;
      padding: 24px 20px 60px;
    }
    .up-sidebar { position: static; }
    .up-topbar { padding: 16px 20px; }
    .up-tabs { overflow-x: auto; }
  }
`;

export default UserProfile;