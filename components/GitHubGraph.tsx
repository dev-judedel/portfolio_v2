"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

type Day  = { contributionCount: number; date: string };
type Week = { contributionDays: Day[] };

type Tooltip = { count: number; date: string; x: number; y: number } | null;

const MONTHS   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS     = ["Mon","Wed","Fri"];
const DAY_ROWS = [1, 3, 5]; // index in contributionDays (0=Sun,1=Mon,2=Tue...)

function getColor(count: number) {
  if (count === 0) return "var(--border)";
  if (count <= 2)  return "var(--green-border)";
  if (count <= 5)  return "var(--green)";
  if (count <= 9)  return "#22c55e";
  return "#16a34a";
}

function getBorder(count: number) {
  if (count === 0) return "var(--border)";
  return "transparent";
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default function GitHubGraph({ username = "dev-judedel" }: { username?: string }) {
  const [weeks, setWeeks]     = useState<Week[]>([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github")
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(true); setLoading(false); return; }
        setWeeks(data.weeks ?? []);
        setTotal(data.total ?? 0);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  // Stats
  const allDays   = weeks.flatMap(w => w?.contributionDays ?? []);
  const activeDays = allDays.filter(d => d.contributionCount > 0).length;
  const maxDay    = allDays.reduce((m, d) => d.contributionCount > m ? d.contributionCount : m, 0);

  // Current streak
  let streak = 0;
  for (const d of [...allDays].reverse()) {
    if (d.contributionCount > 0) streak++;
    else break;
  }

  // Month labels — track when month changes across weeks
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((w, i) => {
    const first = w?.contributionDays?.[0];
    if (!first) return;
    const m = new Date(first.date).getMonth();
    const prev = weeks[i - 1]?.contributionDays?.[0];
    if (i === 0 || new Date(prev?.date ?? "").getMonth() !== m) {
      monthLabels.push({ label: MONTHS[m], col: i });
    }
  });

  const CELL  = 11;
  const GAP   = 3;
  const STEP  = CELL + GAP;

  function handleMouseEnter(day: Day, colIdx: number, rowIdx: number, e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    const el   = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      count: day.contributionCount,
      date:  day.date,
      x: el.left - (rect?.left ?? 0) + CELL / 2,
      y: el.top  - (rect?.top  ?? 0),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.22 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "16px 20px",
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Github size={16} color="#8b949e" />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>
            {loading ? "Loading…" : `${total.toLocaleString()} contributions in the last year`}
          </span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--primary)", textDecoration: "none" }}
        >
          @{username} <ExternalLink size={11} />
        </a>
      </div>

      {/* ── Stats row ── */}
      {!loading && !error && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {[
            { label: "Total",        value: total.toLocaleString() },
            { label: "Active days",  value: activeDays },
            { label: "Longest streak", value: `${streak}d` },
            { label: "Best day",     value: maxDay },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, padding: "8px 10px",
              background: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: "6px", textAlign: "center",
            }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "10px", color: "var(--fg-4)", marginTop: "3px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Graph ── */}
      {loading ? (
        <div style={{ height: 112, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ width: 14, height: 14, border: "2px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "ghspin 0.8s linear infinite" }} />
          <span style={{ fontSize: "12px", color: "var(--fg-4)" }}>Fetching contributions…</span>
        </div>
      ) : error ? (
        <div style={{ height: 112, display: "flex", alignItems: "center", justifyContent: "center", color: "#8b949e", fontSize: "12px" }}>
          <span style={{ color: "var(--fg-4)" }}>Could not load contribution data. Check your GITHUB_TOKEN.</span>
        </div>
      ) : (
        <div ref={containerRef} style={{ position: "relative", overflowX: "auto", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "4px", minWidth: "fit-content" }}>

            {/* Day labels */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: "18px", paddingBottom: "2px", marginRight: "2px", width: 24 }}>
              {DAYS.map(d => (
                <span key={d} style={{ fontSize: "9px", color: "var(--fg-4)", lineHeight: `${STEP}px`, height: STEP, display: "flex", alignItems: "center" }}>{d}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* Month labels */}
              <div style={{ display: "flex", gap: `${GAP}px`, height: 14, position: "relative" }}>
                {weeks.map((_, i) => {
                  const ml = monthLabels.find(m => m.col === i);
                  return (
                    <div key={i} style={{ width: CELL, flexShrink: 0 }}>
                      {ml && <span style={{ fontSize: "10px", color: "var(--fg-4)", whiteSpace: "nowrap" }}>{ml.label}</span>}
                    </div>
                  );
                })}
              </div>

              {/* Grid */}
              <div style={{ display: "flex", gap: `${GAP}px` }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: "flex", flexDirection: "column", gap: `${GAP}px` }}>
                    {(week?.contributionDays ?? []).map((day, di) => (
                      <div
                        key={di}
                        onMouseEnter={e => handleMouseEnter(day, wi, di, e)}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          width: CELL, height: CELL,
                          borderRadius: "2px",
                          background: getColor(day.contributionCount),
                          border: `1px solid ${getBorder(day.contributionCount)}`,
                          cursor: "default",
                          transition: "opacity 0.08s",
                          flexShrink: 0,
                        }}
                        onMouseOver={e => (e.currentTarget.style.opacity = "0.8")}
                        onMouseOut={e => (e.currentTarget.style.opacity = "1")}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y - 44,
              transform: "translateX(-50%)",
              background: "var(--surface-2)",
              border: "1px solid var(--border-strong)",
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "11px",
              color: "var(--fg)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}>
              <strong>{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</strong>
              {" on "}
              {formatDate(tooltip.date)}
              {/* Arrow */}
              <div style={{
                position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                width: 8, height: 8, background: "var(--surface-2)",
                border: "1px solid var(--border-strong)", borderTop: "none", borderLeft: "none",
                transform: "translateX(-50%) rotate(45deg)",
              }} />
            </div>
          )}

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "10px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "10px", color: "var(--fg-4)" }}>Less</span>
            {[0, 2, 5, 9, 15].map(n => (
              <div key={n} style={{
                width: CELL, height: CELL, borderRadius: "2px",
                background: getColor(n),
                border: `1px solid ${getBorder(n)}`,
              }} />
            ))}
            <span style={{ fontSize: "10px", color: "var(--fg-4)" }}>More</span>
          </div>
        </div>
      )}

      <style>{`@keyframes ghspin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}
