"use client";
import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page-content">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", alignItems: "start" }} className="contact-grid">

        {/* Form */}
        <motion.div {...fade(0)} className="card" style={{ padding: "24px" }}>
          <p className="section-title" style={{ marginBottom: "4px" }}>Send a Message</p>
          <p className="section-desc" style={{ marginBottom: "20px" }}>I typically respond within 24 hours.</p>

          {status === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "40px 0", textAlign: "center" }}>
              <CheckCircle size={40} color="var(--green)" />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)" }}>Message Sent!</p>
              <p style={{ fontSize: "13px", color: "var(--fg-3)" }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
              <button className="btn btn-secondary" onClick={() => setStatus("idle")}>Send Another</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--fg-2)", marginBottom: "6px" }}>Full Name</label>
                  <input name="from_name" required placeholder="Your name" className="input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--fg-2)", marginBottom: "6px" }}>Email Address</label>
                  <input name="from_email" type="email" required placeholder="you@example.com" className="input" />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--fg-2)", marginBottom: "6px" }}>Subject</label>
                <input name="subject" required placeholder="What's this about?" className="input" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--fg-2)", marginBottom: "6px" }}>Message</label>
                <textarea name="message" required rows={5} placeholder="Tell me more..." className="input" style={{ resize: "none" }} />
              </div>

              {status === "error" && (
                <p style={{ fontSize: "12px", color: "#dc2626", padding: "8px 12px", background: "#fef2f2", borderRadius: "6px", border: "1px solid #fecaca" }}>
                  Something went wrong. Please email me directly at judedelacruz2025@gmail.com
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.6 : 1 }}>
                <Send size={13} />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <motion.div {...fade(0.1)} className="card" style={{ padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Direct Contact</p>
            {[
              { icon: Mail,   label: "Email",    value: "judedelacruz2025@gmail.com", href: "mailto:judedelacruz2025@gmail.com" },
              { icon: Phone,  label: "Phone",    value: "0956-130-5511",               href: "tel:+639561305511" },
              { icon: MapPin, label: "Location", value: "Balagtas, Bulacan, PH",       href: null },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: i < 2 ? "12px" : 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: "6px", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color="var(--fg-3)" />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "var(--fg-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontSize: "12px", color: "var(--blue)", textDecoration: "none", wordBreak: "break-all" }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: "12px", color: "var(--fg-2)" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade(0.15)} className="card" style={{ padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Open To</p>
            {["Full-time roles", "Freelance / Contract", "Technical consultations", "Open source collaboration"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: i < 3 ? "7px" : 0 }}>
                <CheckCircle size={12} color="var(--green)" />
                <span style={{ fontSize: "12px", color: "var(--fg-2)" }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
