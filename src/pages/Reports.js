const REPORTS = [
  { icon: "📊", name: "Monthly Performance Report", desc: "Full breakdown of spend, revenue, ROAS, and leads across all clients. White-labeled and ready to send.", freq: "Auto-generates on 1st of month", color: "#eef3ff" },
  { icon: "🎯", name: "Campaign Health Check",       desc: "Identifies underperforming campaigns, overspending ad groups, and quick-win optimizations.", freq: "Every Monday morning", color: "#e6fff8" },
  { icon: "💰", name: "Budget Pacing Report",        desc: "Shows which clients are on track, over-budget, or underspending so you can act before month end.", freq: "Every Friday", color: "#fff7ee" },
  { icon: "👥", name: "Lead Quality Analysis",       desc: "Compares leads from each channel against CRM close rates to show which campaigns bring real revenue.", freq: "Weekly", color: "#fdf4ff" },
  { icon: "📈", name: "ROAS Trend Report",           desc: "Tracks ROAS trends over 90 days per client and flags accounts at risk of declining performance.", freq: "Bi-weekly", color: "#fff0f0" },
  { icon: "🔍", name: "Keyword Intelligence Report", desc: "Surfaces high-intent, low-competition keywords from your Search Query Reports across all accounts.", freq: "Monthly", color: "#f0edff" },
];

export default function Reports() {
  return (
    <div>
      <div className="page-header">
        <h1>Reports</h1>
        <p>Auto-generated, white-labeled reports ready to send to your clients</p>
      </div>

      {/* Status banner */}
      <div style={{ background: "#e6fff8", border: "1px solid #a3f0da", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 16 }}>✅</span>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#065f46" }}>3 reports generated this week</div>
          <div style={{ fontSize: 12, color: "#059669", marginTop: 2 }}>Next auto-report: Monday 9:00 AM — Campaign Health Check</div>
        </div>
        <button style={{ marginLeft: "auto", background: "#00c896", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
          Generate All Now
        </button>
      </div>

      <div className="report-grid">
        {REPORTS.map((r) => (
          <div className="report-card" key={r.name}>
            <div className="report-icon">{r.icon}</div>
            <div className="report-name">{r.name}</div>
            <div className="report-desc">{r.desc}</div>
            <div className="report-footer">
              <span className="report-freq">{r.freq}</span>
              <button className="report-btn">Generate ↗</button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div style={{ marginTop: 24, padding: "18px 20px", border: "1.5px dashed #e5e7eb", borderRadius: 12, textAlign: "center" }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>🤖</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", marginBottom: 4 }}>AI-Powered Insight Reports</div>
        <div style={{ fontSize: 12.5, color: "#6b7280" }}>Coming in Phase 4 — Claude will automatically write narratives, diagnose drops, and suggest actions in each report.</div>
      </div>
    </div>
  );
}