"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Backend",
    skills: ["Python (Flask, Django, GTK/Glade)", "PHP (Native PHP, Laravel)", "REST API Design & Integration"],
  },
  {
    category: "Database & Data",
    skills: ["MySQL, PostgreSQL", "Database Design & Optimization", "Data Modeling & Reporting", "DB Migration & Automation"],
  },
  {
    category: "Frontend",
    skills: ["HTML, CSS, JavaScript", "Responsive Web Design", "Bootstrap, Chart.js"],
  },
  {
    category: "Tools & Practices",
    skills: ["Git Version Control", "Software Architecture", "Debugging & Performance", "Team Collaboration & Mentorship"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 2rem", borderTop: "1px solid #e2e2dc" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: "0.75rem" }}
            >
              Skills
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ width: "2rem", height: "1px", background: "#0f0f0f", transformOrigin: "left" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" as const }}
              >
                <p style={{
                  fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#0f0f0f", fontWeight: 500, marginBottom: "1rem",
                  paddingBottom: "0.5rem", borderBottom: "1px solid #e2e2dc",
                }}>
                  {group.category}
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {group.skills.map((s, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <span style={{ color: "#c8c8c4", marginTop: "0.6rem", fontSize: "0.4rem", flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: "0.83rem", lineHeight: 1.6, color: "#4a4a4a", fontWeight: 300 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
