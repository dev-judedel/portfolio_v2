"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.25rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e2dc" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <a href="#" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", textDecoration: "none", color: "#0f0f0f", letterSpacing: "0.02em" }}>
        JDC.
      </a>

      {/* Desktop nav */}
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map((l) => (
          <a key={l.label} href={l.href} style={{
            fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#6b6b6b", textDecoration: "none", fontWeight: 400,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
            onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}
          >
            {l.label}
          </a>
        ))}
        <a href="/cv/Jude_Dela_Cruz_CV.pdf" download style={{
          fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
          border: "1px solid #0f0f0f", padding: "0.4rem 1rem",
          color: "#0f0f0f", textDecoration: "none", fontWeight: 400,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0f0f0f"; e.currentTarget.style.color = "#fafaf8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0f0f0f"; }}
        >
          Download CV
        </a>
      </nav>
    </motion.header>
  );
}
