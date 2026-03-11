"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Users, TrendingUp, ArrowUpRight, ChevronDown } from "lucide-react";
import type { Project } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   All mockup tokens are pure CSS custom properties.
   They are injected via <style> at page level so they
   exist in the DOM before any component renders.
   Both light and dark values are defined — toggling
   html.dark swaps them automatically.
───────────────────────────────────────────────────────── */
const MOCKUP_STYLE = `
  :root {
    --mb:  #f8fafc;
    --ms:  #eef2f7;
    --mbo: #dde3ec;
    --mt:  #1e293b;
    --mm:  #64748b;
    --mf:  #94a3b8;
    --mfb: #ffffff;
    --mfr: #f1f5f9;
    --mfx: #e2e8f0;
    --mub: #e4eaf2;
    --msh: rgba(15,23,42,0.10);
  }
  html.dark {
    --mb:  #0d1117;
    --ms:  #161b22;
    --mbo: #21262d;
    --mt:  #e6edf3;
    --mm:  #8b949e;
    --mf:  #6e7681;
    --mfb: #0d1117;
    --mfr: #161b22;
    --mfx: #21262d;
    --mub: #21262d;
    --msh: rgba(0,0,0,0.55);
  }
  .bf  { background:var(--mfb); border:1px solid var(--mfx); border-radius:12px; overflow:hidden; }
  .bft { background:var(--mfr); border-bottom:1px solid var(--mfx); padding:9px 13px; display:flex; align-items:center; gap:10px; }
  .bfu { background:var(--mub); border-radius:5px; padding:3px 10px; flex:1; display:flex; align-items:center; gap:6px; }
  .bfb { background:var(--mb); padding:13px; }

  .ms-card { background:var(--ms); border:1px solid var(--mbo); border-radius:6px; padding:6px 8px; }
  .ms-row  { border-bottom:1px solid var(--mbo); }

  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  .cur { animation:blink 1s step-end infinite; color:var(--mf); }

  .proj-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
    align-items: center;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 40px;
  }
  .proj-grid.flip {
    grid-template-columns: 1.2fr 1fr;
  }
  .proj-grid.flip .proj-text   { order: 2; }
  .proj-grid.flip .proj-mockup { order: 1; }

  @media (max-width: 820px) {
    .proj-grid, .proj-grid.flip {
      grid-template-columns: 1fr !important;
      padding: 0 20px !important;
      gap: 28px !important;
    }
    .proj-grid .proj-text,
    .proj-grid.flip .proj-text   { order: 2 !important; }
    .proj-grid .proj-mockup,
    .proj-grid.flip .proj-mockup { order: 1 !important; }
    .scroll-dots { display:none !important; }
  }
`;

/* accent helpers — work in both themes */
const A = {
  blue:   "#3b82f6",
  green:  "#22c55e",
  amber:  "#f59e0b",
  purple: "#a78bfa",
  red:    "#ef4444",
};

