"use client";
import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "9px 12px",
    background: "var(--tag-bg)", border: "1px solid var(--border)",
    borderRadius: "7px", fontSize: "13px", color: "var(--fg)",
    fontFamily: "'Geist', sans-serif", outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" as const }}
      className="card"
      style={{ padding: "24px" }}
    >
      <h2 className="section-title">Get in Touch</h2>
      <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
        Open to new projects, roles, or just a conversation.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted)", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Name</label>
            <input name="from_name" required style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--fg)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
          <div>
            <label style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted)", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
            <input name="from_email" type="email" required style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--fg)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
        </div>
        <div>
          <label style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted)", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Message</label>
          <textarea name="message" required rows={4} style={{ ...inputStyle, resize: "none" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--fg)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
        <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ alignSelf: "flex-start" }}>
          <Send size={13} />
          {status === "idle" && "Send Message"}
          {status === "sending" && "Sending…"}
          {status === "success" && "Sent! ✓"}
          {status === "error" && "Failed — try again"}
        </button>
      </form>
    </motion.div>
  );
}
