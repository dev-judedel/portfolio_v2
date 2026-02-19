"use client";
import { motion } from "framer-motion";

const groups = [
  {
    category: "Backend Development",
    color: "var(--blue)",
    colorBg: "var(--blue-bg)",
    items: [
      { name: "Python",      level: 95, note: "Flask · Django · GTK/Glade · Pandas" },
      { name: "PHP",         level: 95, note: "Native PHP · Laravel · REST APIs" },
      { name: "REST API",    level: 90, note: "Design · Integration · Documentation" },
    ],
  },
  {
    category: "Database & Data",
    color: "#7c3aed",
    colorBg: "#f5f3ff",
    items: [
      { name: "MySQL",       level: 95, note: "Design · Optimization · Stored Procedures" },
      { name: "PostgreSQL",  level: 85, note: "Migration · Performance tuning" },
      { name: "Data Modeling", level: 88, note: "Reporting · BI · openpyxl · Pandas" },
    ],
  },
  {
    category: "Frontend",
    color: "#d97706",
    colorBg: "#fffbeb",
    items: [
      { name: "HTML / CSS",  level: 88, note: "Responsive · Semantic markup" },
      { name: "JavaScript",  level: 80, note: "ES6+ · DOM manipulation" },
      { name: "Bootstrap",   level: 85, note: "Chart.js · Responsive layouts" },
    ],
  },
  {
    category: "Tools & Practices",
    color: "#16a34a",
    colorBg: "var(--green-bg)",
    items: [
      { name: "Git",          level: 90, note: "Version control · Code review · Branching" },
      { name: "Architecture", level: 92, note: "System design · ERP · Billing logic" },
      { name: "Leadership",   level: 90, note: "Team lead · Mentorship · Planning" },
    ],
  },
];

const allTech = ["Python", "PHP", "Laravel", "Flask", "Django", "GTK/Glade", "MySQL", "PostgreSQL", "HTML", "CSS", "JavaScript", "Bootstrap", "Chart.js", "Pandas", "openpyxl", "Git", "REST API", "MVC"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function SkillsPage() {
  return (
    <div className="page-content">

      {/* Skill groups */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }} className="skills-grid">
        {groups.map((g, gi) => (
          <motion.div key={gi} {...fade(gi * 0.07)} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{g.category}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {g.items.map((item, ii) => (
                <div key={ii}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg)" }}>{item.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--fg-4)", fontWeight: 500 }}>{item.level}%</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 5, background: "var(--bg)", borderRadius: "3px", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + gi * 0.1 + ii * 0.05, ease: "easeOut" as const }}
                      style={{ height: "100%", background: g.color, borderRadius: "3px" }}
                    />
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "4px" }}>{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* All technologies */}
      <motion.div {...fade(0.3)} className="card" style={{ padding: "20px" }}>
        <p className="section-title" style={{ marginBottom: "12px" }}>All Technologies</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {allTech.map(t => (
            <span key={t} className="badge badge-gray" style={{ fontSize: "12px", padding: "4px 10px" }}>{t}</span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
