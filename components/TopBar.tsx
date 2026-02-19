"use client";
import { usePathname } from "next/navigation";
import { MapPin, Mail } from "lucide-react";

const pageTitles: Record<string, { title: string; desc: string }> = {
  "/":           { title: "Dashboard",  desc: "Overview of my work and profile" },
  "/projects":   { title: "Projects",   desc: "Enterprise systems & applications I've built" },
  "/skills":     { title: "Skills",     desc: "Technical stack and tools" },
  "/experience": { title: "Experience", desc: "Work history and education" },
  "/about":      { title: "About",      desc: "Background and profile" },
  "/contact":    { title: "Contact",    desc: "Get in touch" },
};

export default function TopBar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Page", desc: "" };

  return (
    <header style={{
      height: "var(--header-height)",
      borderBottom: "1px solid var(--border)",
      background: "var(--surface)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div>
        <h1 style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>{page.title}</h1>
        <p style={{ fontSize: "12px", color: "var(--fg-3)", marginTop: "1px" }} className="topbar-desc">{page.desc}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--fg-3)" }} className="topbar-meta">
          <MapPin size={12} />
          <span style={{ fontSize: "12px" }}>Balagtas, Bulacan, PH</span>
        </div>
        <a href="mailto:judedelacruz2025@gmail.com" style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "5px 12px", borderRadius: "6px",
          border: "1px solid var(--border)", background: "var(--bg)",
          color: "var(--fg)", textDecoration: "none", fontSize: "12px",
          fontWeight: 500, transition: "border-color 0.12s",
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <Mail size={12} />
          <span className="topbar-email">Email Me</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .topbar-desc, .topbar-meta { display: none !important; }
          .topbar-email { display: none !important; }
        }
      `}</style>
    </header>
  );
}
