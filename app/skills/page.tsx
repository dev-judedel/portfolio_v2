"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GitHubGraph from "@/components/GitHubGraph";
import type { Skill } from "@/lib/types";

type Level = "Expert" | "Advanced" | "Proficient";

const levelColor: Record<Level, { bg: string; color: string; border: string }> = {
  Expert:     { bg: "var(--green-bg)",  color: "var(--green)",  border: "var(--green)" },
  Advanced:   { bg: "var(--blue-bg)",   color: "var(--blue)",   border: "var(--blue)" },
  Proficient: { bg: "var(--bg)",        color: "var(--fg-3)",   border: "var(--border)" },
};

// Map skill names to devicon class names
const DEVICON: Record<string, string> = {
  "Python":        "devicon-python-plain colored",
  "PHP":           "devicon-php-plain colored",
  "Laravel":       "devicon-laravel-plain colored",
  "REST API":      "devicon-fastapi-plain colored",
  "Flask":         "devicon-flask-original",
  "MySQL":         "devicon-mysql-plain colored",
  "PostgreSQL":    "devicon-postgresql-plain colored",
  "Data Modeling": "devicon-grafana-plain colored",
  "Pandas":        "devicon-pandas-plain colored",
  "HTML / CSS":    "devicon-html5-plain colored",
  "JavaScript":    "devicon-javascript-plain colored",
  "Bootstrap":     "devicon-bootstrap-plain colored",
  "Chart.js":      "devicon-javascript-plain colored",
  "Next.js":       "devicon-nextjs-plain",
  "Git":           "devicon-git-plain colored",
  "System Design": "devicon-linux-plain",
  "Team Lead":     "devicon-github-plain",
  "Linux":         "devicon-linux-plain colored",
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

function SkillLogo({ name, icon }: { name: string; icon: string }) {
  const deviconClass = DEVICON[name];
  const [imgError, setImgError] = useState(false);

  if (deviconClass && !imgError) {
    return (
      <i
        className={deviconClass}
        style={{ fontSize: "20px", lineHeight: 1, flexShrink: 0 }}
        onError={() => setImgError(true)}
      />
    );
  }
  // Fallback to emoji
  return <span style={{ fontSize: "16px", lineHeight: 1, flexShrink: 0 }}>{icon}</span>;
}

export default function SkillsPage() {
  const [skills, setSkills]   = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills").then(r => r.json()).then(d => { setSkills(d); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTopColor: "var(--fg-3)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.entries(grouped);

  // All skills flat for the logo wall
  const logoWall = skills.slice(0, 18);

  return (
    <div className="page-content">

      {/* ── Logo Wall ── */}
      <motion.div {...fade(0)} className="card" style={{ padding: "20px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <p className="section-title">Tech Stack</p>
            <p className="section-desc">Technologies used in production systems</p>
          </div>
          <span style={{ fontSize: "11px", color: "var(--fg-4)" }}>{skills.length} technologies</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {logoWall.map((s, i) => {
            const deviconClass = DEVICON[s.name];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                title={`${s.name} — ${s.level}`}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "7px 12px", borderRadius: "8px",
                  background: "var(--bg)", border: "1px solid var(--border)",
                  cursor: "default", transition: "all 0.12s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = s.accent ?? "var(--primary)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg)";
                }}
              >
                {deviconClass
                  ? <i className={deviconClass} style={{ fontSize: "18px", lineHeight: 1 }} />
                  : <span style={{ fontSize: "15px", lineHeight: 1 }}>{s.icon}</span>
                }
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)", whiteSpace: "nowrap" }}>{s.name}</span>
                <span style={{
                  fontSize: "9px", padding: "1px 5px", borderRadius: "3px",
                  background: levelColor[s.level as Level]?.bg ?? "var(--bg)",
                  color: levelColor[s.level as Level]?.color ?? "var(--fg-4)",
                  border: `1px solid ${levelColor[s.level as Level]?.border ?? "var(--border)"}`,
                  fontWeight: 600,
                }}>{s.level}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Category Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }} className="skills-grid">
        {categories.map(([category, items], gi) => (
          <motion.div key={category} {...fade(0.08 + gi * 0.07)} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: items[0]?.accent ?? "var(--blue)", flexShrink: 0 }} />
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{category}</p>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--fg-4)" }}>{items.length} skills</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {items.map(item => {
                const lStyle = levelColor[item.level as Level] ?? levelColor.Proficient;
                const deviconClass = DEVICON[item.name];
                return (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "8px 10px", borderRadius: "6px",
                    background: "var(--bg)", border: "1px solid var(--border)",
                    transition: "border-color 0.12s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    {/* Logo */}
                    <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {deviconClass
                        ? <i className={deviconClass} style={{ fontSize: "20px", lineHeight: 1 }} />
                        : <span style={{ fontSize: "16px", lineHeight: 1 }}>{item.icon}</span>
                      }
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>{item.name}</p>
                      <p style={{ fontSize: "10px", color: "var(--fg-4)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.note}</p>
                    </div>

                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px",
                      background: lStyle.bg, color: lStyle.color,
                      border: `1px solid ${lStyle.border}`,
                      flexShrink: 0,
                    }}>{item.level}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── GitHub Graph ── */}
      <GitHubGraph username="dev-judedel" />

      {/* Legend */}
      <motion.div {...fade(0.4)} className="card" style={{ padding: "12px 20px", marginTop: "12px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Proficiency</p>
        {(["Expert", "Advanced", "Proficient"] as Level[]).map(l => {
          const s = levelColor[l];
          return (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: "12px", color: "var(--fg-3)" }}>{l}</span>
            </div>
          );
        })}
        <p style={{ fontSize: "12px", color: "var(--fg-4)", marginLeft: "auto" }}>Based on production use in enterprise systems</p>
      </motion.div>

      <style>{`
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
