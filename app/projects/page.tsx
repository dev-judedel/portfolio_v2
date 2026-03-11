"use client";
import { motion } from "framer-motion";
import { Github, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(d => { setProjects(d); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTopColor: "var(--fg-3)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div className="page-content">
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        style={{ fontSize: "13px", color: "var(--fg-3)", marginBottom: "20px" }}
      >
        {projects.length} enterprise systems built and deployed in production.
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="projects-grid">
        {projects.map((p, i) => (
          <motion.div key={p.id} {...fade(i * 0.08)} className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", position: "relative", overflow: "hidden" }}>

            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: p.accent, borderRadius: "8px 8px 0 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: p.accent, letterSpacing: "0.06em" }}>{p.index}</span>
                  <span className="badge badge-green" style={{ fontSize: "10px", padding: "1px 6px" }}>{p.status}</span>
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", lineHeight: 1.3 }}>{p.name}</h3>
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--fg-3)", textDecoration: "none", transition: "all 0.12s", flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"; }}
              >
                <Github size={13} />
              </a>
            </div>

            <p style={{ fontSize: "12px", color: "var(--fg-3)", lineHeight: 1.7 }}>{p.desc}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {p.highlights?.map((h, j) => (
                <div key={j} style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}>
                  <ArrowUpRight size={11} color={p.accent} style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "11px", color: "var(--fg-2)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto", paddingTop: "8px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {p.tags?.map(t => <span key={t} className="badge badge-gray" style={{ fontSize: "10px", padding: "1px 6px" }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--fg-4)" }}>
                  <Users size={10} /><span style={{ fontSize: "10px" }}>{p.team}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--fg-4)" }}>
                  <TrendingUp size={10} /><span style={{ fontSize: "10px" }}>{p.impact}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
