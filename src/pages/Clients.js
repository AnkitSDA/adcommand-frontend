import { useState } from "react";

const ALL_CLIENTS = [
  { initials: "ZA", name: "Zara Apparel",    type: "E-commerce",  spend: "₹3.2L", roas: "6.2x", roasClass: "roas-good",   leads: 820,  status: "active",  bg: "#eef3ff", color: "#185FA5", budget: "₹3.5L",  channels: "Google, Meta" },
  { initials: "NX", name: "NexGen Tech",     type: "SaaS",         spend: "₹2.8L", roas: "4.9x", roasClass: "roas-good",   leads: 512,  status: "active",  bg: "#f0edff", color: "#534AB7", budget: "₹3.0L",  channels: "Google Ads" },
  { initials: "KF", name: "Kiran Foods",     type: "D2C Brand",    spend: "₹2.1L", roas: "2.8x", roasClass: "roas-medium", leads: 640,  status: "active",  bg: "#fff7ee", color: "#854F0B", budget: "₹2.0L",  channels: "Meta, CRM" },
  { initials: "VP", name: "VitaPlus Health", type: "Healthcare",   spend: "₹1.9L", roas: "1.9x", roasClass: "roas-low",    leads: 290,  status: "warning", bg: "#fff0f0", color: "#A32D2D", budget: "₹1.8L",  channels: "Google Ads" },
  { initials: "SB", name: "SkyBuild Infra",  type: "Real Estate",  spend: "₹1.4L", roas: "3.5x", roasClass: "roas-good",   leads: 180,  status: "paused",  bg: "#e6fff8", color: "#00a07a", budget: "₹1.5L",  channels: "Google, Social" },
  { initials: "MG", name: "MindGrow Edu",    type: "EdTech",       spend: "₹1.0L", roas: "3.1x", roasClass: "roas-good",   leads: 799,  status: "active",  bg: "#fdf4ff", color: "#7e22ce", budget: "₹1.2L",  channels: "Meta, GA4" },
];

export default function Clients() {
  const [search, setSearch] = useState("");
  const filtered = ALL_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Clients</h1>
        <p>Manage all your agency clients and their campaign performance</p>
      </div>

      {/* Summary row */}
      <div className="metric-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))", marginBottom: 20 }}>
        <div className="metric-card">
          <div className="metric-label">Total Clients</div>
          <div className="metric-value">6</div>
          <div className="metric-change up">▲ 2 added this quarter</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Active Clients</div>
          <div className="metric-value">4</div>
          <div className="metric-change up">▲ 1 paused, 1 needs attention</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Monthly Spend</div>
          <div className="metric-value">₹12.4L</div>
          <div className="metric-change up">▲ +8.2% vs last month</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: 360, padding: "9px 14px",
            border: "1px solid #e5e7eb", borderRadius: 8,
            fontSize: 13.5, fontFamily: "DM Sans, sans-serif",
            outline: "none", color: "#0f1117", background: "#fff"
          }}
        />
      </div>

      {/* Client Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 }}>
        {filtered.map((c) => (
          <div className="panel" key={c.name} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="c-avatar" style={{ background: c.bg, color: c.color, width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                {c.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f1117" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{c.type} · {c.channels}</div>
              </div>
              <span className={`roas-badge ${c.roasClass}`}>{c.roas} ROAS</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, background: "#f8f9fb", borderRadius: 8, padding: "12px 14px" }}>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Spend</div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "DM Mono, monospace" }}>{c.spend}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Budget</div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "DM Mono, monospace" }}>{c.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Leads</div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "DM Mono, monospace" }}>{c.leads}</div>
              </div>
            </div>

            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <span className={`status-dot status-${c.status}`} />
                <span style={{ fontSize: 12, color: "#6b7280", textTransform: "capitalize" }}>{c.status}</span>
              </span>
              <button style={{ fontSize: 12, color: "#4f8ef7", background: "#eef3ff", border: "none", padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>
                View Report →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}