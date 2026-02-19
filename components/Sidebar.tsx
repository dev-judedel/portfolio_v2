"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, Wrench,
  Briefcase, Mail, User, Download, Github, ExternalLink
} from "lucide-react";

const navItems = [
  { href: "/",           label: "Dashboard",  icon: LayoutDashboard },
  { href: "/projects",   label: "Projects",   icon: FolderKanban },
  { href: "/skills",     label: "Skills",     icon: Wrench },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/about",      label: "About",      icon: User },
  { href: "/contact",    label: "Contact",    icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="desktop-sidebar" style={{
      position: "fixed", top: 0, left: 0, bottom: 0,
      width: "var(--sidebar-width)",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      zIndex: 50,
    }}>
      {/* Logo / Name */}
      <div style={{
        height: "var(--header-height)",
        display: "flex", alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid var(--border)",
        gap: "10px",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "6px",
          background: "var(--accent)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700, flexShrink: 0,
        }}>JD</div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>Jude Dela Cruz</p>
          <p style={{ fontSize: "11px", color: "var(--fg-3)", lineHeight: 1.2, marginTop: "1px" }}>Full Stack Developer</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        <p style={{
          fontSize: "10px", fontWeight: 600, color: "var(--fg-4)",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "8px 8px 4px",
        }}>Menu</p>

        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "7px 8px", borderRadius: "6px", marginBottom: "1px",
              textDecoration: "none",
              fontSize: "13px", fontWeight: active ? 500 : 400,
              color: active ? "var(--fg)" : "var(--fg-3)",
              background: active ? "var(--bg)" : "transparent",
              border: active ? "1px solid var(--border)" : "1px solid transparent",
              transition: "all 0.12s",
            }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = "var(--bg)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"; }}}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.5} />
              {label}
              {active && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
        <a href="/cv/Jude_Dela_Cruz_CV.pdf" download className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginBottom: "6px" }}>
          <Download size={13} /> Download CV
        </a>
        <div style={{ display: "flex", gap: "6px" }}>
          <a href="https://github.com/dev-judedel" target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "6px", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--fg-3)", textDecoration: "none", fontSize: "12px", transition: "all 0.12s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"; }}
          >
            <Github size={13} /> GitHub
          </a>
          <a href="https://dev-judedel.github.io/myportfolio/" target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "6px", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--fg-3)", textDecoration: "none", fontSize: "12px", transition: "all 0.12s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"; }}
          >
            <ExternalLink size={13} /> Portfolio
          </a>
        </div>
      </div>
    </aside>
  );
}
