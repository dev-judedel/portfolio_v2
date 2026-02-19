"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    title: "Lead Software Developer",
    company: "AsianLand Strategies Corporation",
    period: "2017 – Present",
    points: [
      "Lead a team of developers designing and maintaining enterprise-level systems",
      "Architect full-stack applications using Python, PHP, MySQL, and PostgreSQL",
      "Design and optimize databases for performance, accuracy, and scalability",
      "Translate business requirements into technical solutions and conduct code reviews",
      "Awarded Supervisor of the Year (2024) & Staff of the Year – Software Developer (2021)",
    ],
    tags: ["Python", "PHP", "MySQL", "PostgreSQL", "Laravel"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} style={{ padding: "6rem 2rem", borderTop: "1px solid #e2e2dc" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: "0.75rem" }}
            >
              Experience
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ width: "2rem", height: "1px", background: "#0f0f0f", transformOrigin: "left" }}
            />
          </div>

          <div>
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" as const }}
                style={{ paddingBottom: "3rem", borderBottom: i < roles.length - 1 ? "1px solid #e2e2dc" : "none" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: "#0f0f0f", marginBottom: "0.2rem" }}>
                      {role.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b6b6b", fontStyle: "italic" }}>{role.company}</p>
                  </div>
                  <span style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "#6b6b6b", padding: "0.25rem 0.75rem", border: "1px solid #e2e2dc" }}>
                    {role.period}
                  </span>
                </div>

                <ul style={{ marginTop: "1.25rem", paddingLeft: "0", listStyle: "none" }}>
                  {role.points.map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#e2e2dc", marginTop: "0.55rem", fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#4a4a4a", fontWeight: 300 }}>{p}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                  {role.tags.map(t => (
                    <span key={t} style={{
                      fontSize: "0.65rem", letterSpacing: "0.06em", color: "#6b6b6b",
                      border: "1px solid #e2e2dc", padding: "0.2rem 0.6rem", borderRadius: "2px"
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
