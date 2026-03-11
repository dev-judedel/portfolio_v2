"use client";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    // Default to dark mode unless user has explicitly chosen light
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header style={{
      height: "var(--header-height)",
      borderBottom: "1px solid var(--border)",
      background: "var(--surface)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
      position: "sticky", top: 0, zIndex: 40,
      transition: "background 0.2s, border-color 0.2s",
      backdropFilter: "blur(8px)",
    }}>
      <div>
        <h1 style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>{page.title}</h1>
        <p style={{ fontSize: "12px", color: "var(--fg-3)", marginTop: "1px" }} className="topbar-desc">{page.desc}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          className="topbar-email"
        >
          <Mail size={12} />
          Email Me
        </a>

        {/* Dark mode toggle */}
        {mounted && (
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: "6px",
              border: "1px solid var(--border)", background: "var(--bg)",
              color: "var(--fg-3)", cursor: "pointer",
              transition: "all 0.12s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-3)"; }}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .topbar-desc, .topbar-meta, .topbar-email { display: none !important; }
        }
      `}</style>
    </header>
  );
}
