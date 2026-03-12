"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

type Week = { contributionDays: { contributionCount: number; date: string }[] };

function getColor(count: number) {
  if (count === 0) return "var(--border)";
  if (count <= 2)  return "#1e4620";
  if (count <= 5)  return "#2a6b2f";
  if (count <= 9)  return "#2ea043";
  return "#39d353";
}

export default function GitHubGraph({ username = "dev-judedel" }: { username?: string }) {
  const [weeks, setWeeks]   = useState<Week[]>([]);
  const [total, setTotal]   = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(data => {
        const w: Week[] = data.contributions ?? [];
        setWeeks(w);

        // Total contributions
        const t = w.flatMap(w => w.contributionDays).reduce((s, d) => s + d.contributionCount, 0);
        setTotal(t);

        // Current streak
        const days = w.flatMap(wk => wk.contributionDays).reverse();
        let s = 0;
        for (const d of days) {
          if (d.contributionCount > 0) s++;
          else break;
        }
        setStreak(s);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [username]);

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS   = ["","Mon","","Wed","","Fri",""];

  // Get month labels from weeks
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((w, i) => {
    const first = w.contributionDays[0];
    if (first) {
      const m = new Date(first.date).getMonth();
      if (i === 0 || new Date(weeks[i - 1]?.contributionDays[0]?.date ?? "").getMonth() !== m) {
        monthLabels.push({ label: MONTHS[m], col: i });
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.22 }}
      className="card"
      style={{ padding: "18px 20px" }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div>
          <p className="section-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Github size={14} color="var(--fg-3)" /> GitHub Activity
          </p>
          <p className="section-desc">Contribution history — last 12 months</p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}
        >
          View profile <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
        {[
          { label: "Contributions",   value: loading ? "—" : total.toLocaleString() },
          { label: "Current Streak",  value: loading ? "—" : `${streak}d` },
          { label: "GitHub",          value: `@${username}` },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", flex: 1, flexDirection: "column", padding: "8px 12px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)" }}>{s.value}</span>
            <span style={{ fontSize: "10px", color: "var(--fg-4)", marginTop: "2px" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Graph */}
      {loading ? (
        <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 16, height: 16, border: "2px solid var(--border)", borderTopColor: "var(--fg-3)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
      ) : error ? (
        <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-4)", fontSize: "12px" }}>
          Could not load contribution data
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "3px", minWidth: "fit-content" }}>
            {/* Day labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginRight: "4px", paddingTop: "18px" }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{ height: 10, fontSize: "9px", color: "var(--fg-4)", lineHeight: "10px", width: 22, textAlign: "right" }}>{d}</div>
              ))}
            </div>

            {/* Weeks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {/* Month labels */}
              <div style={{ display: "flex", gap: "2px", marginBottom: "2px", position: "relative", height: 14 }}>
                {weeks.map((_, i) => {
                  const ml = monthLabels.find(m => m.col === i);
                  return (
                    <div key={i} style={{ width: 10, fontSize: "9px", color: "var(--fg-4)", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {ml ? ml.label : ""}
                    </div>
                  );
                })}
              </div>

              {/* Grid */}
              <div style={{ display: "flex", gap: "2px" }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                        style={{
                          width: 10, height: 10,
                          borderRadius: "2px",
                          background: getColor(day.contributionCount),
                          transition: "opacity 0.1s",
                          cursor: "default",
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "10px", color: "var(--fg-4)" }}>Less</span>
            {[0, 2, 5, 9, 15].map(n => (
              <div key={n} style={{ width: 10, height: 10, borderRadius: "2px", background: getColor(n) }} />
            ))}
            <span style={{ fontSize: "10px", color: "var(--fg-4)" }}>More</span>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}
