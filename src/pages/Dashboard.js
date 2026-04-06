import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchSummary, fetchTrend, fetchChannels, fetchClients } from "../api/api";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: ₹{(p.value / 100000).toFixed(1)}L</p>
        ))}
      </div>
    );
  }
  return null;
};

const fmt = (n) => {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  return "₹" + n?.toLocaleString("en-IN");
};

const clientColors = {
  ZA: { bg: "#eef3ff", color: "#185FA5" },
  NX: { bg: "#f0edff", color: "#534AB7" },
  KF: { bg: "#fff7ee", color: "#854F0B" },
  VP: { bg: "#fff0f0", color: "#A32D2D" },
  SB: { bg: "#e6fff8", color: "#00a07a" },
  MG: { bg: "#fdf4ff", color: "#7e22ce" },
};

const channelColors = ["#4f8ef7", "#a78bfa", "#00c896", "#f7a54f"];

export default function Dashboard() {
  const [summary,  setSummary]  = useState(null);
  const [trend,    setTrend]    = useState([]);
  const [channels, setChannels] = useState([]);
  const [clients,  setClients]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function load() {
      const [s, t, ch, cl] = await Promise.all([
        fetchSummary(), fetchTrend(), fetchChannels(), fetchClients()
      ]);
      if (s)  setSummary(s);
      if (t)  setTrend(t.data || []);
      if (ch) setChannels(ch.data || []);
      if (cl) setClients(cl.clients || []);
      setLoading(false);
    }
    load();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60vh", flexDirection:"column", gap:12 }}>
      <div style={{ width:32, height:32, border:"3px solid #e5e7eb", borderTop:"3px solid #00c896", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <p style={{ color:"#9ca3af", fontSize:13 }}>Loading dashboard...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const metrics = summary ? [
    { label: "Total Ad Spend",  value: fmt(summary.total_spend),   change: summary.changes.spend,   up: true  },
    { label: "Total Revenue",   value: fmt(summary.total_revenue), change: summary.changes.revenue, up: true  },
    { label: "Avg. ROAS",       value: summary.avg_roas + "x",     change: summary.changes.roas,    up: true  },
    { label: "Leads Generated", value: summary.total_leads?.toLocaleString("en-IN"), change: summary.changes.leads, up: false },
  ] : [];

  return (
    <div>
      <div className="page-header">
        <h1>Agency Dashboard</h1>
        <p>{today} · {clients.length} clients · Live data from backend ✅</p>
      </div>

      <div className="metric-grid">
        {metrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className={`metric-change ${m.up ? "up" : "down"}`}>{m.up ? "▲" : "▼"} {m.change} vs last month</div>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="panel">
          <div className="panel-title">Spend vs Revenue (₹)</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="gSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4f8ef7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00c896" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00c896" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="spend"   name="Spend"   stroke="#4f8ef7" fill="url(#gSpend)" strokeWidth={2} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#00c896" fill="url(#gRev)"   strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:16, marginTop:10, fontSize:12 }}>
            <span style={{ display:"flex", alignItems:"center", gap:5, color:"#6b7280" }}><span style={{ width:10, height:3, background:"#4f8ef7", borderRadius:2, display:"inline-block" }} /> Spend</span>
            <span style={{ display:"flex", alignItems:"center", gap:5, color:"#6b7280" }}><span style={{ width:10, height:3, background:"#00c896", borderRadius:2, display:"inline-block" }} /> Revenue</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Channel Breakdown</div>
          {channels.map((c, i) => (
            <div className="channel-bar" key={c.channel}>
              <div className="channel-bar-header"><span>{c.channel}</span><span>{fmt(c.spend)}</span></div>
              <div className="bar-track"><div className="bar-fill" style={{ width:`${c.pct}%`, background:channelColors[i] }} /></div>
            </div>
          ))}
          <div style={{ marginTop:16, background:"#fff7ee", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#b36800", display:"flex", gap:8 }}>
            <span>⚠️</span><span>Google Ads pacing 12% over budget — review bids</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="section-row"><h2>Client Performance</h2></div>
        <table className="clients-table">
          <thead>
            <tr><th>Client</th><th>Monthly Spend</th><th>ROAS</th><th>Status</th></tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              const col = clientColors[c.id] || { bg:"#f3f4f6", color:"#374151" };
              return (
                <tr key={c.id}>
                  <td>
                    <div className="client-cell">
                      <div className="c-avatar" style={{ background:col.bg, color:col.color }}>{c.id}</div>
                      <div><div className="c-name">{c.name}</div><div className="c-sub">{c.type}</div></div>
                    </div>
                  </td>
                  <td><span className="spend-num">{fmt(c.spend)}</span></td>
                  <td><span className={`roas-badge ${c.roas_class}`}>{c.roas}</span></td>
                  <td>
                    <span className={`status-dot status-${c.status}`} />
                    <span style={{ fontSize:12.5, color:"#6b7280", textTransform:"capitalize" }}>{c.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}