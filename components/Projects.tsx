"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "Enterprise ERP System",
    description: "Custom internal ERP built from scratch using Native PHP and MySQL. Architected core modules including Inventory Management and CRM with advanced payment/interest logic. Coordinated a 4-developer team to deliver a scalable enterprise solution supporting all company operations.",
    tags: ["PHP", "MySQL", "CRM", "Inventory", "ERP"],
    github: "https://github.com/dev-judedel",
    live: null,
  },
  {
    index: "02",
    title: "Real Estate & Utility Billing System",
    description: "Phase 1: Desktop app (Python/GTK) for property inventory, buyer management, and automated reporting using Pandas and openpyxl. Phase 2: Migrated to PHP web platform with e-SOA email delivery and automated billing engine — improved billing efficiency by 60%.",
    tags: ["Python", "GTK/Glade", "PHP", "Pandas", "openpyxl", "Laravel"],
    github: "https://github.com/dev-judedel",
    live: null,
  },
  {
    index: "03",
    title: "Subdivision Booking & QR Gate Pass",
    description: "Multi-tenant system using PHP Laravel for amenities booking (clubhouse, tennis courts, pools) and QR code-based gate access control across multiple subdivisions. Led a 4-developer team through the full SDLC.",
    tags: ["Laravel", "MySQL", "QR Codes", "Multi-tenant"],
    github: "https://github.com/dev-judedel",
    live: null,
  },
  {
    index: "04",
    title: "BI Dashboards & DB Migration Tools",
    description: "Real-time business intelligence dashboards using Chart.js and Bootstrap. Automated MySQL-to-PostgreSQL data migration tools with validation and error handling for seamless legacy system transitions.",
    tags: ["Chart.js", "Bootstrap", "Python", "PostgreSQL", "MySQL"],
    github: "https://github.com/dev-judedel",
    live: null,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 2rem", borderTop: "1px solid #e2e2dc", background: "#f5f5f2" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: "0.5rem" }}>Projects</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "#0f0f0f" }}>
              Selected Work
            </h2>
          </motion.div>
          <motion.a
            href="https://github.com/dev-judedel" target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6b6b", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
            onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}
          >
            GitHub <ArrowUpRight size={14} />
          </motion.a>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: "easeOut" as const }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "2rem 0",
                borderBottom: "1px solid #e2e2dc",
                cursor: "default",
                transition: "all 0.3s",
              }}
            >
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: "0.85rem",
                  color: hovered === i ? "#0f0f0f" : "#d0d0cc",
                  transition: "color 0.3s", marginTop: "0.2rem", flexShrink: 0,
                }}>
                  {p.index}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <h3 style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      color: "#0f0f0f", lineHeight: 1.2,
                      transform: hovered === i ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}>
                      {p.title}
                    </h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6b6b", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}
                        >
                          Live <ArrowUpRight size={12} />
                        </a>
                      )}
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6b6b", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#0f0f0f")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}
                      >
                        GitHub <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#6b6b6b", marginTop: "0.75rem", fontWeight: 300, maxWidth: "580px" }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: "0.62rem", letterSpacing: "0.06em", color: "#6b6b6b",
                        border: "1px solid #e2e2dc", padding: "0.2rem 0.55rem", borderRadius: "2px",
                        background: "#fafaf8",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
