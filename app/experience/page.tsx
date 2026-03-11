"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { Experience, Award as AwardType } from "@/lib/types";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

// Education is static — doesn't change often enough to need a DB table
const education = [
  {
    degree: "Bachelor of Science in Mathematics",
    major: "Major in Computer Science",
    school: "Bulacan State University",
    period: "2012 – 2016",
  },
];

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/experience").then(r => r.json()),
      fetch("/api/awards").then(r => r.json()),
    ]).then(([exp, aw]) => {
      setExperience(exp);
      setAwards(aw);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTopColor: "var(--fg-3)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

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
            <motion.div key={e.id} {...fade(0.05 + i * 0.07)} className="card" style={{ padding: "20px 24px", marginBottom: "12px" }}>
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
                {e.points?.map((pt, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <CheckCircle size={13} color="var(--green)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "14px" }}>
                {e.tags?.map(t => <span key={t} className="badge badge-gray">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Education + Awards */}
        <div>
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

          <motion.div {...fade(0.2)}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Award size={12} /> Awards
            </p>
          </motion.div>
          {awards.map((a, i) => (
            <motion.div key={a.id} {...fade(0.22 + i * 0.05)} className="card" style={{ padding: "14px 16px", marginBottom: "8px" }}>
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
