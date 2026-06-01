import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

/* ─── Google Fonts injected once ─── */
const injectFonts = () => {
  if (document.getElementById("qj-fonts")) return;
  const link = document.createElement("link");
  link.id = "qj-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);
};

function Dashboard() {
  injectFonts();

  const role = sessionStorage.getItem("role");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  useEffect(() => {
    if (role === "ROLE_USER") fetchJobs();
  }, [role]);

  useEffect(() => {
    if (role === "ROLE_COMPANY") checkCompanyProfile();
  }, [role]);

  const fetchJobs = async () => {
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
      const message = err.response?.data || "Something went wrong";
      toast.error(message);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const checkCompanyProfile = async () => {
    try {
      const res = await API.get("/company/profile-complete");
      setProfileComplete(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="qj-root">
        {/* Ambient background shapes */}
        <div className="qj-orb qj-orb1" />
        <div className="qj-orb qj-orb2" />
        <div className="qj-orb qj-orb3" />

        {/* ── HEADER ── */}
        <header className="qj-header">
          <div className="qj-brand">
            <span className="qj-logo-mark">Q</span>
            <div>
              <h1 className="qj-brand-name">QuickJob</h1>
              <p className="qj-brand-tagline">Your career, accelerated.</p>
            </div>
          </div>

          <nav className="qj-nav">
            {role === "ROLE_USER" ? (
              <>
                <Link to="/my-applications" className="qj-nav-link">
                  <span className="qj-nav-icon">📄</span> Applied Jobs
                </Link>
                <Link to="/profile" className="qj-nav-link">
                  <span className="qj-nav-icon">👤</span> Profile
                </Link>
              </>
            ) : (
              <Link to="/company/profile" className="qj-nav-link">
                <span className="qj-nav-icon">🏢</span> Company Profile
              </Link>
            )}
            <button onClick={logout} className="qj-logout-btn">
              Logout
            </button>
          </nav>
        </header>

        {/* ── USER DASHBOARD ── */}
        {role === "ROLE_USER" && (
          <main className="qj-main">
            {/* Hero / search row */}
            <div className="qj-hero">
              <div>
                <p className="qj-hero-eyebrow">Explore Opportunities</p>
                <h2 className="qj-hero-heading">Find your next role</h2>
              </div>
              <div className="qj-search-wrap">
                <span className="qj-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by title, skill or company…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="qj-search-input"
                />
              </div>
            </div>

            {/* Stats strip */}
            <div className="qj-stats-strip">
              <div className="qj-stat">
                <span className="qj-stat-num">{jobs.length}</span>
                <span className="qj-stat-label">Open Roles</span>
              </div>
              <div className="qj-stat-divider" />
              <div className="qj-stat">
                <span className="qj-stat-num">{filteredJobs.length}</span>
                <span className="qj-stat-label">Matching</span>
              </div>
              <div className="qj-stat-divider" />
              <div className="qj-stat">
                <span className="qj-stat-num">Live</span>
                <span className="qj-stat-label">Board Status</span>
              </div>
            </div>

            {/* Jobs grid */}
            {filteredJobs.length > 0 ? (
              <div className="qj-grid">
                {filteredJobs.map((job, i) => (
                  <div
                    key={job.id}
                    className="qj-card"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="qj-card-top">
                      <div className="qj-card-badge">💼</div>
                      <span className="qj-card-company">{job.companyEmail}</span>
                    </div>

                    <h3 className="qj-card-title">{job.title}</h3>

                    <div className="qj-card-meta">
                      <span className="qj-meta-chip">📍Location: {job.location}</span>
                      <span className="qj-meta-chip">💰Salary: {job.salary}</span>
                      <span className="qj-meta-chip">🧠Exprience: {job.experienceRequired}</span>
                    </div>

                    <p className="qj-card-skills">
                      <strong>Skills:</strong> {job.skills}
                    </p>

                    <p className="qj-card-desc">{job.description}</p>

                    <div className="qj-card-actions">
                      <button
                        onClick={() => apply(job.id)}
                        className="qj-btn-primary"
                      >
                        Apply Now →
                      </button>
                      <Link to={`/company-view/${job.companyEmail}`}>
                        <button className="qj-btn-ghost">View Company</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="qj-empty">
                <div className="qj-empty-icon">🔎</div>
                <h3>No matching jobs found</h3>
                <p>Try adjusting your search terms.</p>
              </div>
            )}
          </main>
        )}

        {/* ── COMPANY DASHBOARD ── */}
        {role === "ROLE_COMPANY" && (
          <main className="qj-main">
            <div className="qj-hero">
              <div>
                <p className="qj-hero-eyebrow">Company Portal</p>
                <h2 className="qj-hero-heading">Manage your listings</h2>
              </div>
            </div>

            {!profileComplete && (
              <div className="qj-warning-banner">
                <span>⚠️</span>
                <span>Complete your company profile to unlock job posting.</span>
              </div>
            )}

            <div className="qj-company-grid">
              {profileComplete ? (
                <Link to="/post-job" className="qj-company-card">
                  <div className="qj-cc-icon">📝</div>
                  <h3 className="qj-cc-title">Post a Job</h3>
                  <p className="qj-cc-desc">Create new job openings for candidates</p>
                  <span className="qj-cc-arrow">→</span>
                </Link>
              ) : (
                <div className="qj-company-card qj-company-card--locked">
                  <div className="qj-cc-icon">🔒</div>
                  <h3 className="qj-cc-title">Post a Job</h3>
                  <p className="qj-cc-desc">Complete your profile first to post jobs</p>
                </div>
              )}

              <Link to="/company/my-jobs" className="qj-company-card">
                <div className="qj-cc-icon">📋</div>
                <h3 className="qj-cc-title">My Posted Jobs</h3>
                <p className="qj-cc-desc">Manage and review all your listings</p>
                <span className="qj-cc-arrow">→</span>
              </Link>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

/* ─── STYLES ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .qj-root {
    min-height: 100vh;
    background: #080c14;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* Ambient orbs */
  .qj-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .qj-orb1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, #1a3a6e55 0%, transparent 70%);
    top: -120px; left: -120px;
  }
  .qj-orb2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #0d4f3f44 0%, transparent 70%);
    bottom: -100px; right: -100px;
  }
  .qj-orb3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #2d1a6e33 0%, transparent 70%);
    top: 40%; left: 55%;
  }

  /* ─── HEADER ─── */
  .qj-header {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8, 12, 20, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    flex-wrap: wrap;
    gap: 16px;
  }
  .qj-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .qj-logo-mark {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #2563eb, #0ea5e9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    flex-shrink: 0;
  }
  .qj-brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.02em;
    color: #f0f4ff;
  }
  .qj-brand-tagline {
    font-size: 0.72rem;
    color: #5a6480;
    margin: 2px 0 0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .qj-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .qj-nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
    color: #c5cce8;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.18s ease;
  }
  .qj-nav-link:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.14);
    color: #fff;
  }
  .qj-nav-icon { font-size: 1rem; }

  .qj-logout-btn {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(239,68,68,0.25);
    background: rgba(239,68,68,0.08);
    color: #f87171;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
  }
  .qj-logout-btn:hover {
    background: rgba(239,68,68,0.18);
    border-color: rgba(239,68,68,0.45);
  }

  /* ─── MAIN ─── */
  .qj-main {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 48px 80px;
  }

  /* ─── HERO ─── */
  .qj-hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 24px;
  }
  .qj-hero-eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3b82f6;
    font-weight: 500;
    margin: 0 0 8px;
  }
  .qj-hero-heading {
    font-family: 'Syne', sans-serif;
    font-size: 2.6rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.03em;
    color: #f0f4ff;
    line-height: 1.1;
  }

  /* ─── SEARCH ─── */
  .qj-search-wrap {
    position: relative;
    width: 380px;
    max-width: 100%;
  }
  .qj-search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    pointer-events: none;
  }
  .qj-search-input {
    width: 100%;
    padding: 14px 18px 14px 44px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(16px);
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.18s, background 0.18s;
    box-sizing: border-box;
  }
  .qj-search-input::placeholder { color: #4a5272; }
  .qj-search-input:focus {
    border-color: rgba(59,130,246,0.45);
    background: rgba(255,255,255,0.07);
  }

  /* ─── STATS STRIP ─── */
  .qj-stats-strip {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 18px 28px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.03);
    margin-bottom: 36px;
    width: fit-content;
  }
  .qj-stat { padding: 0 24px; text-align: center; }
  .qj-stat:first-child { padding-left: 0; }
  .qj-stat-num {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #f0f4ff;
    letter-spacing: -0.02em;
  }
  .qj-stat-label {
    font-size: 0.72rem;
    color: #4a5272;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  .qj-stat-divider {
    width: 1px;
    height: 36px;
    background: rgba(255,255,255,0.07);
  }

  /* ─── JOBS GRID ─── */
  .qj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  /* ─── JOB CARD ─── */
  .qj-card {
    background: rgba(15,22,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    backdrop-filter: blur(12px);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    animation: qjFadeUp 0.4s ease both;
  }
  .qj-card:hover {
    transform: translateY(-3px);
    border-color: rgba(59,130,246,0.25);
    box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.08);
  }

  @keyframes qjFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .qj-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .qj-card-badge {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }
  .qj-card-company {
    font-size: 0.75rem;
    color: #4a5272;
    letter-spacing: 0.02em;
    font-weight: 500;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .qj-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #e8eaf0;
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .qj-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .qj-meta-chip {
    font-size: 0.75rem;
    padding: 5px 11px;
    border-radius: 8px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.07);
    color: #8896c0;
    font-weight: 400;
  }

  .qj-card-skills {
    font-size: 0.82rem;
    color: #6b7aa0;
    margin: 0;
    line-height: 1.5;
  }
  .qj-card-skills strong { color: #8896c0; font-weight: 500; }

  .qj-card-desc {
    font-size: 0.82rem;
    color: #5a6480;
    margin: 0;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .qj-card-actions {
    display: flex;
    gap: 10px;
    margin-top: 4px;
  }
  .qj-btn-primary {
    flex: 1;
    padding: 12px 0;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: opacity 0.18s, transform 0.18s;
  }
  .qj-btn-primary:hover { opacity: 0.88; transform: scale(0.98); }

  .qj-btn-ghost {
    flex: 1;
    padding: 12px 0;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #8896c0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    width: 100%;
  }
  .qj-btn-ghost:hover {
    background: rgba(255,255,255,0.08);
    color: #c5cce8;
    border-color: rgba(255,255,255,0.14);
  }

  /* ─── EMPTY STATE ─── */
  .qj-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    color: #4a5272;
  }
  .qj-empty-icon { font-size: 3rem; margin-bottom: 16px; }
  .qj-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    color: #6b7aa0;
    margin: 0 0 8px;
  }
  .qj-empty p { font-size: 0.875rem; margin: 0; }

  /* ─── WARNING BANNER ─── */
  .qj-warning-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 22px;
    border-radius: 14px;
    border: 1px solid rgba(245,158,11,0.3);
    background: rgba(245,158,11,0.07);
    color: #fbbf24;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 32px;
  }

  /* ─── COMPANY GRID ─── */
  .qj-company-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    max-width: 720px;
  }
  .qj-company-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 36px 30px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(15,22,40,0.7);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .qj-company-card:hover {
    transform: translateY(-3px);
    border-color: rgba(59,130,246,0.3);
  }
  .qj-company-card--locked {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }
  .qj-cc-icon { font-size: 2rem; }
  .qj-cc-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #e8eaf0;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .qj-cc-desc {
    font-size: 0.82rem;
    color: #5a6480;
    margin: 0;
    line-height: 1.5;
  }
  .qj-cc-arrow {
    font-size: 1.2rem;
    color: #3b82f6;
    margin-top: auto;
    display: block;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .qj-header { padding: 16px 20px; }
    .qj-main { padding: 28px 20px 60px; }
    .qj-hero-heading { font-size: 1.8rem; }
    .qj-search-wrap { width: 100%; }
    .qj-grid { grid-template-columns: 1fr; }
    .qj-stats-strip { width: 100%; justify-content: center; }
  }
`;

export default Dashboard;