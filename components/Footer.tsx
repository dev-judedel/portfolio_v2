"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "#0f0f0f", borderTop: "1px solid #1e1e1e",
      padding: "2rem", display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "#4a4a4a" }}>
        © {new Date().getFullYear()} Jude Dela Cruz. All rights reserved.
      </p>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[
          { label: "GitHub", href: "https://github.com/dev-judedel" },
          { label: "Portfolio", href: "https://dev-judedel.github.io/myportfolio/" },
          { label: "Email", href: "mailto:judedelacruz2025@gmail.com" },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
            fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#4a4a4a", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fafaf8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a4a4a")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
