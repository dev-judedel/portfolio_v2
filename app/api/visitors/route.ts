import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

// GET — fetch all visitors (admin only)
export async function GET() {
  const db = getServiceSupabase();
  const { data, error } = await db
    .from("visitors")
    .select("*")
    .order("visited_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — log a new visitor (called from client pages)
export async function POST(request: NextRequest) {
  const db = getServiceSupabase();
  const body = await request.json();

  // Get real IP from Vercel headers
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { error } = await db.from("visitors").insert({
    ip,
    page:       body.page    || "/",
    device:     body.device  || "unknown",
    browser:    body.browser || "unknown",
    os:         body.os      || "unknown",
    visited_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE — clear all visitor logs
export async function DELETE() {
  const db = getServiceSupabase();
  const { error } = await db.from("visitors").delete().neq("id", 0);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
