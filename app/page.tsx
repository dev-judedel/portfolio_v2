"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight, FolderKanban, Wrench, Briefcase, Mail,
  MapPin, Github, Linkedin, Award, TrendingUp, Activity,
  Clock, CheckCircle2, Zap, Code2, Database, Globe,
  ArrowUpRight, Download, Star
} from "lucide-react";
import type { Profile, Project, Award as AwardType, Skill } from "@/lib/types";
import GitHubGraph from "@/components/GitHubGraph";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: "easeOut" as const },
});

const KPI_ACCENTS = ["var(--primary)", "var(--purple)", "var(--green)", "var(--amber)"];

const STATUS_COLORS = ["var(--green)", "var(--primary)", "var(--purple)", "var(--amber)"];
const STATUS_ICONS  = [CheckCircle2, CheckCircle2, Activity, Zap];
const STACK_COLORS  = ["var(--primary)", "var(--purple)", "var(--green)", "var(--amber)", "var(--primary)", "var(--fg-3)"];

export default function DashboardPage() {
  const [profile, setProfile]   = useState<Partial<Profile> | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [awards, setAwards]     = useState<AwardType[]>([]);
  const [skills, setSkills]     = useState<Skill[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/profile").then(r => r.json()),
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/awards").then(r => r.json()),
      fetch("/api/skills").then(r => r.json()),
    ]).then(([p, proj, aw, sk]) => {
      setProfile(p);
      setProjects(proj.slice(0, 4));
      setAwards(aw);
      setSkills(Array.isArray(sk) ? sk : []);
    }).catch(() => {});
  }, []);

  const name = profile?.name ?? "Jude Dela Cruz";
  const title = profile?.title ?? "Full Stack Developer";
  const location = profile?.location ?? "Balagtas, Bulacan, PH";
  const available = profile?.available ?? true;
  const github = profile?.github ?? "https://github.com/dev-judedel";
  const linkedin = profile?.linkedin ?? "https://www.linkedin.com/in/jude-delacruz/";
  const years = profile?.years_experience ?? "8+";
  const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);

  const techStack = skills.slice(0, 6).map((s, i) => ({
    name:  s.name,
    icon:  s.icon  || "⚡",
    level: s.level === "Expert" ? 95 : s.level === "Advanced" ? 80 : 65,
    color: STACK_COLORS[i % STACK_COLORS.length],
  }));

  const topTags = Array.from(
    new Set(projects.flatMap(p => p.tags?.slice(0, 2) ?? []))
  ).slice(0, 3).join(" · ") || "Python · PHP · SQL";

  const awardYears = awards.map(a => a.year).filter(Boolean).join(" & ") || "Recognition";

  const kpis = [
    { value: years,                       label: "Years Experience",      sub: "Since 2017",           icon: Clock,    accent: KPI_ACCENTS[0] },
    { value: String(projects.length || "—"), label: "Systems in Production", sub: topTags,             icon: Code2,    accent: KPI_ACCENTS[1] },
    { value: String(awards.length   || "—"), label: "Company Awards",        sub: awardYears,          icon: Star,     accent: KPI_ACCENTS[2] },
    { value: String(skills.length   || "—"), label: "Technologies",          sub: "Skills in production", icon: Database, accent: KPI_ACCENTS[3] },
  ];

  return (
    <div className="page-content" style={{ maxWidth: 1040 }}>

      {/* ── Hero Banner ── */}
      <motion.div {...fade(0)} style={{
        marginBottom: "20px", borderRadius: "12px", overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}>
        {/* Gradient top stripe */}
        <div style={{
          height: 3,
          background: "linear-gradient(90deg, var(--primary) 0%, #7c3aed 50%, var(--green) 100%)",
        }} />

        <div style={{ padding: "20px 24px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={name}
                style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-border)" }} />
            ) : (
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: 700, border: "2px solid var(--primary-border)",
              }}>{initials}</div>
            )}
            {available && (
              <span style={{
                position: "absolute", bottom: 2, right: 2,
                width: 12, height: 12, borderRadius: "50%",
                background: "var(--green)", border: "2px solid var(--surface)",
              }} />
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>{name}</h2>
              {available && (
                <span className="badge badge-green" style={{ fontSize: "10px", padding: "2px 7px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                  Available
                </span>
              )}
            </div>
            <p style={{ fontSize: "13px", color: "var(--fg-3)", marginBottom: "5px" }}>
              {title} · Python · PHP · Enterprise Systems
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--fg-4)" }}>
              <MapPin size={11} />
              <span style={{ fontSize: "11px" }}>{location}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }}>
              <Github size={13} /> GitHub
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }}>
              <Linkedin size={13} /> LinkedIn
            </a>
            <a href="/cv/Jude_Dela_Cruz_CV.pdf" download className="btn btn-primary" style={{ fontSize: "12px", padding: "6px 12px" }}>
              <Download size={13} /> Download CV
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── KPI Row ── */}
      <motion.div {...fade(0.05)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "18px" }} className="stats-grid">
        {kpis.map((k, i) => (
          <div key={i} className="stat-card" style={{ "--stat-accent": k.accent } as React.CSSProperties}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div style={{ width: 30, height: 30, borderRadius: "8px", background: `${k.accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon size={14} color={k.accent} />
              </div>
              <TrendingUp size={11} color="var(--green)" />
            </div>
            <div className="stat-value">{k.value}</div>
            <div className="stat-label">{k.label}</div>
            <div className="stat-sub">{k.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Main 3-col grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 260px", gap: "12px", alignItems: "start" }} className="dash-main">

        {/* ── Projects table ── */}
        <motion.div {...fade(0.1)} className="card" style={{ gridColumn: "1 / 3" }}>
          <div style={{ padding: "14px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p className="section-title">Production Systems</p>
              <p className="section-desc">Enterprise applications live in production</p>
            </div>
            <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
              View all <ArrowRight size={11} />
            </Link>
          </div>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 140px 90px 80px", gap: "12px", padding: "10px 18px 6px", borderTop: "1px solid var(--border)", marginTop: "12px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
            {["#", "System Name", "Stack", "Team", "Status"].map(h => (
              <span key={h} style={{ fontSize: "10px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
            ))}
          </div>

          {projects.length > 0 ? projects.map((p, i) => (
            <Link key={p.id} href="/projects" style={{
              display: "grid", gridTemplateColumns: "24px 1fr 140px 90px 80px", gap: "12px",
              padding: "11px 18px", textDecoration: "none",
              borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none",
              transition: "background 0.1s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: "11px", color: "var(--fg-4)", fontWeight: 600 }}>{p.index || `0${i+1}`}</span>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
              <span style={{ fontSize: "11px", color: "var(--fg-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.tags?.slice(0, 2).join(" · ")}</span>
              <span style={{ fontSize: "11px", color: "var(--fg-4)" }}>{p.team}</span>
              <span className="badge badge-green" style={{ fontSize: "10px", padding: "1px 6px", width: "fit-content" }}>{p.status}</span>
            </Link>
          )) : (
            // Skeleton rows while loading
            [1,2,3,4].map(i => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr 140px 90px 80px", gap: "12px", padding: "13px 18px", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                <div className="skeleton" style={{ height: 12, width: 16 }} />
                <div className="skeleton" style={{ height: 12 }} />
                <div className="skeleton" style={{ height: 12, width: 100 }} />
                <div className="skeleton" style={{ height: 12, width: 50 }} />
                <div className="skeleton" style={{ height: 12, width: 60 }} />
              </div>
            ))
          )}
        </motion.div>

        {/* ── Right column: Quick nav + Awards ── */}
        <motion.div {...fade(0.12)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Quick nav */}
          <div className="card" style={{ padding: "14px 14px 10px" }}>
            <p className="section-title" style={{ marginBottom: "10px" }}>Quick Access</p>
            {([
              { label: "Projects",   href: "/projects",   icon: FolderKanban, desc: `${projects.length || "—"} systems in production`, color: "var(--primary)" },
              { label: "Skills",     href: "/skills",     icon: Wrench,       desc: `${skills.length   || "—"} technologies`,           color: "var(--purple)" },
              { label: "Experience", href: "/experience", icon: Briefcase,    desc: `${years} years · AsianLand`,                       color: "var(--green)"  },
              { label: "Contact",    href: "/contact",    icon: Mail,         desc: "Open to opportunities",                            color: "var(--amber)"  },
            ] as { label: string; href: string; icon: React.ElementType; desc: string; color: string }[]).map(({ label, href, icon: Icon, desc, color }) => (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "8px 9px", borderRadius: "7px",
                textDecoration: "none", transition: "all 0.11s", marginBottom: "3px",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: 28, height: 28, borderRadius: "7px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)" }}>{label}</p>
                  <p style={{ fontSize: "10px", color: "var(--fg-4)" }}>{desc}</p>
                </div>
                <ArrowUpRight size={12} color="var(--fg-4)" />
              </Link>
            ))}
          </div>

          {/* Awards */}
          <div className="card" style={{ padding: "14px" }}>
            <p className="section-title" style={{ marginBottom: "10px" }}>Recognition</p>
            {(awards.length > 0 ? awards : [
              { id: 1, title: "Supervisor of the Year", sub: "IT Supervisor", year: "2024", org: "", sort_order: 1 },
              { id: 2, title: "Staff of the Year",      sub: "Software Developer", year: "2021", org: "", sort_order: 2 },
            ]).map((a, i) => (
              <div key={a.id} style={{ display: "flex", gap: "9px", alignItems: "flex-start", marginBottom: i === 0 ? "10px" : 0 }}>
                <div style={{ width: 26, height: 26, borderRadius: "6px", background: "var(--amber-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <Award size={12} color="var(--amber)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>{a.title}</p>
                  <p style={{ fontSize: "10px", color: "var(--fg-4)" }}>{a.sub}</p>
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--fg-3)", flexShrink: 0 }}>{a.year}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom row: Tech stack + Activity feed ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }} className="dash-bottom">

        {/* Tech stack health */}
        <motion.div {...fade(0.18)} className="card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div>
              <p className="section-title">Core Stack</p>
              <p className="section-desc">Primary technologies in production</p>
            </div>
            <Link href="/skills" style={{ fontSize: "11px", color: "var(--primary)", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "3px" }}>
              All skills <ArrowRight size={11} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {(techStack.length > 0 ? techStack : [
              { name: "Python",      icon: "🐍", level: 95, color: "var(--primary)" },
              { name: "PHP/Laravel", icon: "🐘", level: 95, color: "var(--purple)" },
              { name: "MySQL",       icon: "🗄️", level: 95, color: "var(--green)"  },
            ]).map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px", lineHeight: 1, width: 20, textAlign: "center", flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)", width: 110, flexShrink: 0 }}>{t.name}</span>
                <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.level}%` }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: "easeOut" as const }}
                    style={{ height: "100%", background: t.color, borderRadius: "4px" }}
                  />
                </div>
                <span style={{ fontSize: "10px", color: "var(--fg-4)", width: 28, textAlign: "right", flexShrink: 0 }}>{t.level}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity feed */}
        <motion.div {...fade(0.2)} className="card" style={{ padding: "16px 18px" }}>
          <div style={{ marginBottom: "14px" }}>
            <p className="section-title">System Status</p>
            <p className="section-desc">All production systems operational</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {projects.map((p, i) => {
              const color = STATUS_COLORS[i % STATUS_COLORS.length];
              const Icon  = STATUS_ICONS[i % STATUS_ICONS.length];
              const desc  = p.impact || (p.desc ? p.desc.slice(0, 42) + "…" : "In production");
              return (
                <div key={p.id} style={{
                  display: "flex", gap: "12px", alignItems: "flex-start",
                  padding: "10px 0",
                  borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: "2px" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={11} color={color} />
                    </div>
                    {i < projects.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "var(--border)", minHeight: 12, marginTop: 3 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)" }}>{p.name}</p>
                    <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "1px" }}>{desc}</p>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: "9px", padding: "1px 5px", flexShrink: 0 }}>{p.status || "Active"}</span>
                </div>
              );
            })}
            {projects.length === 0 && (
              <p style={{ fontSize: "12px", color: "var(--fg-4)", padding: "12px 0" }}>Loading…</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── GitHub Graph ── */}
      <div style={{ marginTop: "12px" }}>
        <GitHubGraph username="dev-judedel" />
      </div>

      <style>{`
        @media (max-width: 960px) { .dash-main { grid-template-columns: 1fr !important; } .dash-main > *:first-child { grid-column: 1 !important; } }
        @media (max-width: 700px) { .dash-bottom { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
