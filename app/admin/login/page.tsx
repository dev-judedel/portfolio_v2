"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg)", padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 360 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "12px",
            background: "var(--accent)", color: "var(--bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Lock size={22} />
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--fg)" }}>Admin Access</h1>
          <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: "6px" }}>
            Enter your password to manage portfolio content
          </p>
        </div>

        {/* Form */}
        <div className="card" style={{ padding: "24px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  style={{
                    width: "100%", padding: "9px 40px 9px 12px",
                    background: "var(--bg)", border: `1px solid ${error ? "#ef4444" : "var(--border)"}`,
                    borderRadius: "7px", fontSize: "13px", color: "var(--fg)",
                    fontFamily: "inherit", outline: "none", transition: "border-color 0.15s",
                  }}
                  onFocus={e => !error && (e.currentTarget.style.borderColor = "var(--border-strong)")}
                  onBlur={e => !error && (e.currentTarget.style.borderColor = "var(--border)")}
                />
                <button type="button" onClick={() => setShow(!show)}
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--fg-4)", padding: 2,
                  }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>{error}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px" }}>
              {loading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Lock size={14} />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--fg-4)", marginTop: "16px" }}>
          Portfolio by Jude Dela Cruz
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
