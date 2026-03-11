"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Skill } from "@/lib/types";

type Level = "Expert" | "Advanced" | "Proficient";

const levelColor: Record<Level, { bg: string; color: string; border: string }> = {
  Expert:     { bg: "var(--green-bg)",  color: "var(--green)",  border: "var(--green)" },
  Advanced:   { bg: "var(--blue-bg)",   color: "var(--blue)",   border: "var(--blue)" },
  Proficient: { bg: "var(--bg)",        color: "var(--fg-3)",   border: "var(--border)" },
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
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

  // Group by category, preserving sort_order within each group
  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.entries(grouped);

  return (
    <div className="page-content">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }} className="skills-grid">
        {categories.map(([category, items], gi) => (
          <motion.div key={category} {...fade(gi * 0.07)} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: items[0]?.accent ?? "var(--blue)", flexShrink: 0 }} />
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{category}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map((item) => {
                const lStyle = levelColor[item.level as Level] ?? levelColor.Proficient;
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
                    <span style={{ fontSize: "16px", flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>{item.name}</p>
                      <p style={{ fontSize: "10px", color: "var(--fg-4)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.note}</p>
                    </div>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px",
                      background: lStyle.bg, color: lStyle.color,
                      border: `1px solid ${lStyle.border}`,
                      flexShrink: 0, letterSpacing: "0.02em",
                    }}>{item.level}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(0.32)} className="card" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
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
      `}</style>
    </div>
  );
}
