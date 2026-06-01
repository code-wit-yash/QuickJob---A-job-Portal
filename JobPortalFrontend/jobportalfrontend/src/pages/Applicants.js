import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

const STATUS_CONFIG = {
  PENDING:     { label: "Pending",     color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)", dot: "#f59e0b" },
  SHORTLISTED: { label: "Shortlisted", color: "#60a5fa", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)", dot: "#3b82f6" },
  HIRED:       { label: "Hired",       color: "#34d399", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)", dot: "#10b981" },
  REJECTED:    { label: "Rejected",    color: "#f87171", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.2)",   dot: "#ef4444" },
};

function Applicants() {
  injectFonts();

  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplicants();
    const interval = setInterval(fetchApplicants, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/company/applications/${jobId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await API.put(`/company/application/${id}/status?status=${status}`);
      await fetchApplicants();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = {
    total: applications.length,
    shortlisted: applications.filter((a) => a.status === "SHORTLISTED").length,
    hired: applications.filter((a) => a.status === "HIRED").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  const getInitials = (email) =>
    email ? email.slice(0, 2).toUpperCase() : "??";

  return (
    <>
      <style>{css}</style>
      <div className="ap-root">
        <div className="ap-orb ap-orb1" />
        <div className="ap-orb ap-orb2" />

        {/* ── TOP BAR ── */}
        <header className="ap-topbar">
          <div className="ap-topbar-left">
            <Link to="/company/my-jobs" className="ap-back-link">
              ← My Jobs
            </Link>
            <div className="ap-topbar-divider" />
            <div>
              <p className="ap-topbar-eyebrow">Job ID #{jobId}</p>
              <h1 className="ap-topbar-title">Applicants</h1>
            </div>
          </div>
          <div className="ap-live-badge">
            <span className="ap-live-dot" />
            Live
          </div>
        </header>

        <div className="ap-main">

          {/* ── STATS ROW ── */}
          <div className="ap-stats">
            <div className="ap-stat-card">
              <span className="ap-stat-num">{counts.total}</span>
              <span className="ap-stat-label">Total</span>
            </div>
            <div className="ap-stat-card ap-stat-card--blue">
              <span className="ap-stat-num">{counts.shortlisted}</span>
              <span className="ap-stat-label">Shortlisted</span>
            </div>
            <div className="ap-stat-card ap-stat-card--green">
              <span className="ap-stat-num">{counts.hired}</span>
              <span className="ap-stat-label">Hired</span>
            </div>
            <div className="ap-stat-card ap-stat-card--red">
              <span className="ap-stat-num">{counts.rejected}</span>
              <span className="ap-stat-label">Rejected</span>
            </div>
          </div>

          {/* ── APPLICANT CARDS ── */}
          {loading ? (
            <div className="ap-empty">
              <div className="ap-spinner" />
              <p>Loading applicants…</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="ap-empty">
              <div className="ap-empty-icon">📭</div>
              <h3>No applicants yet</h3>
              <p>Applications will appear here automatically.</p>
            </div>
          ) : (
            <div className="ap-grid">
              {applications.map((app, i) => {
                const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
                const isUpdating = updatingId === app.id;
                return (
                  <div
                    key={app.id}
                    className="ap-card"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {/* Card header */}
                    <div className="ap-card-header">
                      <div className="ap-avatar">{getInitials(app.userEmail)}</div>
                      <div className="ap-card-info">
                        <h2 className="ap-card-email">{app.userEmail}</h2>
                        <span
                          className="ap-status-badge"
                          style={{
                            color: statusCfg.color,
                            background: statusCfg.bg,
                            border: `1px solid ${statusCfg.border}`,
                          }}
                        >
                          <span
                            className="ap-status-dot"
                            style={{ background: statusCfg.dot }}
                          />
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>

                    <div className="ap-card-divider" />

                    {/* Actions */}
                    <div className="ap-card-actions">
                      <Link
                        to={`/profile/${app.userEmail}`}
                        className="ap-btn-profile"
                      >
                        👤 View Profile
                      </Link>

                      <div className="ap-action-btns">
                        <button
                          className="ap-btn ap-btn--shortlist"
                          onClick={() => updateStatus(app.id, "SHORTLISTED")}
                          disabled={isUpdating || app.status === "SHORTLISTED"}
                        >
                          Shortlist
                        </button>
                        <button
                          className="ap-btn ap-btn--hire"
                          onClick={() => updateStatus(app.id, "HIRED")}
                          disabled={isUpdating || app.status === "HIRED"}
                        >
                          Hire ✓
                        </button>
                        <button
                          className="ap-btn ap-btn--reject"
                          onClick={() => updateStatus(app.id, "REJECTED")}
                          disabled={isUpdating || app.status === "REJECTED"}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── STYLES ─── */
const css = `
  .ap-root {
    min-height: 100vh;
    background: #080c14;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .ap-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(110px);
    pointer-events: none;
    z-index: 0;
  }
  .ap-orb1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #1a3a6e44 0%, transparent 70%);
    top: -160px; left: -120px;
  }
  .ap-orb2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #0d3a2f33 0%, transparent 70%);
    bottom: -100px; right: -80px;
  }

  /* ── TOP BAR ── */
  .ap-topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,12,20,0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .ap-topbar-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .ap-back-link {
    font-size: 0.82rem;
    color: #4a5272;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.18s;
    white-space: nowrap;
  }
  .ap-back-link:hover { color: #c5cce8; }
  .ap-topbar-divider {
    width: 1px;
    height: 28px;
    background: rgba(255,255,255,0.08);
  }
  .ap-topbar-eyebrow {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #3b82f6;
    font-weight: 500;
    margin: 0 0 3px;
  }
  .ap-topbar-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.02em;
    color: #f0f4ff;
  }

  .ap-live-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    border-radius: 20px;
    border: 1px solid rgba(16,185,129,0.25);
    background: rgba(16,185,129,0.08);
    font-size: 0.75rem;
    font-weight: 600;
    color: #34d399;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .ap-live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    animation: apPulse 1.8s ease-in-out infinite;
  }
  @keyframes apPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.75); }
  }

  /* ── MAIN ── */
  .ap-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 48px 80px;
    position: relative;
    z-index: 1;
  }

  /* ── STATS ── */
  .ap-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  .ap-stat-card {
    padding: 20px 22px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(15,22,40,0.7);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .ap-stat-card--blue { border-color: rgba(59,130,246,0.15); background: rgba(59,130,246,0.06); }
  .ap-stat-card--green { border-color: rgba(16,185,129,0.15); background: rgba(16,185,129,0.06); }
  .ap-stat-card--red { border-color: rgba(239,68,68,0.15); background: rgba(239,68,68,0.06); }

  .ap-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #f0f4ff;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .ap-stat-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #4a5272;
    font-weight: 500;
  }

  /* ── GRID ── */
  .ap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 20px;
  }

  /* ── CARD ── */
  .ap-card {
    background: rgba(15,22,40,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    backdrop-filter: blur(12px);
    animation: apFadeUp 0.35s ease both;
    transition: border-color 0.2s, transform 0.2s;
  }
  .ap-card:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-2px);
  }
  @keyframes apFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ap-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ap-avatar {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #1e3a5f, #0f2744);
    border: 1px solid rgba(59,130,246,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #60a5fa;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }
  .ap-card-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }
  .ap-card-email {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #e8eaf0;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
  }
  .ap-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    width: fit-content;
  }
  .ap-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ap-card-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  /* ── CARD ACTIONS ── */
  .ap-card-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ap-btn-profile {
    display: block;
    text-align: center;
    padding: 10px 0;
    border-radius: 11px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #8896c0;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.18s;
  }
  .ap-btn-profile:hover {
    background: rgba(255,255,255,0.08);
    color: #c5cce8;
    border-color: rgba(255,255,255,0.14);
  }

  .ap-action-btns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  .ap-btn {
    padding: 10px 0;
    border-radius: 11px;
    border: 1px solid transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
  }
  .ap-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none !important;
  }
  .ap-btn--shortlist {
    background: rgba(59,130,246,0.1);
    border-color: rgba(59,130,246,0.25);
    color: #60a5fa;
  }
  .ap-btn--shortlist:not(:disabled):hover {
    background: rgba(59,130,246,0.2);
    border-color: rgba(59,130,246,0.45);
    transform: scale(0.98);
  }
  .ap-btn--hire {
    background: rgba(16,185,129,0.1);
    border-color: rgba(16,185,129,0.25);
    color: #34d399;
  }
  .ap-btn--hire:not(:disabled):hover {
    background: rgba(16,185,129,0.2);
    border-color: rgba(16,185,129,0.45);
    transform: scale(0.98);
  }
  .ap-btn--reject {
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.2);
    color: #f87171;
  }
  .ap-btn--reject:not(:disabled):hover {
    background: rgba(239,68,68,0.16);
    border-color: rgba(239,68,68,0.4);
    transform: scale(0.98);
  }

  /* ── EMPTY / LOADING ── */
  .ap-empty {
    text-align: center;
    padding: 80px 20px;
    color: #4a5272;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .ap-empty-icon { font-size: 3rem; }
  .ap-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    color: #6b7aa0;
    margin: 0;
  }
  .ap-empty p { font-size: 0.875rem; margin: 0; }

  .ap-spinner {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.06);
    border-top-color: #3b82f6;
    animation: apSpin 0.8s linear infinite;
    margin-bottom: 4px;
  }
  @keyframes apSpin {
    to { transform: rotate(360deg); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .ap-topbar { padding: 16px 20px; }
    .ap-main { padding: 28px 20px 60px; }
    .ap-stats { grid-template-columns: repeat(2, 1fr); }
    .ap-grid { grid-template-columns: 1fr; }
  }
`;

export default Applicants;