// All API calls to the Python backend live here.
// When you connect real Google Ads / Meta APIs in Phase 3,
// only this file needs to change — not the UI pages.

const BASE = "http://localhost:8000/api";

async function get(url) {
  try {
    const res = await fetch(BASE + url);
    if (!res.ok) throw new Error("API error: " + res.status);
    return await res.json();
  } catch (err) {
    console.error("API call failed:", err);
    return null;
  }
}

// ── Dashboard ──────────────────────────────
export const fetchSummary  = () => get("/dashboard/summary");
export const fetchTrend    = () => get("/dashboard/trend");
export const fetchChannels = () => get("/dashboard/channels");

// ── Clients ───────────────────────────────
export const fetchClients     = (search = "") => get(`/clients/?search=${search}`);
export const fetchClientStats = ()             => get("/clients/summary/stats");
export const fetchClient      = (id)           => get(`/clients/${id}`);

// ── Alerts ────────────────────────────────
export const fetchAlerts = () => get("/alerts/");