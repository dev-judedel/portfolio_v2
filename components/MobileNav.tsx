"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, Mail, User } from "lucide-react";

const navItems = [
  { href: "/",           label: "Home",       icon: LayoutDashboard },
  { href: "/projects",   label: "Projects",   icon: FolderKanban },
  { href: "/skills",     label: "Skills",     icon: Wrench },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/about",      label: "About",      icon: User },
  { href: "/contact",    label: "Contact",    icon: Mail },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: "var(--mobile-nav-height)",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      display: "flex", alignItems: "center",
      zIndex: 100,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "3px",
            textDecoration: "none", padding: "6px 2px",
            color: active ? "var(--accent)" : "var(--fg-4)",
            transition: "color 0.12s",
          }}>
            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
            <span style={{ fontSize: "9px", fontWeight: active ? 600 : 400, letterSpacing: "0.02em" }}>
              {label}
            </span>
            {active && (
              <span style={{
                position: "absolute", bottom: 0,
                width: "20px", height: "2px",
                background: "var(--accent)", borderRadius: "2px 2px 0 0",
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
