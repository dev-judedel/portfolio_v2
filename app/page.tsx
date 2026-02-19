"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FolderKanban, Wrench, Briefcase, Mail, MapPin, Github, ExternalLink, Award } from "lucide-react";

const stats = [
  { value: "8+",  label: "Years Experience", sub: "Since 2017" },
  { value: "3",   label: "Enterprise Systems", sub: "ERP · Billing · Booking" },
  { value: "2",   label: "Company Awards", sub: "2021 & 2024" },
  { value: "10+", label: "Technologies", sub: "Python · PHP · SQL · more" },
];

const recentProjects = [
  { name: "Enterprise ERP System",        tech: "PHP · MySQL",       status: "Production", href: "/projects" },
  { name: "Real Estate Billing Platform", tech: "Python · Laravel",  status: "Production", href: "/projects" },
  { name: "QR Gate Pass System",          tech: "Laravel · MySQL",   status: "Production", href: "/projects" },
  { name: "BI Reporting Dashboards",      tech: "Chart.js · Python", status: "Production", href: "/projects" },
];

const quickLinks = [
  { label: "Projects",   href: "/projects",   icon: FolderKanban, desc: "4 enterprise systems" },
  { label: "Skills",     href: "/skills",     icon: Wrench,       desc: "Backend, DB, Frontend" },
  { label: "Experience", href: "/experience", icon: Briefcase,    desc: "8+ years at AsianLand" },
  { label: "Contact",    href: "/contact",    icon: Mail,         desc: "Let's work together" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function DashboardPage() {
  return (
    <div className="page-content">

      {/* Profile banner */}
      <motion.div {...fade(0)} className="card" style={{ padding: "20px 24px", marginBottom: "20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
          background: "var(--accent)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: 700,
        }}>JD</div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--fg)" }}>Jude Dela Cruz</h2>
            <span className="badge badge-green">● Available</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: "3px" }}>
            Full Stack Developer · Python · PHP · Enterprise Systems
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", color: "var(--fg-4)" }}>
            <MapPin size={11} />
            <span style={{ fontSize: "12px" }}>Balagtas, Bulacan, Philippines</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a href="https://github.com/dev-judedel" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Github size={13} /> GitHub
          </a>
          <a href="/cv/Jude_Dela_Cruz_CV.pdf" download className="btn btn-primary">
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div {...fade(0.05)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Two columns: recent projects + quick nav */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", alignItems: "start" }} className="dash-grid">

        {/* Recent projects table */}
        <motion.div {...fade(0.1)} className="card">
          <div className="section-header" style={{ padding: "16px 20px 0" }}>
            <div>
              <p className="section-title">Recent Projects</p>
              <p className="section-desc">Latest enterprise systems delivered</p>
            </div>
            <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--fg-3)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-3)")}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ marginTop: "12px" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px", padding: "8px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
              {["Project", "Stack", "Status"].map(h => (
                <span key={h} style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
              ))}
            </div>
            {recentProjects.map((p, i) => (
              <Link key={i} href={p.href} style={{
                display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px",
                padding: "12px 20px", textDecoration: "none",
                borderBottom: i < recentProjects.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.12s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg)" }}>{p.name}</span>
                <span className="badge badge-gray">{p.tech}</span>
                <span className="badge badge-green">{p.status}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick nav */}
        <motion.div {...fade(0.15)} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Quick Navigate</p>
          {quickLinks.map(({ label, href, icon: Icon, desc }) => (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "12px 14px", borderRadius: "8px",
              border: "1px solid var(--border)", background: "var(--surface)",
              textDecoration: "none", transition: "all 0.12s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.background = "var(--bg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "7px", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={15} color="var(--fg-2)" />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg)" }}>{label}</p>
                <p style={{ fontSize: "11px", color: "var(--fg-4)" }}>{desc}</p>
              </div>
              <ArrowRight size={14} color="var(--fg-4)" style={{ marginLeft: "auto" }} />
            </Link>
          ))}

          {/* Awards card */}
          <div className="card" style={{ padding: "14px", marginTop: "4px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Awards</p>
            {[
              { title: "Supervisor of the Year", year: "2024" },
              { title: "Staff of the Year — Dev", year: "2021" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: i === 0 ? "8px" : 0 }}>
                <Award size={13} color="var(--fg-3)" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)" }}>{a.title}</p>
                </div>
                <span style={{ fontSize: "11px", color: "var(--fg-4)" }}>{a.year}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 360px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
