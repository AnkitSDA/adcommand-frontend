import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import "./App.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⬛" },
  { id: "clients",   label: "Clients",   icon: "👥" },
  { id: "reports",   label: "Reports",   icon: "📄" },
  { id: "alerts",    label: "Alerts",    icon: "🔔" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">AC</span>
          <span className="logo-text">AdCommand</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-item ${page === n.id ? "active" : ""}`}
              onClick={() => setPage(n.id)}
            >
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="agency-pill">
            <div className="agency-avatar">YA</div>
            <div>
              <div className="agency-name">Your Agency</div>
              <div className="agency-plan">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {page === "dashboard" && <Dashboard />}
        {page === "clients"   && <Clients />}
        {page === "reports"   && <Reports />}
        {page === "alerts"    && <Alerts />}
      </main>
    </div>
  );
}