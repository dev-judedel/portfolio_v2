"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

// Replace these with your actual EmailJS IDs
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 0",
    background: "transparent", border: "none",
    borderBottom: "1px solid #e2e2dc",
    fontSize: "0.9rem", color: "#0f0f0f", fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300, outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "6rem 2rem", borderTop: "1px solid #e2e2dc", background: "#0f0f0f" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: "0.75rem" }}
            >
              Contact
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ width: "2rem", height: "1px", background: "#fafaf8", transformOrigin: "left" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ marginTop: "2rem" }}
            >
              <p style={{ fontSize: "0.78rem", color: "#6b6b6b", lineHeight: 1.8, marginBottom: "1.5rem", fontWeight: 300 }}>
                Open to new opportunities, collaborations, or just a conversation about tech.
              </p>
              <a href="mailto:judedelacruz2025@gmail.com" style={{ fontSize: "0.78rem", color: "#fafaf8", textDecoration: "none", letterSpacing: "0.02em" }}>
                judedelacruz2025@gmail.com
              </a>
              <br />
              <a href="tel:+639561305511" style={{ fontSize: "0.78rem", color: "#6b6b6b", textDecoration: "none", letterSpacing: "0.02em", marginTop: "0.4rem", display: "block" }}>
                0956-130-5511
              </a>
              <a href="https://dev-judedel.github.io/myportfolio/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "0.78rem", color: "#6b6b6b", textDecoration: "none", letterSpacing: "0.02em", marginTop: "0.4rem", display: "block" }}
              >
                Portfolio ↗
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" as const }}
          >
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fafaf8", lineHeight: 1.1, marginBottom: "2.5rem" }}>
              Let&apos;s work<br /><em style={{ color: "#6b6b6b", fontStyle: "italic" }}>together.</em>
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b6b", display: "block", marginBottom: "0.4rem" }}>Name</label>
                  <input name="from_name" required style={{ ...inputStyle, borderBottomColor: "#333" }} 
                    onFocus={e => (e.currentTarget.style.borderBottomColor = "#fafaf8")}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = "#333")}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b6b", display: "block", marginBottom: "0.4rem" }}>Email</label>
                  <input name="from_email" type="email" required style={{ ...inputStyle, borderBottomColor: "#333" }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = "#fafaf8")}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = "#333")}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b6b", display: "block", marginBottom: "0.4rem" }}>Subject</label>
                <input name="subject" required style={{ ...inputStyle, borderBottomColor: "#333" }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#fafaf8")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "#333")}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b6b", display: "block", marginBottom: "0.4rem" }}>Message</label>
                <textarea name="message" required rows={4} style={{ ...inputStyle, resize: "none", borderBottomColor: "#333" }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#fafaf8")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "#333")}
                />
              </div>

              <button type="submit" disabled={status === "sending"} style={{
                alignSelf: "flex-start", padding: "0.85rem 2.5rem",
                background: status === "success" ? "#2d5a27" : "#fafaf8",
                color: status === "success" ? "#fafaf8" : "#0f0f0f",
                border: "none", fontSize: "0.75rem", letterSpacing: "0.12em",
                textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400, cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.6 : 1,
                transition: "all 0.3s",
              }}>
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending…"}
                {status === "success" && "Message Sent ✓"}
                {status === "error" && "Try Again"}
              </button>

              {status === "error" && (
                <p style={{ fontSize: "0.8rem", color: "#e55", marginTop: "-0.5rem" }}>
                  Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
