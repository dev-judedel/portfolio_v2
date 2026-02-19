"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";

const experience = [
  {
    type: "work",
    title: "Lead Software Developer",
    org: "AsianLand Strategies Corporation",
    period: "2017 – Present",
    duration: "8+ years",
    current: true,
    points: [
      "Lead a team of developers designing and maintaining enterprise-level systems",
      "Architect full-stack applications using Python, PHP, MySQL, and PostgreSQL",
      "Design and optimize databases for performance, accuracy, and scalability",
      "Translate complex business requirements into technical solutions",
      "Conduct code reviews, mentoring, and technical planning sessions",
    ],
    tags: ["Python", "PHP", "MySQL", "PostgreSQL", "Laravel", "Team Lead"],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Mathematics",
    major: "Major in Computer Science",
    school: "Bulacan State University",
    period: "2012 – 2016",
  },
];

const awards = [
  { title: "Supervisor of the Year", sub: "IT Supervisor", year: "2024", org: "AsianLand Strategies Corporation" },
  { title: "Staff of the Year", sub: "Software Developer", year: "2021", org: "AsianLand Strategies Corporation" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function ExperiencePage() {
  return (
    <div className="page-content">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", alignItems: "start" }} className="exp-grid">

        {/* Left: Work experience */}
        <div>
          <motion.div {...fade(0)}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Briefcase size={12} /> Work Experience
            </p>
          </motion.div>

          {experience.map((e, i) => (
            <motion.div key={i} {...fade(0.05 + i * 0.07)} className="card" style={{ padding: "20px 24px", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)" }}>{e.title}</h3>
                    {e.current && <span className="badge badge-green">Current</span>}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: "2px" }}>{e.org}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="badge badge-gray">{e.period}</span>
                  <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "4px" }}>{e.duration}</p>
                </div>
              </div>

              <div style={{ height: 1, background: "var(--border)", marginBottom: "12px" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {e.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <CheckCircle size={13} color="var(--green)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "14px" }}>
                {e.tags.map(t => <span key={t} className="badge badge-gray">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Education + Awards */}
        <div>
          {/* Education */}
          <motion.div {...fade(0.1)}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <GraduationCap size={12} /> Education
            </p>
          </motion.div>
          {education.map((e, i) => (
            <motion.div key={i} {...fade(0.15)} className="card" style={{ padding: "16px", marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{e.degree}</p>
              <p style={{ fontSize: "12px", color: "var(--fg-3)", marginTop: "2px" }}>{e.major}</p>
              <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
              <p style={{ fontSize: "12px", color: "var(--fg-2)", fontWeight: 500 }}>{e.school}</p>
              <span className="badge badge-gray" style={{ marginTop: "6px" }}>{e.period}</span>
            </motion.div>
          ))}

          {/* Awards */}
          <motion.div {...fade(0.2)}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Award size={12} /> Awards
            </p>
          </motion.div>
          {awards.map((a, i) => (
            <motion.div key={i} {...fade(0.22 + i * 0.05)} className="card" style={{ padding: "14px 16px", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{a.title}</p>
                  <p style={{ fontSize: "12px", color: "var(--fg-3)" }}>{a.sub}</p>
                  <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "2px" }}>{a.org}</p>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--fg)", flexShrink: 0 }}>{a.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .exp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
