"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Plus, Pencil, Trash2, Save, X, Loader2,
  User, FolderKanban, Wrench, Briefcase, Award,
  Camera, Upload, ImageOff, Eye
} from "lucide-react";
import type { Profile, Project, Skill, Experience, Award as AwardType } from "@/lib/types";

type Tab = "profile" | "projects" | "skills" | "experience" | "awards" | "visitors";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile",    label: "Profile",    icon: User },
  { id: "projects",   label: "Projects",   icon: FolderKanban },
  { id: "skills",     label: "Skills",     icon: Wrench },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "awards",     label: "Awards",     icon: Award },
  { id: "visitors",   label: "Visitors",   icon: Eye },
];

/* ── Small reusable components ───────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "8px 11px",
  background: "var(--bg)", border: "1px solid var(--border)",
  borderRadius: "6px", fontSize: "13px", color: "var(--fg)",
  fontFamily: "inherit", outline: "none",
};

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)} style={inputStyle}
      onFocus={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea value={value} rows={rows} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, resize: "vertical" }}
      onFocus={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <div onClick={() => onChange(!value)} style={{
        width: 36, height: 20, borderRadius: 10, position: "relative",
        background: value ? "var(--green)" : "var(--border)", transition: "background 0.15s",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 2, left: value ? 18 : 2,
          width: 16, height: 16, borderRadius: "50%",
          background: "#fff", transition: "left 0.15s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
      <span style={{ fontSize: "13px", color: "var(--fg-2)" }}>{label}</span>
    </label>
  );
}

/* Array field: comma-separated editing */
function ArrayField({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const text = value.join("\n");
  return (
    <Field label={`${label} (one per line)`}>
      <Textarea value={text} rows={4} placeholder={placeholder}
        onChange={v => onChange(v.split("\n").map(s => s.trimStart()).filter(Boolean))}
      />
    </Field>
  );
}

/* ── Main Admin Page ─────────────────────────────────────── */

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  function showNotice(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3000);
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <header style={{
        height: 56, borderBottom: "1px solid var(--border)",
        background: "var(--surface)", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 28, height: 28, borderRadius: "6px", background: "var(--accent)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>JD</div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>Portfolio Admin</p>
            <p style={{ fontSize: "11px", color: "var(--fg-4)" }}>Content Management</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {notice && <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: 500 }}>{notice}</span>}
          <button onClick={logout} className="btn btn-secondary" style={{ fontSize: "12px", padding: "5px 12px" }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar tabs */}
        <nav style={{ width: 200, borderRight: "1px solid var(--border)", background: "var(--surface)", padding: "12px 8px", flexShrink: 0 }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: "flex", alignItems: "center", gap: "8px",
              width: "100%", padding: "8px 10px", borderRadius: "6px", marginBottom: "2px",
              background: tab === id ? "var(--bg)" : "transparent",
              border: tab === id ? "1px solid var(--border)" : "1px solid transparent",
              color: tab === id ? "var(--fg)" : "var(--fg-3)",
              fontSize: "13px", fontWeight: tab === id ? 500 : 400,
              cursor: "pointer", textAlign: "left",
              transition: "all 0.12s",
            }}>
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={{ flex: 1, padding: "24px", maxWidth: 820, overflowY: "auto" }}>
          {tab === "profile"    && <ProfileTab saving={saving} setSaving={setSaving} onSave={showNotice} />}
          {tab === "projects"   && <ProjectsTab saving={saving} setSaving={setSaving} onSave={showNotice} />}
          {tab === "skills"     && <SkillsTab saving={saving} setSaving={setSaving} onSave={showNotice} />}
          {tab === "experience" && <ExperienceTab saving={saving} setSaving={setSaving} onSave={showNotice} />}
          {tab === "awards"     && <AwardsTab saving={saving} setSaving={setSaving} onSave={showNotice} />}
          {tab === "visitors"   && <VisitorsTab />}
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROFILE TAB
══════════════════════════════════════════════ */
function ProfileTab({ saving, setSaving, onSave }: { saving: boolean; setSaving: (v: boolean) => void; onSave: (m: string) => void }) {
  const [form, setForm] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(d => {
      setForm(d);
      setAvatarPreview(d.avatar_url ?? null);
      setLoading(false);
    });
  }, []);

  function set(key: keyof Profile, val: string | boolean) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Local preview
    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    // Upload
    setAvatarUploading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    const res = await fetch("/api/profile/avatar", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      setAvatarPreview(data.avatar_url);
      setForm(prev => ({ ...prev, avatar_url: data.avatar_url }));
      onSave("✓ Photo updated");
    }
    setAvatarUploading(false);
  }

  async function removeAvatar() {
    if (!confirm("Remove profile photo?")) return;
    setAvatarUploading(true);
    await fetch("/api/profile/avatar", { method: "DELETE" });
    setAvatarPreview(null);
    setForm(prev => ({ ...prev, avatar_url: null }));
    setAvatarUploading(false);
    onSave("✓ Photo removed");
  }

  async function save() {
    setSaving(true);
    await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    onSave("✓ Profile saved");
  }

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader title="Profile" desc="Your name, bio, and contact info shown across the portfolio" />

      {/* ── Avatar upload ── */}
      <div className="card" style={{ padding: "18px 20px", marginBottom: "12px", display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="Profile" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)" }} />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--border)" }}>
              <User size={28} color="#fff" />
            </div>
          )}
          {avatarUploading && (
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Loader2 size={18} color="#fff" style={{ animation: "spin 1s linear infinite" }} />
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)", marginBottom: "4px" }}>Profile Photo</p>
          <p style={{ fontSize: "12px", color: "var(--fg-4)", marginBottom: "10px" }}>JPG, PNG or WebP · Max 5MB · Shown in sidebar and dashboard</p>
          <div style={{ display: "flex", gap: "6px" }}>
            <label style={{ cursor: "pointer" }}>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} style={{ display: "none" }} />
              <span className="btn btn-secondary" style={{ fontSize: "12px", padding: "5px 12px", pointerEvents: "none" }}>
                <Upload size={13} /> Upload Photo
              </span>
            </label>
            {avatarPreview && (
              <button onClick={removeAvatar} className="btn" style={{ fontSize: "12px", padding: "5px 10px", color: "var(--red)", border: "1px solid var(--red-border)", background: "var(--red-bg)" }}>
                <ImageOff size={13} /> Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Field label="Full Name"><Input value={form.name || ""} onChange={v => set("name", v)} /></Field>
          <Field label="Title / Role"><Input value={form.title || ""} onChange={v => set("title", v)} /></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Field label="Email"><Input value={form.email || ""} onChange={v => set("email", v)} type="email" /></Field>
          <Field label="Phone"><Input value={form.phone || ""} onChange={v => set("phone", v)} /></Field>
        </div>
        <Field label="Location"><Input value={form.location || ""} onChange={v => set("location", v)} /></Field>
        <Field label="Bio (paragraph 1)"><Textarea value={form.bio || ""} onChange={v => set("bio", v)} /></Field>
        <Field label="Bio (paragraph 2)"><Textarea value={form.bio2 || ""} onChange={v => set("bio2", v)} /></Field>
        <Field label="Bio (paragraph 3)"><Textarea value={form.bio3 || ""} onChange={v => set("bio3", v)} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Field label="GitHub URL"><Input value={form.github || ""} onChange={v => set("github", v)} /></Field>
          <Field label="LinkedIn URL"><Input value={form.linkedin || ""} onChange={v => set("linkedin", v)} /></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Field label="Portfolio URL"><Input value={form.portfolio || ""} onChange={v => set("portfolio", v)} /></Field>
          <Field label="Years Experience (display)"><Input value={form.years_experience || ""} onChange={v => set("years_experience", v)} placeholder="8+" /></Field>
        </div>
        <Toggle value={form.available ?? true} onChange={v => set("available", v)} label="Available for work" />
        <SaveBar saving={saving} onSave={save} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECTS TAB
══════════════════════════════════════════════ */
const emptyProject = (): Partial<Project> => ({
  index: "", name: "", desc: "", highlights: [], tags: [],
  status: "Production", team: "", impact: "", accent: "var(--blue)", github: "", sort_order: 0,
});

function ProjectsTab({ saving, setSaving, onSave }: { saving: boolean; setSaving: (v: boolean) => void; onSave: (m: string) => void }) {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/projects").then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  function startNew() { setEditing(emptyProject()); setIsNew(true); }
  function startEdit(p: Project) { setEditing({ ...p }); setIsNew(false); }
  function cancel() { setEditing(null); }

  async function save() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    } else {
      await fetch(`/api/projects/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    }
    setSaving(false);
    setEditing(null);
    load();
    onSave(isNew ? "✓ Project added" : "✓ Project updated");
  }

  async function del(id: number) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
    onSave("✓ Project deleted");
  }

  function set<K extends keyof Project>(key: K, val: Project[K]) {
    setEditing(prev => prev ? { ...prev, [key]: val } : prev);
  }

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader title="Projects" desc={`${items.length} projects`} action={<button className="btn btn-primary" style={{ fontSize: "12px", padding: "5px 12px" }} onClick={startNew}><Plus size={13} /> Add Project</button>} />

      {editing && (
        <div className="card" style={{ padding: "20px", marginBottom: "16px", border: "1px solid var(--blue)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{isNew ? "New Project" : "Edit Project"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "12px" }}>
            <Field label="Index"><Input value={editing.index || ""} onChange={v => set("index", v)} placeholder="01" /></Field>
            <Field label="Name"><Input value={editing.name || ""} onChange={v => set("name", v)} /></Field>
          </div>
          <Field label="Description"><Textarea value={editing.desc || ""} onChange={v => set("desc", v)} rows={3} /></Field>
          <ArrayField label="Highlights" value={editing.highlights || []} onChange={v => set("highlights", v)} placeholder="Led 4-developer team&#10;60% faster billing&#10;Zero manual passes" />
          <ArrayField label="Tech Tags" value={editing.tags || []} onChange={v => set("tags", v)} placeholder="PHP&#10;MySQL&#10;Laravel" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            <Field label="Status"><Input value={editing.status || ""} onChange={v => set("status", v)} placeholder="Production" /></Field>
            <Field label="Team"><Input value={editing.team || ""} onChange={v => set("team", v)} placeholder="4 devs" /></Field>
            <Field label="Impact"><Input value={editing.impact || ""} onChange={v => set("impact", v)} placeholder="60% faster" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: "12px" }}>
            <Field label="GitHub URL"><Input value={editing.github || ""} onChange={v => set("github", v)} /></Field>
            <Field label="Accent Color"><Input value={editing.accent || ""} onChange={v => set("accent", v)} placeholder="var(--blue)" /></Field>
            <Field label="Order"><Input value={String(editing.sort_order ?? 0)} onChange={v => set("sort_order", Number(v))} type="number" /></Field>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-primary" onClick={save} disabled={saving} style={{ fontSize: "12px" }}>
              {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={13} />} Save
            </button>
            <button className="btn btn-secondary" onClick={cancel} style={{ fontSize: "12px" }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map(p => (
          <div key={p.id} className="card" style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--fg-4)" }}>{p.index}</span>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                <span className="badge badge-green" style={{ fontSize: "10px" }}>{p.status}</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "2px" }}>{p.tags?.join(" · ")}</p>
            </div>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <button className="btn btn-secondary" onClick={() => startEdit(p)} style={{ padding: "4px 10px", fontSize: "12px" }}><Pencil size={12} /> Edit</button>
              <button onClick={() => del(p.id)} style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fff1f2", color: "#ef4444", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SKILLS TAB
══════════════════════════════════════════════ */
const emptySkill = (): Partial<Skill> => ({
  category: "", accent: "var(--blue)", name: "", level: "Advanced", note: "", icon: "⚡", sort_order: 0,
});

function SkillsTab({ saving, setSaving, onSave }: { saving: boolean; setSaving: (v: boolean) => void; onSave: (m: string) => void }) {
  const [items, setItems] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/skills").then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  function startNew() { setEditing(emptySkill()); setIsNew(true); }
  function startEdit(s: Skill) { setEditing({ ...s }); setIsNew(false); }
  function cancel() { setEditing(null); }

  async function save() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    } else {
      await fetch(`/api/skills/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    }
    setSaving(false);
    setEditing(null);
    load();
    onSave(isNew ? "✓ Skill added" : "✓ Skill updated");
  }

  async function del(id: number) {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    load();
    onSave("✓ Skill deleted");
  }

  function set<K extends keyof Skill>(key: K, val: Skill[K]) {
    setEditing(prev => prev ? { ...prev, [key]: val } : prev);
  }

  // Group by category for display
  const grouped = items.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader title="Skills" desc={`${items.length} skills across ${Object.keys(grouped).length} categories`} action={<button className="btn btn-primary" style={{ fontSize: "12px", padding: "5px 12px" }} onClick={startNew}><Plus size={13} /> Add Skill</button>} />

      {editing && (
        <div className="card" style={{ padding: "20px", marginBottom: "16px", border: "1px solid var(--blue)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{isNew ? "New Skill" : "Edit Skill"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Category"><Input value={editing.category || ""} onChange={v => set("category", v)} placeholder="Backend Development" /></Field>
            <Field label="Accent Color"><Input value={editing.accent || ""} onChange={v => set("accent", v)} placeholder="var(--blue)" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "12px" }}>
            <Field label="Icon (emoji)"><Input value={editing.icon || ""} onChange={v => set("icon", v)} placeholder="🐍" /></Field>
            <Field label="Skill Name"><Input value={editing.name || ""} onChange={v => set("name", v)} placeholder="Python" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: "12px" }}>
            <Field label="Note / Sub-skills"><Input value={editing.note || ""} onChange={v => set("note", v)} placeholder="Flask · Django · Pandas" /></Field>
            <Field label="Level">
              <select value={editing.level} onChange={e => set("level", e.target.value as Skill["level"])} style={{ ...inputStyle }}>
                <option value="Expert">Expert</option>
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
              </select>
            </Field>
            <Field label="Order"><Input value={String(editing.sort_order ?? 0)} onChange={v => set("sort_order", Number(v))} type="number" /></Field>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-primary" onClick={save} disabled={saving} style={{ fontSize: "12px" }}>
              {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={13} />} Save
            </button>
            <button className="btn btn-secondary" onClick={cancel} style={{ fontSize: "12px" }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([cat, skills]) => (
        <div key={cat} style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{cat}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {skills.map(s => (
              <div key={s.id} className="card" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <span style={{ fontSize: "16px" }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg)" }}>{s.name}</p>
                    <p style={{ fontSize: "11px", color: "var(--fg-4)" }}>{s.note}</p>
                  </div>
                  <span className={`badge badge-${s.level === "Expert" ? "green" : s.level === "Advanced" ? "blue" : "gray"}`} style={{ fontSize: "10px" }}>{s.level}</span>
                </div>
                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button className="btn btn-secondary" onClick={() => startEdit(s)} style={{ padding: "4px 10px", fontSize: "12px" }}><Pencil size={12} /></button>
                  <button onClick={() => del(s.id)} style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fff1f2", color: "#ef4444", cursor: "pointer" }}><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   EXPERIENCE TAB
══════════════════════════════════════════════ */
const emptyExp = (): Partial<Experience> => ({
  title: "", org: "", period: "", duration: "", current: false, points: [], tags: [], sort_order: 0,
});

function ExperienceTab({ saving, setSaving, onSave }: { saving: boolean; setSaving: (v: boolean) => void; onSave: (m: string) => void }) {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/experience").then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  function startNew() { setEditing(emptyExp()); setIsNew(true); }
  function startEdit(e: Experience) { setEditing({ ...e }); setIsNew(false); }
  function cancel() { setEditing(null); }

  async function save() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/experience", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    } else {
      await fetch(`/api/experience/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    }
    setSaving(false);
    setEditing(null);
    load();
    onSave(isNew ? "✓ Experience added" : "✓ Experience updated");
  }

  async function del(id: number) {
    if (!confirm("Delete this experience entry?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    load();
    onSave("✓ Experience deleted");
  }

  function set<K extends keyof Experience>(key: K, val: Experience[K]) {
    setEditing(prev => prev ? { ...prev, [key]: val } : prev);
  }

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader title="Experience" desc={`${items.length} entries`} action={<button className="btn btn-primary" style={{ fontSize: "12px", padding: "5px 12px" }} onClick={startNew}><Plus size={13} /> Add Entry</button>} />

      {editing && (
        <div className="card" style={{ padding: "20px", marginBottom: "16px", border: "1px solid var(--blue)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{isNew ? "New Experience" : "Edit Experience"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Job Title"><Input value={editing.title || ""} onChange={v => set("title", v)} /></Field>
            <Field label="Organization"><Input value={editing.org || ""} onChange={v => set("org", v)} /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: "12px" }}>
            <Field label="Period"><Input value={editing.period || ""} onChange={v => set("period", v)} placeholder="2017 – Present" /></Field>
            <Field label="Duration"><Input value={editing.duration || ""} onChange={v => set("duration", v)} placeholder="8+ years" /></Field>
            <Field label="Order"><Input value={String(editing.sort_order ?? 0)} onChange={v => set("sort_order", Number(v))} type="number" /></Field>
          </div>
          <Toggle value={editing.current ?? false} onChange={v => set("current", v)} label="Current position" />
          <ArrayField label="Key Points" value={editing.points || []} onChange={v => set("points", v)} placeholder="Led a team of developers&#10;Architected full-stack applications" />
          <ArrayField label="Tech Tags" value={editing.tags || []} onChange={v => set("tags", v)} placeholder="Python&#10;PHP&#10;MySQL" />
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-primary" onClick={save} disabled={saving} style={{ fontSize: "12px" }}>
              {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={13} />} Save
            </button>
            <button className="btn btn-secondary" onClick={cancel} style={{ fontSize: "12px" }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map(e => (
          <div key={e.id} className="card" style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{e.title}</p>
                {e.current && <span className="badge badge-green" style={{ fontSize: "10px" }}>Current</span>}
              </div>
              <p style={{ fontSize: "11px", color: "var(--fg-3)" }}>{e.org} · {e.period}</p>
            </div>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <button className="btn btn-secondary" onClick={() => startEdit(e)} style={{ padding: "4px 10px", fontSize: "12px" }}><Pencil size={12} /> Edit</button>
              <button onClick={() => del(e.id)} style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fff1f2", color: "#ef4444", cursor: "pointer" }}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   AWARDS TAB
══════════════════════════════════════════════ */
const emptyAward = (): Partial<AwardType> => ({ title: "", sub: "", year: "", org: "", sort_order: 0 });

function AwardsTab({ saving, setSaving, onSave }: { saving: boolean; setSaving: (v: boolean) => void; onSave: (m: string) => void }) {
  const [items, setItems] = useState<AwardType[]>([]);
  const [editing, setEditing] = useState<Partial<AwardType> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/awards").then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  function startNew() { setEditing(emptyAward()); setIsNew(true); }
  function startEdit(a: AwardType) { setEditing({ ...a }); setIsNew(false); }
  function cancel() { setEditing(null); }

  async function save() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/awards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    } else {
      await fetch(`/api/awards/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    }
    setSaving(false);
    setEditing(null);
    load();
    onSave(isNew ? "✓ Award added" : "✓ Award updated");
  }

  async function del(id: number) {
    if (!confirm("Delete this award?")) return;
    await fetch(`/api/awards/${id}`, { method: "DELETE" });
    load();
    onSave("✓ Award deleted");
  }

  function set<K extends keyof AwardType>(key: K, val: AwardType[K]) {
    setEditing(prev => prev ? { ...prev, [key]: val } : prev);
  }

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader title="Awards" desc={`${items.length} awards`} action={<button className="btn btn-primary" style={{ fontSize: "12px", padding: "5px 12px" }} onClick={startNew}><Plus size={13} /> Add Award</button>} />

      {editing && (
        <div className="card" style={{ padding: "20px", marginBottom: "16px", border: "1px solid var(--blue)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{isNew ? "New Award" : "Edit Award"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Award Title"><Input value={editing.title || ""} onChange={v => set("title", v)} placeholder="Supervisor of the Year" /></Field>
            <Field label="Sub-title"><Input value={editing.sub || ""} onChange={v => set("sub", v)} placeholder="IT Supervisor" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: "12px" }}>
            <Field label="Organization"><Input value={editing.org || ""} onChange={v => set("org", v)} /></Field>
            <Field label="Year"><Input value={editing.year || ""} onChange={v => set("year", v)} placeholder="2024" /></Field>
            <Field label="Order"><Input value={String(editing.sort_order ?? 0)} onChange={v => set("sort_order", Number(v))} type="number" /></Field>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-primary" onClick={save} disabled={saving} style={{ fontSize: "12px" }}>
              {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={13} />} Save
            </button>
            <button className="btn btn-secondary" onClick={cancel} style={{ fontSize: "12px" }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map(a => (
          <div key={a.id} className="card" style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)" }}>{a.title} <span style={{ color: "var(--fg-4)", fontWeight: 400 }}>· {a.year}</span></p>
              <p style={{ fontSize: "11px", color: "var(--fg-3)" }}>{a.sub} · {a.org}</p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="btn btn-secondary" onClick={() => startEdit(a)} style={{ padding: "4px 10px", fontSize: "12px" }}><Pencil size={12} /> Edit</button>
              <button onClick={() => del(a.id)} style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fff1f2", color: "#ef4444", cursor: "pointer" }}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Shared helpers ───────────────────────────────────────── */

function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Loader2 size={20} color="var(--fg-4)" style={{ animation: "spin 1s linear infinite" }} />
    </div>
  );
}

function SectionHeader({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
      <div>
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)" }}>{title}</h2>
        <p style={{ fontSize: "12px", color: "var(--fg-3)", marginTop: "2px" }}>{desc}</p>
      
      </div>
      {action}
    </div>
  );
}

function SaveBar({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
      <button className="btn btn-primary" onClick={onSave} disabled={saving} style={{ fontSize: "13px" }}>
        {saving ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={14} />}
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   VISITORS TAB
══════════════════════════════════════════════ */
type Visitor = {
  id: number;
  ip: string;
  page: string;
  device: string;
  browser: string;
  os: string;
  visited_at: string;
};

function VisitorsTab() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = useCallback(() => {
    fetch("/api/visitors").then(r => r.json()).then(d => {
      setVisitors(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => { load(); }, [load]);

  async function clearAll() {
    if (!confirm("Delete all visitor logs? This cannot be undone.")) return;
    await fetch("/api/visitors", { method: "DELETE" });
    load();
  }

  const filtered = visitors.filter(v =>
    !filter ||
    v.ip?.includes(filter) ||
    v.page?.toLowerCase().includes(filter.toLowerCase()) ||
    v.browser?.toLowerCase().includes(filter.toLowerCase()) ||
    v.os?.toLowerCase().includes(filter.toLowerCase())
  );

  // Stats
  const uniqueIPs = new Set(visitors.map(v => v.ip)).size;
  const pages = visitors.reduce((acc, v) => { acc[v.page] = (acc[v.page] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topPage = Object.entries(pages).sort((a, b) => b[1] - a[1])[0];

  if (loading) return <Loader />;

  return (
    <div>
      <SectionHeader
        title="Visitors"
        desc={`${visitors.length} total visits · ${uniqueIPs} unique IPs`}
        action={
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Filter by IP, page, browser…"
              style={{ ...inputStyle, width: 220, fontSize: "12px", padding: "5px 10px" }}
            />
            <button onClick={load} className="btn btn-secondary" style={{ fontSize: "12px", padding: "5px 10px" }}>Refresh</button>
            {visitors.length > 0 && (
              <button onClick={clearAll} style={{ fontSize: "12px", padding: "5px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fff1f2", color: "#ef4444", cursor: "pointer" }}>Clear All</button>
            )}
          </div>
        }
      />

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
        {[
          { label: "Total Visits",  value: visitors.length },
          { label: "Unique IPs",    value: uniqueIPs },
          { label: "Top Page",      value: topPage ? `${topPage[0]} (${topPage[1]})` : "—" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 16px" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)" }}>{s.value}</p>
            <p style={{ fontSize: "11px", color: "var(--fg-4)", marginTop: "2px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--fg-4)", fontSize: "13px" }}>
          {filter ? "No results match your filter." : "No visitors logged yet. Visits will appear here automatically."}
        </div>
      ) : (
        <div className="card" style={{ overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 110px 1fr 160px 130px", gap: "12px", padding: "10px 16px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
            {["Timestamp", "IP Address", "Page", "Browser", "OS"].map(h => (
              <span key={h} style={{ fontSize: "10px", fontWeight: 600, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
            ))}
          </div>
          {/* Rows */}
          {filtered.map((v, i) => (
            <div key={v.id} style={{
              display: "grid", gridTemplateColumns: "130px 110px 1fr 160px 130px",
              gap: "12px", padding: "10px 16px",
              borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: "12px",
            }}>
              <span style={{ color: "var(--fg-3)", fontSize: "11px" }}>
                {new Date(v.visited_at).toLocaleString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </span>
              <span style={{ color: "var(--fg)", fontFamily: "monospace", fontSize: "11px" }}>{v.ip || "—"}</span>
              <span style={{ color: "var(--primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.page}</span>
              <span style={{ color: "var(--fg-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.browser || "—"}</span>
              <span style={{ color: "var(--fg-3)" }}>{v.os || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
