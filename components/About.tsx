"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: "0.75rem" }}
          >
            About
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ width: "2rem", height: "1px", background: "#0f0f0f", transformOrigin: "left" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
        >
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            lineHeight: 1.4, letterSpacing: "-0.01em",
            color: "#0f0f0f", marginBottom: "2rem",
          }}>
            I build systems that handle complexity at scale — from billing engines to ERP platforms.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#6b6b6b", marginBottom: "1.25rem", fontWeight: 300 }}>
            Experienced Full Stack Developer with 8+ years delivering enterprise-level web and desktop
            applications at AsianLand Strategies Corporation. I specialize in system architecture,
            billing logic, and ERP solutions — translating complex business requirements into clean,
            maintainable code.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#6b6b6b", fontWeight: 300 }}>
            I hold a BS in Mathematics (Major in Computer Science) from Bulacan State University,
            and have been awarded Supervisor of the Year (2024) and Staff of the Year — Software Developer (2021).
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            {[
              { num: "8+", label: "Years Experience" },
              { num: "3", label: "Enterprise Systems" },
              { num: "2", label: "Awards" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.5rem", lineHeight: 1, color: "#0f0f0f" }}>{num}</p>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b6b", marginTop: "0.25rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
