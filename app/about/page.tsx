"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Globe, Github, Download, Linkedin } from "lucide-react";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function AboutPage() {
  return (
    <div className="page-content">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "16px", alignItems: "start" }} className="about-grid">

        {/* Left: Bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Profile card */}
          <motion.div {...fade(0)} className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                background: "var(--accent)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", fontWeight: 700,
              }}>JD</div>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--fg)" }}>Jude Dela Cruz</h2>
                <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: "2px" }}>Full Stack Developer</p>
                <span className="badge badge-green" style={{ marginTop: "4px" }}>● Available for Work</span>
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)", marginBottom: "16px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.75 }}>
                Experienced Full Stack Developer with <strong>8+ years</strong> delivering enterprise-level web and desktop applications at AsianLand Strategies Corporation. Specialized in system architecture, billing logic, and ERP solutions.
              </p>
              <p style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.75 }}>
                My work spans building complex systems from the ground up — from custom ERP platforms with advanced payment logic, to real estate billing engines, to QR-based access control systems. I take ownership of the full lifecycle: architecture, development, database design, and team coordination.
              </p>
              <p style={{ fontSize: "13px", color: "var(--fg-2)", lineHeight: 1.75 }}>
                I hold a BS in Mathematics (Major in Computer Science) from Bulacan State University and have been recognized with Supervisor of the Year (2024) and Staff of the Year — Software Developer (2021).
              </p>
            </div>
          </motion.div>

          {/* What I do */}
          <motion.div {...fade(0.1)} className="card" style={{ padding: "20px 24px" }}>
            <p className="section-title" style={{ marginBottom: "12px" }}>What I Do</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} className="whatido-grid">
              {[
                { t: "System Architecture", d: "Design scalable, maintainable enterprise systems from scratch" },
                { t: "Backend Development", d: "Python & PHP APIs, business logic, billing computation engines" },
                { t: "Database Engineering", d: "MySQL/PostgreSQL design, optimization, and migration" },
                { t: "Team Leadership", d: "Lead dev teams, code reviews, mentoring junior developers" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "12px", background: "var(--bg)", borderRadius: "7px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg)", marginBottom: "4px" }}>{item.t}</p>
                  <p style={{ fontSize: "11px", color: "var(--fg-3)", lineHeight: 1.6 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <motion.div {...fade(0.05)} className="card" style={{ padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Contact Info</p>
            {[
              { icon: Mail,  label: "Email",    value: "judedelacruz2025@gmail.com", href: "mailto:judedelacruz2025@gmail.com" },
              { icon: Phone, label: "Phone",    value: "0956-130-5511",               href: "tel:+639561305511" },
              { icon: MapPin,label: "Location", value: "Balagtas, Bulacan, PH",       href: null },
              { icon: Globe, label: "Portfolio",value: "dev-judedel.github.io",       href: "https://dev-judedel.github.io/myportfolio/" },
              { icon: Github,   label: "GitHub",    value: "github.com/dev-judedel",            href: "https://github.com/dev-judedel" },
              { icon: Linkedin, label: "LinkedIn",  value: "linkedin.com/in/jude-delacruz",      href: "https://www.linkedin.com/in/jude-delacruz/" },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: i < 4 ? "10px" : 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: "6px", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color="var(--fg-3)" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "10px", color: "var(--fg-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "var(--blue)", textDecoration: "none", wordBreak: "break-all" }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: "12px", color: "var(--fg-2)" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade(0.1)}>
            <a href="/cv/Jude_Dela_Cruz_CV.pdf" download className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <Download size={13} /> Download Full CV
            </a>
          </motion.div>

          <motion.div {...fade(0.15)}>
            <Link href="/contact" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
              <Mail size={13} /> Send a Message
            </Link>
          </motion.div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .whatido-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
