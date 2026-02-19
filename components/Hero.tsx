"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  });

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "8rem 2rem 4rem",
      maxWidth: "900px", margin: "0 auto", position: "relative",
    }}>
      <motion.p {...fadeUp(0.1)} style={{
        fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#6b6b6b", marginBottom: "1.5rem",
      }}>
        Full Stack Developer · Balagtas, Bulacan
      </motion.p>

      <motion.h1 {...fadeUp(0.25)} style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(3rem, 8vw, 6.5rem)",
        lineHeight: 1.0, letterSpacing: "-0.02em",
        color: "#0f0f0f", marginBottom: "2rem",
      }}>
        Jude<br />
        <em style={{ fontStyle: "italic", color: "#6b6b6b" }}>Dela Cruz</em>
      </motion.h1>

      <motion.p {...fadeUp(0.4)} style={{
        fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7,
        color: "#6b6b6b", maxWidth: "520px", fontWeight: 300, marginBottom: "3rem",
      }}>
        8+ years building enterprise-level web and desktop applications.
        Specialized in Python, PHP, and database-driven systems with a strong
        eye for architecture and scalable design.
      </motion.p>

      <motion.div {...fadeUp(0.55)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a href="#projects" style={{
          padding: "0.75rem 2rem", background: "#0f0f0f", color: "#fafaf8",
          fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
          textDecoration: "none", fontWeight: 400, transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          View Projects
        </a>
        <a href="#contact" style={{
          padding: "0.75rem 2rem", border: "1px solid #e2e2dc", color: "#0f0f0f",
          fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
          textDecoration: "none", fontWeight: 400, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#0f0f0f"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e2dc"; }}
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        style={{ position: "absolute", bottom: "3rem", left: "0", display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
          style={{ width: "1px", height: "40px", background: "#e2e2dc" }}
        />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
