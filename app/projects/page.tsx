"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Users, TrendingUp } from "lucide-react";

const projects = [
  {
    index: "01",
    name: "Enterprise ERP System",
    desc: "Custom internal ERP built from scratch to support all company operations. Includes Inventory Management and a CRM with advanced interest/principal payment logic.",
    highlights: ["Led 4-developer team", "Reduced manual processing time significantly", "Inventory · CRM · Payment logic modules"],
    tags: ["Native PHP", "MySQL", "MVC Architecture"],
    status: "Production",
    team: "4 devs",
    impact: "Company-wide",
    github: "https://github.com/dev-judedel",
  },
  {
    index: "02",
    name: "Real Estate & Utility Billing System",
    desc: "Phase 1: Desktop app (Python/GTK) for property management and reporting. Phase 2: Migrated to a PHP web platform with automated e-SOA email billing and POS module.",
    highlights: ["Billing efficiency improved by 60%", "Eliminated physical mail delivery costs", "Automated billing computation engine"],
    tags: ["Python", "GTK/Glade", "PHP", "Laravel", "Pandas", "openpyxl"],
    status: "Production",
    team: "Solo → Team",
    impact: "60% faster billing",
    github: "https://github.com/dev-judedel",
  },
  {
    index: "03",
    name: "Subdivision Booking & QR Gate Pass",
    desc: "Multi-tenant system for amenities booking and QR-based gate access control across multiple subdivisions. Designed for scalable deployment across all properties.",
    highlights: ["Online booking for clubhouse, pools, tennis courts", "QR code generation & gate validation", "Multi-subdivision support"],
    tags: ["PHP Laravel", "MySQL", "QR Codes", "Multi-tenant"],
    status: "Production",
    team: "4 devs",
    impact: "Zero manual gate passes",
    github: "https://github.com/dev-judedel",
  },
  {
    index: "04",
    name: "BI Dashboards & DB Migration Tools",
    desc: "Real-time business intelligence dashboards for management and automated MySQL-to-PostgreSQL migration tools with validation and error handling.",
    highlights: ["Real-time data visualization", "Automated migration with error handling", "Legacy system enhancement"],
    tags: ["Chart.js", "Bootstrap", "Python", "MySQL", "PostgreSQL"],
    status: "Production",
    team: "Solo",
    impact: "Zero-downtime migration",
    github: "https://github.com/dev-judedel",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function ProjectsPage() {
  return (
    <div className="page-content">
      <motion.p {...fade(0)} style={{ fontSize: "13px", color: "var(--fg-3)", marginBottom: "20px" }}>
        {projects.length} enterprise systems built and deployed in production.
      </motion.p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {projects.map((p, i) => (
          <motion.div key={i} {...fade(i * 0.07)} className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* Index */}
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", marginTop: "3px", minWidth: "20px" }}>{p.index}</span>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)" }}>{p.name}</h3>
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                    <span className="badge badge-green">{p.status}</span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "4px 10px", fontSize: "12px" }}>
                      <Github size={12} /> Code
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.7, marginBottom: "12px" }}>{p.desc}</p>

                {/* Highlights */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
                  {p.highlights.map((h, j) => (
                    <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--fg-4)", marginTop: "6px", fontSize: "8px", flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: "12px", color: "var(--fg-3)" }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {p.tags.map(t => <span key={t} className="badge badge-gray">{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--fg-4)" }}>
                      <Users size={11} /><span style={{ fontSize: "11px" }}>{p.team}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--fg-4)" }}>
                      <TrendingUp size={11} /><span style={{ fontSize: "11px" }}>{p.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