/* ─────────────────────────────────────────────────────────
   MOCKUP COMPONENTS
   All colors: either a hardcoded vivid accent (A.xxx)
   or a CSS var string (rendered as style value → works fine)
───────────────────────────────────────────────────────── */
function ERPMockup() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 5), 1400);
    return () => clearInterval(id);
  }, []);

  const rows = [
    { id: "INV-001", item: "Office Supplies",   qty: 142, val: "₱28,400",  status: "In Stock"  },
    { id: "INV-002", item: "IT Equipment",      qty: 38,  val: "₱312,000", status: "Low Stock" },
    { id: "INV-003", item: "Furniture",         qty: 67,  val: "₱95,200",  status: "In Stock"  },
    { id: "INV-004", item: "Stationery",        qty: 890, val: "₱12,600",  status: "In Stock"  },
    { id: "INV-005", item: "Cleaning Supplies", qty: 24,  val: "₱8,900",   status: "Critical"  },
  ];

  return (
    <div style={{ fontFamily: "monospace", fontSize: "11px" }}>
      {/* Nav strip */}
      <div style={{ display:"flex", gap:14, padding:"7px 10px", background:`${A.blue}18`, borderBottom:`1px solid ${A.blue}28`, marginBottom:10 }}>
        {["Dashboard","Inventory","CRM","Payments","Reports"].map((n,i) => (
          <span key={n} style={{ fontSize:10, color:i===1?A.blue:"var(--mf)", fontWeight:i===1?700:400, borderBottom:i===1?`2px solid ${A.blue}`:"none", paddingBottom:2 }}>{n}</span>
        ))}
      </div>
      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, marginBottom:10 }}>
        {[{l:"Total SKUs",v:"1,204",c:A.blue},{l:"Total Value",v:"₱4.2M",c:A.green},{l:"Low Stock",v:"3 items",c:A.amber}].map(s=>(
          <div key={s.l} className="ms-card">
            <div style={{ color:s.c, fontWeight:700, fontSize:12 }}>{s.v}</div>
            <div style={{ color:"var(--mf)", fontSize:9, marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="ms-card" style={{ padding:"4px 6px", marginBottom:3 }}>
        <div style={{ display:"grid", gridTemplateColumns:"52px 1fr 36px 62px 56px", gap:5 }}>
          {["ID","Item","Qty","Value","Status"].map(h=>(
            <span key={h} style={{ color:"var(--mf)", fontSize:9, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</span>
          ))}
        </div>
      </div>
      {rows.map((r,i)=>(
        <motion.div key={r.id}
          animate={{ background: i===tick ? `${A.blue}14` : "transparent" }}
          transition={{ duration:0.35 }}
          style={{ display:"grid", gridTemplateColumns:"52px 1fr 36px 62px 56px", gap:5, padding:"5px 6px", borderRadius:4 }}
          className="ms-row"
        >
          <span style={{ color:A.blue, opacity:0.85 }}>{r.id}</span>
          <span style={{ color:"var(--mt)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.item}</span>
          <span style={{ color:"var(--mm)" }}>{r.qty}</span>
          <span style={{ color:A.green }}>{r.val}</span>
          <span style={{ fontSize:9, padding:"1px 5px", borderRadius:3, textAlign:"center",
            background: r.status==="In Stock"?`${A.green}18`:r.status==="Low Stock"?`${A.amber}18`:`${A.red}18`,
            color: r.status==="In Stock"?A.green:r.status==="Low Stock"?A.amber:A.red,
          }}>{r.status}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────
// BILLING MOCKUP — Utility Billing System
// Tab 1: e-SOA sample statement form
// Tab 2: Accounts list with Overdue / Due / Advance status
// ──────────────────────────────────────────────────
function BillingMockup() {
  const [tab, setTab] = useState<"esoa" | "accounts">("esoa");

  // ── e-SOA statement animation ──
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!sending) return;
    const id = setInterval(() => setProgress(p => {
      if (p >= 100) {
        clearInterval(id);
        setSending(false);
        setSent(true);
        setTimeout(() => { setSent(false); setProgress(0); }, 2200);
        return 100;
      }
      return p + 4;
    }), 60);
    return () => clearInterval(id);
  }, [sending]);

  // ── Accounts list ──
  const [filter, setFilter] = useState<"all"|"overdue"|"due"|"advance">("all");
  const accounts = [
    { unit:"Block A-12", name:"Santos, M.",  amount:"₱18,500", bal:"₱4,848,750", dueIn:-5,  advance:false },
    { unit:"Block B-03", name:"Reyes, J.",   amount:"₱22,000", bal:"₱3,200,000", dueIn: 0,  advance:false },
    { unit:"Block C-07", name:"Cruz, A.",    amount:"₱15,750", bal:"₱2,450,000", dueIn: 8,  advance:false },
    { unit:"Block D-21", name:"Lim, R.",     amount:"₱28,000", bal:"₱5,120,000", dueIn:-12, advance:false },
    { unit:"Block A-05", name:"Tan, L.",     amount:"₱19,200", bal:"₱1,890,000", dueIn: 30, advance:true  },
    { unit:"Block E-09", name:"Flores, K.",  amount:"₱24,500", bal:"₱3,675,000", dueIn: 25, advance:true  },
  ];

  function getStatus(a: typeof accounts[0]) {
    if (a.advance)   return { txt:"Advance",  color:A.blue,   bg:`${A.blue}15`   };
    if (a.dueIn < 0) return { txt:`Overdue ${Math.abs(a.dueIn)}d`, color:A.red,  bg:`${A.red}15`  };
    if (a.dueIn === 0) return { txt:"Due Today", color:A.amber, bg:`${A.amber}15` };
    return { txt:`Due in ${a.dueIn}d`, color:A.green, bg:`${A.green}15` };
  }

  const filtered = filter === "all" ? accounts
    : filter === "overdue"  ? accounts.filter(a => !a.advance && a.dueIn < 0)
    : filter === "due"      ? accounts.filter(a => !a.advance && a.dueIn >= 0)
    : accounts.filter(a => a.advance);

  const tabBtnSx = (t: string, active: boolean): React.CSSProperties => ({
    flex:1, padding:"4px 0", borderRadius:5, border:"none", cursor:"pointer",
    fontSize:9, fontWeight:600,
    background: active ? "var(--mfb)" : "transparent",
    color: active ? (t==="esoa" ? A.purple : A.blue) : "var(--mf)",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
    transition:"all 0.15s",
  });

  return (
    <div style={{ fontFamily:"monospace", fontSize:11 }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ color:A.purple, fontWeight:700, fontSize:12 }}>Utility Billing System</span>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:1.2 }}
            style={{ width:6, height:6, borderRadius:"50%", background:A.green }} />
          <span style={{ color:A.green, fontSize:9, fontWeight:700 }}>LIVE</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:3, marginBottom:10, background:"var(--ms)", borderRadius:7, padding:3 }}>
        <button onClick={() => setTab("esoa")}     style={tabBtnSx("esoa",     tab==="esoa")}>📳 e-SOA Statement</button>
        <button onClick={() => setTab("accounts")} style={tabBtnSx("accounts", tab==="accounts")}>📂 Accounts</button>
      </div>

      {/* ── TAB 1: e-SOA Statement Form ── */}
      {tab === "esoa" && (
        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>

          {/* Statement header */}
          <div style={{ background:`${A.purple}10`, border:`1px solid ${A.purple}28`, borderRadius:8, padding:"8px 10px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
              <div>
                <div style={{ color:A.purple, fontWeight:800, fontSize:11, letterSpacing:"0.06em" }}>STATEMENT OF ACCOUNT</div>
                <div style={{ color:"var(--mf)", fontSize:8, marginTop:2 }}>Period: March 2026 · Due: March 9, 2026</div>
              </div>
              <div style={{ textAlign:"right" as const }}>
                <div style={{ color:"var(--mt)", fontWeight:700, fontSize:10 }}>Block A-12</div>
                <div style={{ color:"var(--mf)", fontSize:8 }}>Santos, Maria L.</div>
              </div>
            </div>
            {/* Feature pills */}
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" as const }}>
              {[{l:"📎 PDF",c:A.purple},{l:"📬 Email",c:A.blue},{l:"🔁 POS",c:A.green},{l:"⚠️ Due Alert",c:A.amber}].map(f=>(
                <span key={f.l} style={{ fontSize:8, padding:"1px 6px", borderRadius:10, background:`${f.c}15`, color:f.c, border:`1px solid ${f.c}30`, fontWeight:600 }}>{f.l}</span>
              ))}
            </div>
          </div>

          {/* Utility bill line items */}
          <div style={{ border:"1px solid var(--mbo)", borderRadius:7, overflow:"hidden" }}>
            {/* Column headers */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 68px 68px", padding:"4px 10px", background:"var(--ms)", borderBottom:"1px solid var(--mbo)" }}>
              {["Particulars","Rate","Amount"].map(h => (
                <span key={h} style={{ fontSize:8, fontWeight:700, color:"var(--mf)", textTransform:"uppercase" as const, letterSpacing:"0.05em", textAlign: h==="Particulars" ? "left" as const : "right" as const }}>{h}</span>
              ))}
            </div>
            {[
              { label:"Homeowners Dues",      rate:"₱150.00",  amt:"₱150.00",  c:"var(--mt)", sub:false },
              { label:"Streetlights",          rate:"₱80.00",   amt:"₱80.00",   c:"var(--mt)", sub:true  },
              { label:"Grass Control Fee",     rate:"₱60.00",   amt:"₱60.00",   c:"var(--mt)", sub:true  },
              { label:"Water Bill",            rate:"₱12/cu.m", amt:"₱240.00",  c:"var(--mt)", sub:false },
              { label:"Garbage Collection",    rate:"₱50.00",   amt:"₱50.00",   c:"var(--mt)", sub:true  },
              { label:"Surcharge (5%)",        rate:"—",        amt:"₱29.00",   c:A.amber,     sub:false },
              { label:"Previous Balance",      rate:"—",        amt:"₱0.00",    c:"var(--mm)", sub:false },
            ].map((r,i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"1fr 68px 68px",
                padding:"4px 10px", borderBottom:"1px solid var(--mbo)",
                background: r.label==="Surcharge (5%)" ? `${A.amber}08` : "var(--mfb)",
              }}>
                <span style={{ color:r.sub ? "var(--mf)" : "var(--mt)", fontSize:9, paddingLeft: r.sub ? 10 : 0 }}>
                  {r.sub ? "· " : ""}{r.label}
                </span>
                <span style={{ color:"var(--mf)", fontSize:9, textAlign:"right" as const }}>{r.rate}</span>
                <span style={{ color:r.c, fontSize:9, textAlign:"right" as const, fontWeight:500 }}>{r.amt}</span>
              </div>
            ))}
            {/* Total */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 68px 68px", padding:"6px 10px", background:`${A.purple}10`, borderTop:"2px solid var(--mbo)" }}>
              <span style={{ color:"var(--mt)", fontSize:10, fontWeight:700 }}>Total Due</span>
              <span />
              <span style={{ color:A.purple, fontSize:11, fontWeight:800, textAlign:"right" as const }}>₱609.00</span>
            </div>
          </div>

          {/* Send button with progress */}
          {!sent ? (
            <div>
              {sending && (
                <div style={{ height:4, background:"var(--ms)", borderRadius:3, overflow:"hidden", marginBottom:5, border:"1px solid var(--mbo)" }}>
                  <motion.div style={{ height:"100%", background:`linear-gradient(90deg,${A.purple},#a78bfa)`, width:`${progress}%` }} />
                </div>
              )}
              <button
                onClick={() => { if(!sending){ setSending(true); setProgress(0); } }}
                disabled={sending}
                style={{ width:"100%", padding:"6px", borderRadius:6, border:"none", cursor:sending?"wait":"pointer",
                  background:sending?`${A.purple}60`:A.purple, color:"#fff", fontWeight:700, fontSize:10 }}>
                {sending ? `Sending… ${Math.round(progress)}%` : "📧 Send e-SOA to Client"}
              </button>
            </div>
          ) : (
            <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
              style={{ textAlign:"center" as const, fontSize:10, color:A.green, fontWeight:700, padding:"6px",
                background:`${A.green}12`, borderRadius:6, border:`1px solid ${A.green}30` }}>
              ✓ Statement sent to santos.m@gmail.com
            </motion.div>
          )}
        </div>
      )}

      {/* ── TAB 2: Accounts List ── */}
      {tab === "accounts" && (
        <div>
          {/* Summary pills */}
          <div style={{ display:"flex", gap:4, marginBottom:8, flexWrap:"wrap" as const }}>
            {([
              { key:"all",     label:"All",      count:accounts.length,                                       c:"var(--fg-3)" },
              { key:"overdue", label:"Overdue",  count:accounts.filter(a=>!a.advance&&a.dueIn<0).length,     c:A.red   },
              { key:"due",     label:"Due",      count:accounts.filter(a=>!a.advance&&a.dueIn>=0).length,    c:A.amber },
              { key:"advance", label:"Advance",  count:accounts.filter(a=>a.advance).length,                 c:A.blue  },
            ] as const).map(f => (
              <button key={f.key} onClick={() => setFilter(f.key as typeof filter)} style={{
                padding:"2px 8px", borderRadius:10, border:`1px solid ${filter===f.key ? f.c : "var(--mbo)"}`,
                background: filter===f.key ? `${f.c}18` : "transparent",
                color: filter===f.key ? f.c : "var(--mf)",
                fontSize:8, fontWeight:600, cursor:"pointer",
              }}>{f.label} <span style={{ fontWeight:800 }}>({f.count})</span></button>
            ))}
          </div>

          {/* Account rows */}
          {filtered.map((a, i) => {
            const st = getStatus(a);
            return (
              <motion.div key={i}
                initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.05 }}
                style={{ display:"flex", gap:6, alignItems:"center", padding:"6px 4px", borderRadius:4,
                  background: a.dueIn<0&&!a.advance ? `${A.red}06` : "transparent" }}
                className="ms-row"
              >
                <div style={{ width:3, height:30, borderRadius:2, flexShrink:0, background:st.color, opacity:0.7 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                    <span style={{ color:"var(--mt)", fontWeight:600, fontSize:9, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</span>
                    <span style={{ color:"var(--mf)", fontSize:8, flexShrink:0 }}>{a.unit}</span>
                  </div>
                  <div style={{ color:"var(--mf)", fontSize:8, marginTop:1 }}>Bal: {a.bal}</div>
                </div>
                <div style={{ textAlign:"right" as const, flexShrink:0 }}>
                  <div style={{ color:A.purple, fontWeight:700, fontSize:9 }}>{a.amount}</div>
                  <motion.span
                    animate={{ scale: a.dueIn===0 ? [1,1.1,1] : 1 }}
                    transition={{ duration:0.6, repeat: a.dueIn===0 ? Infinity : 0, repeatDelay:1.2 }}
                    style={{ fontSize:8, padding:"1px 6px", borderRadius:10, fontWeight:700,
                      background:st.bg, color:st.color }}>
                    {st.txt}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────
// BUYER CONTACT MOCKUP — Contact update form + history log
// ──────────────────────────────────────────────────
function BuyerContactMockup() {
  const [addr,  setAddr]  = useState("Blk 3 Lot 12, Casa Buena De Pulilan");
  const [email, setEmail] = useState("santos.m@gmail.com");
  const [phone, setPhone] = useState("09171234567");
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [logs, setLogs] = useState([
    { time:"2026-03-01 09:14", field:"Email",   old:"santos@yahoo.com",          upd:"santos.m@gmail.com",          by:"admin" },
    { time:"2026-01-15 14:32", field:"Address", old:"Blk 2 Lot 5, Phase 1",       upd:"Blk 3 Lot 12, Casa Buena",    by:"admin" },
    { time:"2025-11-08 10:05", field:"Phone",   old:"09081234567",                upd:"09171234567",                 by:"admin" },
  ]);

  const inputSx: React.CSSProperties = {
    width:"100%", background:"var(--ms)", border:"1px solid var(--mbo)",
    borderRadius:5, padding:"4px 8px", fontSize:10, color:"var(--mt)",
    fontFamily:"monospace", outline:"none", boxSizing:"border-box",
  };

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      const now = new Date();
      const ts  = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      setLogs(prev => [{ time:ts, field:"Contact", old:"(previous)", upd:`${addr} / ${email} / ${phone}`, by:"admin" }, ...prev]);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 900);
  }

  return (
    <div style={{ fontFamily:"monospace", fontSize:11 }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ color:A.blue, fontWeight:700, fontSize:12 }}>Buyer Contact Manager</span>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          <span style={{ fontSize:9, padding:"1px 8px", borderRadius:10, background:`${A.blue}15`, color:A.blue, fontWeight:600 }}>Block A-12</span>
          <span style={{ fontSize:9, color:"var(--mm)" }}>Santos, Maria L.</span>
        </div>
      </div>

      {/* Form */}
      <div style={{ border:"1px solid var(--mbo)", borderRadius:8, padding:"10px 12px", marginBottom:8, display:"flex", flexDirection:"column", gap:7 }}>
        <div style={{ color:A.blue, fontWeight:700, fontSize:10, borderLeft:`3px solid ${A.blue}`, paddingLeft:8 }}>Update Contact Information</div>
        {([
          { label:"Address",      val:addr,  set:setAddr  },
          { label:"Email",        val:email, set:setEmail },
          { label:"Phone Number", val:phone, set:setPhone },
        ] as { label:string; val:string; set:(v:string)=>void }[]).map(f => (
          <div key={f.label}>
            <div style={{ fontSize:8, color:"var(--mf)", marginBottom:3, textTransform:"uppercase" as const, letterSpacing:"0.05em" }}>{f.label}</div>
            <input value={f.val} onChange={e => f.set(e.target.value)} style={inputSx} />
          </div>
        ))}
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={handleSave} disabled={saving||saved} style={{
            flex:1, padding:"5px", borderRadius:6, border:"none", cursor:"pointer",
            background: saved ? A.green : saving ? `${A.blue}80` : A.blue,
            color:"#fff", fontWeight:700, fontSize:10, transition:"background 0.2s",
          }}>
            {saved ? "✓ Saved" : saving ? "Saving…" : "Update Contact"}
          </button>
          <button onClick={() => { setAddr("Blk 3 Lot 12, Casa Buena De Pulilan"); setEmail("santos.m@gmail.com"); setPhone("09171234567"); }}
            style={{ padding:"5px 10px", borderRadius:6, border:"1px solid var(--mbo)", cursor:"pointer", background:"var(--ms)", color:"var(--mm)", fontSize:10 }}>
            Reset
          </button>
        </div>
      </div>

      {/* History log */}
      <div>
        <div style={{ fontSize:8, color:"var(--mf)", textTransform:"uppercase" as const, letterSpacing:"0.07em", marginBottom:5, fontWeight:600 }}>Change History</div>
        <AnimatePresence initial={false}>
          {logs.map((l, i) => (
            <motion.div key={`${l.time}-${i}`}
              initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.2 }}
              style={{ padding:"5px 4px", borderBottom:"1px solid var(--mbo)", display:"flex", gap:6, alignItems:"flex-start" }}
            >
              <div style={{ width:3, height:"100%", minHeight:24, borderRadius:2, background:A.blue, opacity:0.5, flexShrink:0, marginTop:2 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" as const }}>
                  <span style={{ color:A.blue, fontWeight:700, fontSize:9 }}>{l.field}</span>
                  <span style={{ color:"var(--mf)", fontSize:8 }}>updated by {l.by}</span>
                  <span style={{ color:"var(--mf)", fontSize:8, marginLeft:"auto" }}>{l.time}</span>
                </div>
                <div style={{ color:"var(--mm)", fontSize:8, marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>
                  <span style={{ color:A.red, opacity:0.7 }}>{l.old}</span>
                  <span style={{ color:"var(--mf)", margin:"0 4px" }}>→</span>
                  <span style={{ color:A.green }}>{l.upd}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QRMockup() {
  const [entries, setEntries] = useState([
    { name:"Garcia, P.",  unit:"A-12", time:"08:14", type:"Entry" },
    { name:"Mendoza, K.", unit:"B-07", time:"08:22", type:"Exit"  },
    { name:"Torres, A.",  unit:"C-03", time:"08:31", type:"Entry" },
  ]);
  useEffect(() => {
    const names=["Villanueva, R.","Aquino, S.","Bautista, L.","Flores, M.","Ramos, E."];
    const units=["D-15","A-09","B-22","C-11","A-03"];
    const id=setInterval(()=>{
      const now=new Date();
      setEntries(e=>[{
        name:names[Math.floor(Math.random()*names.length)],
        unit:units[Math.floor(Math.random()*units.length)],
        time:`${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`,
        type:Math.random()>0.5?"Entry":"Exit",
      },...e.slice(0,4)]);
    },2800);
    return ()=>clearInterval(id);
  },[]);

  return (
    <div style={{ fontFamily:"monospace", fontSize:11 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
        {/* Scanner */}
        <div style={{ background:`${A.green}0e`, border:`1px solid ${A.green}28`, borderRadius:8, padding:10, textAlign:"center" }}>
          <div style={{ position:"relative", width:62, height:62, margin:"0 auto 6px", border:`2px solid ${A.green}50`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", background:"var(--ms)" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,9px)", gap:1 }}>
              {Array.from({length:25}).map((_,i)=>(
                <div key={i} style={{ width:9, height:9, borderRadius:1,
                  background:[0,1,4,5,2,7,12,17,22,20,23,24].includes(i)?`${A.green}cc`:"transparent" }} />
              ))}
            </div>
            <motion.div animate={{ top:["8%","84%","8%"] }} transition={{ duration:1.8, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${A.green},transparent)` }} />
          </div>
          <div style={{ color:A.green, fontSize:9, fontWeight:700, letterSpacing:"0.06em" }}>SCANNING</div>
          <div style={{ color:"var(--mf)", fontSize:8, marginTop:1 }}>Gate A · Subdivision 1</div>
        </div>
        {/* Stat pills */}
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {[{l:"Today Entries",v:`${38+entries.length}`,c:A.green},{l:"Bookings",v:"12",c:A.blue},{l:"Denied",v:"2",c:A.red}].map(s=>(
            <div key={s.l} className="ms-card" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color:"var(--mf)", fontSize:9 }}>{s.l}</span>
              <span style={{ color:s.c, fontWeight:700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ color:"var(--mf)", fontSize:9, marginBottom:5, letterSpacing:"0.06em" }}>LIVE GATE LOG</div>
      <AnimatePresence initial={false}>
        {entries.slice(0,4).map((e,i)=>(
          <motion.div key={`${e.name}-${e.time}-${i}`}
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
            style={{ display:"flex", gap:7, alignItems:"center", padding:"4px 0" }} className="ms-row"
          >
            <span style={{ color:e.type==="Entry"?A.green:A.amber, fontSize:9, width:28, fontWeight:700 }}>{e.type==="Entry"?"IN":"OUT"}</span>
            <span style={{ color:"var(--mt)", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.name}</span>
            <span style={{ color:"var(--mf)", fontSize:9 }}>{e.unit}</span>
            <span style={{ color:"var(--mf)", fontSize:9 }}>{e.time}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function BookingMockup() {
  const slots = ["5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM",
                  "1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM"];
  const [sel, setSel] = useState<number[]>([17]);

  function toggle(i: number) {
    setSel(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  const total = sel.length * 500;
  const fee   = Math.round(total * 0.02);

  return (
    <div style={{ fontFamily: "sans-serif", fontSize: 11 }}>
      {/* User details */}
      <div style={{ border: `1px solid var(--mbo)`, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
        <div style={{ color: A.blue, fontWeight: 700, fontSize: 11, borderLeft: `3px solid ${A.blue}`, paddingLeft: 8, marginBottom: 8 }}>Your Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
          <div style={{ background: "var(--ms)", border: "1px solid var(--mbo)", borderRadius: 5, padding: "4px 8px", fontSize: 11, color: "var(--mt)" }}>Jude</div>
          <div style={{ background: "var(--ms)", border: "1px solid var(--mbo)", borderRadius: 5, padding: "4px 8px", fontSize: 11, color: "var(--mt)" }}>user@gmail.com</div>
        </div>
        <div style={{ background: "var(--ms)", border: "1px solid var(--mbo)", borderRadius: 5, padding: "4px 8px", fontSize: 11, color: "var(--mt)", width: "48%" }}>09561305511</div>
      </div>
      {/* Date + slots */}
      <div style={{ border: `1px solid var(--mbo)`, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
        <div style={{ color: A.blue, fontWeight: 700, fontSize: 11, borderLeft: `3px solid ${A.blue}`, paddingLeft: 8, marginBottom: 8 }}>Select Date &amp; Time</div>
        <div style={{ background: "var(--ms)", border: "1px solid var(--mbo)", borderRadius: 5, padding: "4px 8px", fontSize: 10, color: "var(--mm)", marginBottom: 8 }}>📅 03/11/2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
          {slots.map((s, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              padding: "3px 2px", borderRadius: 6, fontSize: 9, cursor: "pointer",
              border: sel.includes(i) ? `1px solid ${A.blue}` : "1px solid var(--mbo)",
              background: sel.includes(i) ? `${A.blue}18` : "var(--ms)",
              color: sel.includes(i) ? A.blue : "var(--mm)",
              fontWeight: sel.includes(i) ? 700 : 400,
            }}>{s}</button>
          ))}
        </div>
        <div style={{ color: "var(--mf)", fontSize: 8, marginTop: 5 }}>Each slot = 1 hour. Select one or more consecutive slots.</div>
      </div>
      {/* Summary sidebar */}
      <div style={{ background: `${A.blue}08`, border: `1px solid ${A.blue}28`, borderRadius: 8, padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, color: "var(--mt)", marginBottom: 6, fontSize: 11 }}>Booking Summary</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ color: "var(--mm)", fontSize: 10 }}>Court Fee ({sel.length} hr)</span>
          <span style={{ color: "var(--mt)", fontWeight: 600, fontSize: 10 }}>₱{total.toLocaleString()}.00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "var(--mm)", fontSize: 10 }}>Convenience Fee (2%)</span>
          <span style={{ color: "var(--mt)", fontSize: 10 }}>₱{fee.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--mbo)", paddingTop: 5 }}>
          <span style={{ fontWeight: 700, color: "var(--mt)" }}>Total</span>
          <span style={{ fontWeight: 800, color: A.blue, fontSize: 14 }}>₱{(total + fee).toLocaleString()}.00</span>
        </div>
        <button style={{ marginTop: 8, width: "100%", padding: "6px", borderRadius: 6, background: A.blue, color: "#fff", border: "none", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
          Proceed to Payment →
        </button>
        <div style={{ textAlign: "center", color: "var(--mf)", fontSize: 8, marginTop: 4 }}>🔒 Secured by Xendit · GCash · Maya</div>
      </div>
    </div>
  );
}

function GatePassMockup() {
  const [entries, setEntries] = useState([
    { name: "June Ocampo",      role: "Laborer", scans: 0 },
    { name: "Herald Librando",  role: "Laborer", scans: 0 },
    { name: "Michael Dimla",    role: "Laborer", scans: 2 },
    { name: "Henriquito Quino", role: "Laborer", scans: 1 },
  ]);

  useEffect(() => {
    const names = ["Santos, A.", "Reyes, M.", "Cruz, J.", "Lim, R."];
    const id = setInterval(() => {
      setEntries(prev => prev.map(e =>
        Math.random() > 0.7 ? { ...e, scans: e.scans + 1 } : e
      ));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", fontSize: 11 }}>
      {/* Gate Pass card */}
      <div style={{ border: `1px solid ${A.blue}40`, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ background: A.blue, color: "#fff", fontWeight: 800, fontSize: 11, padding: "6px 12px", letterSpacing: "0.1em" }}>GATE PASS</div>
        <div style={{ padding: "10px 12px", display: "flex", gap: 12 }}>
          {/* QR code */}
          <div style={{ width: 60, height: 60, border: "2px solid var(--mbo)", borderRadius: 6, display: "grid", gridTemplateColumns: "repeat(5, 9px)", gap: 1, padding: 4, flexShrink: 0, background: "var(--mfb)", alignSelf: "flex-start" }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: 1, background: [0,1,4,5,2,7,12,17,22,20,23,24,10,3,18].includes(i) ? "var(--mt)" : "transparent" }} />
            ))}
          </div>
          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: "var(--mt)", fontSize: 13 }}>EDSEL GERVACIO</div>
            <div style={{ color: "var(--mm)", fontSize: 9, marginBottom: 4 }}>CBP-1 19/6</div>
            <span style={{ background: `${A.blue}18`, color: A.blue, fontSize: 9, padding: "1px 8px", borderRadius: 10, fontWeight: 600 }}>Worker Pass</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 6 }}>
              {[["FROM","Mar 11, 2026"],["UNTIL","Mar 20, 2026"]].map(([l,v]) => (
                <div key={l}>
                  <div style={{ color: "var(--mf)", fontSize: 8 }}>{l}</div>
                  <div style={{ color: "var(--mt)", fontWeight: 600, fontSize: 9 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 4, fontSize: 8, color: "var(--mf)" }}>Subdivision: Casa Buena De Pulilan</div>
          </div>
        </div>
      </div>
      {/* Pass Members */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontWeight: 700, color: "var(--mt)", fontSize: 11 }}>Pass Members ({entries.length})</span>
        <span style={{ fontSize: 8, color: A.blue, cursor: "pointer" }}>+ Add Worker</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {entries.map((e, i) => (
          <div key={i} className="ms-card" style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${A.blue}18`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>👤</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "var(--mt)", fontWeight: 600, fontSize: 9, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</div>
              <div style={{ color: "var(--mf)", fontSize: 8 }}>{e.role}</div>
              <motion.div
                animate={{ color: e.scans > 0 ? A.green : A.amber }}
                style={{ fontSize: 8, marginTop: 1 }}
              >
                {e.scans > 0 ? `✓ ${e.scans} scan${e.scans > 1 ? "s" : ""}` : "Not Yet Scanned"}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RealEstateMockup() {
  const rows = [
    { or: "232323", inv: "INV-2026-00184", paid: "₱41,250", period: "PD-1", balance: "₱4,848,750", isPaid: true  },
    { or: "242424", inv: "INV-2026-00185", paid: "₱41,250", period: "PD-2", balance: "₱4,807,500", isPaid: true  },
    { or: "252525", inv: "INV-2026-00187", paid: "₱41,250", period: "PD-3", balance: "₱4,766,250", isPaid: true  },
    { or: "262626", inv: "—",              paid: "₱41,250", period: "PD-4", balance: "₱4,725,000", isPaid: false },
    { or: "432444", inv: "INV-2026-00189", paid: "₱41,250", period: "PD-5", balance: "₱4,683,750", isPaid: true  },
    { or: "213123", inv: "INV-2026-00190", paid: "₱41,250", period: "PD-6", balance: "₱4,642,500", isPaid: true  },
  ];
  const [activeTab, setActiveTab] = useState(2);
  const tabs = ["Overview", "Schedule", "Payment Schedule", "Records", "Agent Commission"];

  return (
    <div style={{ fontFamily: "monospace", fontSize: 10 }}>
      {/* Discount badge */}
      <div style={{ background: `${A.amber}10`, border: `1px solid ${A.amber}30`, borderRadius: 6, padding: "5px 10px", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "var(--mm)", fontSize: 9 }}>Discount: <strong style={{ color: "var(--mt)" }}>TCP component discount</strong></span>
        <span style={{ color: A.green, fontWeight: 700, fontSize: 10 }}>₱100,000.00</span>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8, borderBottom: "1px solid var(--mbo)", paddingBottom: 5 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            fontSize: 8, padding: "2px 7px", borderRadius: 4, cursor: "pointer",
            background: activeTab === i ? "var(--mfb)" : "transparent",
            border: activeTab === i ? "1px solid var(--mbo)" : "1px solid transparent",
            color: activeTab === i ? "var(--mt)" : "var(--mf)",
            fontWeight: activeTab === i ? 700 : 400,
            whiteSpace: "nowrap",
          }}>{t}</button>
        ))}
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 5, marginBottom: 7, alignItems: "center" }}>
        {[["All",A.blue,"#fff"],["Paid",A.green,"#fff"],["To Pay",A.red,"#fff"]].map(([l,bg,c],i) => (
          <span key={l} style={{ fontSize: 8, padding: "1px 8px", borderRadius: 10, background: i===0?bg:`${bg}18`, color: i===0?c:bg, border: i===0?"none":`1px solid ${bg}40`, fontWeight: 600 }}>{l}</span>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 4, background: A.blue, color: "#fff", fontWeight: 600 }}>Export CSV</span>
      </div>
      {/* Table */}
      <div style={{ border: "1px solid var(--mbo)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "52px 52px 80px 46px 52px 32px", gap: 4, padding: "4px 6px", background: "var(--ms)", borderBottom: "1px solid var(--mbo)" }}>
          {["DUE","PAY","INVOICE","PAID","BALANCE","PD"].map(h => (
            <span key={h} style={{ fontSize: 7, fontWeight: 700, color: "var(--mf)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</span>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 52px 80px 46px 52px 32px", gap: 4, padding: "4px 6px", borderBottom: i < rows.length-1 ? "1px solid var(--mbo)" : "none", background: row.isPaid ? `${A.green}06` : "var(--mfb)" }}>
            <span style={{ color: "var(--mm)", fontSize: 9 }}>03-{String(9+i).padStart(2,"0")}</span>
            <span style={{ color: "var(--mm)", fontSize: 9 }}>03-09</span>
            <span style={{ color: row.inv==="—"?"var(--mf)":"var(--mt)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 9 }}>{row.inv}</span>
            <span style={{ color: A.green, fontWeight: 600, fontSize: 9 }}>{row.paid}</span>
            <span style={{ color: "var(--mt)", fontSize: 9 }}>{row.balance}</span>
            <span style={{ background: row.isPaid?`${A.green}18`:`${A.red}18`, color: row.isPaid?A.green:A.red, borderRadius: 3, padding: "0 3px", fontSize: 8, fontWeight: 600, textAlign: "center" }}>{row.period}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 5, display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 9, color: "var(--mm)" }}>Balance: <strong style={{ color: A.blue }}>₱4,477,500.00</strong></span>
      </div>
    </div>
  );
}

function BIMockup() {
  const [data, setData] = useState([65,72,58,85,91,78,95]);
  useEffect(()=>{
    const id=setInterval(()=>setData(d=>[...d.slice(1),Math.floor(55+Math.random()*40)]),1600);
    return ()=>clearInterval(id);
  },[]);
  const max=Math.max(...data);
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul"];

  return (
    <div style={{ fontFamily:"monospace", fontSize:11 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ color:A.amber, fontWeight:700, fontSize:12 }}>BI Dashboard</span>
        <div style={{ display:"flex", gap:5 }}>
          {["Revenue","Units","Occupancy"].map((f,i)=>(
            <span key={f} style={{ fontSize:9, padding:"1px 6px", borderRadius:3, border:"1px solid var(--mbo)",
              background:i===0?`${A.amber}20`:"var(--ms)", color:i===0?A.amber:"var(--mf)" }}>{f}</span>
          ))}
        </div>
      </div>
      {/* Bar chart */}
      <div className="ms-card" style={{ marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:76 }}>
          {data.map((v,i)=>(
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
              <motion.div
                animate={{ height:`${(v/max)*62}px` }}
                transition={{ duration:0.55, ease:"easeOut" }}
                style={{ width:"100%", borderRadius:"3px 3px 0 0", minHeight:4,
                  background:i===data.length-1?`linear-gradient(180deg,${A.amber},#d97706)`:`${A.amber}40` }}
              />
              <span style={{ fontSize:8, color:"var(--mf)" }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5 }}>
        {[{l:"Revenue",v:"₱12.4M",d:"+8.2%",c:A.amber},{l:"Occupancy",v:"94.2%",d:"+1.1%",c:A.green},{l:"Collection",v:"98.7%",d:"+0.4%",c:A.blue}].map(k=>(
          <div key={k.l} className="ms-card">
            <div style={{ color:k.c, fontWeight:700, fontSize:12 }}>{k.v}</div>
            <div style={{ color:"var(--mf)", fontSize:8 }}>{k.l}</div>
            <div style={{ color:A.green, fontSize:8, marginTop:2 }}>↑ {k.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getProjectMockup(name: string): React.ComponentType {
  const n = name.toLowerCase();
  // Order matters: more specific checks first
  if (n.includes("booking") || n.includes("court"))                           return BookingMockup;
  if (n.includes("gate") || n.includes("pass") || n.includes("qr"))           return GatePassMockup;
  if (n.includes("bi ") || n.includes("dashboard") || n.includes("migration")) return BIMockup;
  if (n.includes("buyer") || n.includes("contact"))                            return BuyerContactMockup;
  if (n.includes("billing") || n.includes("soa") || n.includes("real estate") || n.includes("utility")) return BillingMockup;
  if (n.includes("erp") || n.includes("inventory") || n.includes("enterprise")) return ERPMockup;
  return ERPMockup;
}

function getProjectUrl(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("booking") || n.includes("court"))                          return "booking.asianland.local/book";
  if (n.includes("gate") || n.includes("pass") || n.includes("qr"))          return "gates.asianland.local/passes";
  if (n.includes("bi ") || n.includes("dashboard") || n.includes("migration")) return "bi.asianland.local/dashboard";
  if (n.includes("billing") || n.includes("real estate") || n.includes("utility") || n.includes("buyer") || n.includes("contact")) return "billing.asianland.local/buyer-contact";
  return "erp.asianland.local/inventory";
}

/* ─────────────────────────────────────────────────────────
   Browser Frame
───────────────────────────────────────────────────────── */
function BrowserFrame({ children, accent, url }: { children: React.ReactNode; accent: string; url: string }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped(""); let i = 0;
    const id = setInterval(() => { i++; setTyped(url.slice(0,i)); if(i>=url.length) clearInterval(id); }, 38);
    return () => clearInterval(id);
  }, [url]);

  return (
    <div className="bf" style={{ boxShadow:`0 20px 56px var(--msh), 0 0 40px ${accent}18` }}>
      <div className="bft">
        <div style={{ display:"flex", gap:5, flexShrink:0 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c=>(
            <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
          ))}
        </div>
        <div className="bfu">
          <div style={{ width:6, height:6, borderRadius:"50%", background:accent, flexShrink:0 }} />
          <span style={{ fontSize:10, color:"var(--mm)", fontFamily:"monospace" }}>
            {typed}<span className="cur">|</span>
          </span>
        </div>
      </div>
      <div className="bfb">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Single Project Section
   — ref lives HERE, not in the parent wrapper
   — useTransform hooks declared at top level, always
───────────────────────────────────────────────────────── */
function ProjectSection({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Always declared — no conditional hook calls
  const textY   = useTransform(scrollYProgress, [0,1], [40, -40]);
  const mockupY = useTransform(scrollYProgress, [0,1], [60, -60]);

  const Mockup  = getProjectMockup(project.name);
  const isEven  = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{ minHeight:"85vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"48px 0" }}
    >
      {/* Ambient blob */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:`radial-gradient(ellipse 52% 44% at ${isEven?"68%":"32%"} 50%, ${project.accent}14 0%, transparent 65%)`,
      }}/>

      <div className={`proj-grid${isEven ? "" : " flip"}`}>

        {/* TEXT */}
        <motion.div style={{ y: textY }} className="proj-text">
          {/* Index rule */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <span style={{ fontSize:10, fontWeight:800, color:project.accent, letterSpacing:"0.14em", textTransform:"uppercase" }}>
              {project.index || `0${index+1}`}
            </span>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${project.accent}70,transparent)` }}/>
            <span style={{ fontSize:10, color:"var(--fg-4)" }}>{index+1} / {total}</span>
          </div>

          <h2 style={{ fontSize:26, fontWeight:800, color:"var(--fg)", lineHeight:1.2, letterSpacing:"-0.025em", marginBottom:12 }}>
            {project.name}
          </h2>

          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
            <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"var(--green-bg)", color:"var(--green)", border:"1px solid var(--green-border)", fontWeight:500 }}>
              ● {project.status}
            </span>
            <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"var(--surface-2)", color:"var(--fg-3)", border:"1px solid var(--border)" }}>
              <Users size={9} style={{ display:"inline", marginRight:3 }}/>{project.team}
            </span>
          </div>

          <p style={{ fontSize:13, color:"var(--fg-3)", lineHeight:1.8, marginBottom:18 }}>
            {project.desc}
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:20 }}>
            {project.highlights?.map((h,j)=>(
              <motion.div key={j}
                initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:j*0.08, duration:0.3 }}
                style={{ display:"flex", gap:9, alignItems:"flex-start" }}
              >
                <div style={{ width:17, height:17, borderRadius:"50%", flexShrink:0, marginTop:2,
                  background:`${project.accent}18`, border:`1px solid ${project.accent}45`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowUpRight size={9} color={project.accent}/>
                </div>
                <span style={{ fontSize:12, color:"var(--fg-2)", lineHeight:1.65 }}>{h}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:20 }}>
            {project.tags?.map(t=>(
              <span key={t} style={{ fontSize:10, padding:"3px 9px", borderRadius:5, background:"var(--surface-2)", color:"var(--fg-3)", border:"1px solid var(--border)" }}>{t}</span>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary" style={{ fontSize:12, padding:"7px 14px" }}>
              <Github size={13}/> View Code
            </a>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:12 }}>
              <TrendingUp size={12} color={project.accent}/>
              <span style={{ color:project.accent, fontWeight:600 }}>{project.impact}</span>
            </div>
          </div>
        </motion.div>

        {/* MOCKUP */}
        <motion.div style={{ y: mockupY }} className="proj-mockup">
          <motion.div
            animate={{ y:[0,-10,0] }}
            transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
            whileHover={{ scale:1.015 }}
          >
            <BrowserFrame accent={project.accent} url={getProjectUrl(project.name)}>
              <Mockup/>
            </BrowserFrame>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/projects").then(r=>r.json()).then(d=>{ setProjects(d); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!projects.length) return;
    const obs: IntersectionObserver[] = [];
    sectionsRef.current.forEach((el,i) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setActiveIdx(i); }, { threshold:0.4 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o=>o.disconnect());
  }, [projects]);

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:0.75, ease:"linear" }}
        style={{ width:20, height:20, border:"2px solid var(--border)", borderTopColor:"var(--primary)", borderRadius:"50%" }}/>
    </div>
  );

  return (
    <>
      {/* Inject all CSS vars + layout classes once */}
      <style>{MOCKUP_STYLE}</style>

      {/* Scroll indicator dots */}
      <div className="scroll-dots" style={{ position:"fixed", right:20, top:"50%", transform:"translateY(-50%)", zIndex:200, display:"flex", flexDirection:"column", gap:10 }}>
        {projects.map((p,i)=>(
          <button key={p.id}
            onClick={()=>sectionsRef.current[i]?.scrollIntoView({ behavior:"smooth", block:"center" })}
            style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center" }}
          >
            <motion.div
              animate={{ scale:activeIdx===i?1.6:1 }}
              style={{ width:7, height:7, borderRadius:"50%", background:activeIdx===i?p.accent:"var(--border-strong)", transition:"background 0.3s" }}
            />
          </button>
        ))}
      </div>

      {/* Header */}
      <div style={{ padding:"28px 40px 0", maxWidth:960, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"var(--primary)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>
            Production Systems
          </p>
          <p style={{ fontSize:13, color:"var(--fg-4)" }}>
            {projects.length} enterprise applications · Scroll to explore
          </p>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
          style={{ marginTop:14, color:"var(--fg-4)" }}>
          <ChevronDown size={16} style={{ animation:"bounce 1.6s ease-in-out infinite" }}/>
        </motion.div>
      </div>

      {/* Sections — ref on the SAME div that ProjectSection uses internally */}
      {projects.map((p,i)=>(
        <div key={p.id} ref={el=>{ sectionsRef.current[i]=el; }}>
          <ProjectSection project={p} index={i} total={projects.length}/>
          {i < projects.length-1 && (
            <div style={{ maxWidth:960, margin:"0 auto", padding:"0 40px" }}>
              <div style={{ height:1, background:"linear-gradient(90deg,transparent,var(--border),transparent)" }}/>
            </div>
          )}
        </div>
      ))}

      {/* Footer */}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"32px 40px", borderTop:"1px solid var(--border)" }}>
        <p style={{ fontSize:12, color:"var(--fg-4)", textAlign:"center" }}>
          All systems built & maintained at AsianLand Strategies Corporation · {projects.length} projects in production
        </p>
      </div>
    </>
  );
}
