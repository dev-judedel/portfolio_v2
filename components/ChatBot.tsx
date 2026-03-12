"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What projects has Jude built?",
  "Is Jude available for hire?",
  "What's his tech stack?",
  "How can I contact Jude?",
];

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Jude's assistant. Ask me anything about his skills, projects, or how to get in touch!" },
  ]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Sorry, something went wrong.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 52, height: 52, borderRadius: "50%",
          background: "var(--primary)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
          zIndex: 200,
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? <X size={20} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -3, right: -3,
            width: 18, height: 18, borderRadius: "50%",
            background: "#ef4444", color: "#fff",
            fontSize: "10px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--bg)",
          }}>{unread}</span>
        )}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position: "fixed", bottom: 88, right: 24,
          width: 340, height: 480,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          zIndex: 199,
          overflow: "hidden",
          animation: "chatPop 0.18s ease",
        }}>

          {/* Header */}
          <div style={{
            padding: "14px 16px",
            background: "var(--primary)",
            display: "flex", alignItems: "center", gap: "10px",
            flexShrink: 0,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Jude's Assistant</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Online · Powered by Llama 3.3
              </p>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: "auto", background: "none", border: "none",
              cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: 4,
              display: "flex", borderRadius: "6px",
            }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: m.role === "user" ? "row-reverse" : "row",
                gap: "8px", alignItems: "flex-end",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: m.role === "user" ? "var(--primary)" : "var(--surface-2)",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {m.role === "user"
                    ? <User size={13} color="#fff" />
                    : <Bot size={13} color="var(--fg-3)" />
                  }
                </div>
                {/* Bubble */}
                <div style={{
                  maxWidth: "78%", padding: "9px 12px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "var(--primary)" : "var(--surface-2)",
                  border: m.role === "user" ? "none" : "1px solid var(--border)",
                  fontSize: "12.5px", lineHeight: "1.5",
                  color: m.role === "user" ? "#fff" : "var(--fg)",
                  wordBreak: "break-word",
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bot size={13} color="var(--fg-3)" />
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "12px 12px 12px 2px", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "var(--fg-4)",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      display: "inline-block",
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions (only show after first message) */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    fontSize: "11px", padding: "5px 10px", borderRadius: "20px",
                    border: "1px solid var(--border)", background: "var(--bg)",
                    color: "var(--fg-3)", cursor: "pointer", transition: "all 0.12s",
                  }}
                    onMouseEnter={e => { (e.currentTarget.style.borderColor = "var(--primary)"); (e.currentTarget.style.color = "var(--primary)"); }}
                    onMouseLeave={e => { (e.currentTarget.style.borderColor = "var(--border)"); (e.currentTarget.style.color = "var(--fg-3)"); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1px solid var(--border)",
            display: "flex", gap: "8px", alignItems: "center",
            flexShrink: 0, background: "var(--surface)",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
              disabled={loading}
              style={{
                flex: 1, padding: "8px 12px",
                background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: "20px", fontSize: "12.5px",
                color: "var(--fg)", outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.12s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: input.trim() && !loading ? "var(--primary)" : "var(--surface-2)",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "background 0.15s",
              }}
            >
              {loading
                ? <Loader2 size={14} color="var(--fg-4)" style={{ animation: "spin 1s linear infinite" }} />
                : <Send size={14} color={input.trim() ? "#fff" : "var(--fg-4)"} />
              }
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPop {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-4px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          /* push chatbot above mobile nav */
          .chatbot-window { bottom: 80px !important; right: 12px !important; width: calc(100vw - 24px) !important; }
        }
      `}</style>
    </>
  );
}
