import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const db = getServiceSupabase();
  const formData = await request.formData();
  const file = formData.get("avatar") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "gif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, or WebP." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `avatar.${ext}`;

  // Upload to Supabase Storage bucket "avatars"
  const { error: uploadError } = await db.storage
    .from("avatars")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true, // overwrite existing
    });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  // Get public URL
  const { data: urlData } = db.storage.from("avatars").getPublicUrl(fileName);
  const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`; // cache bust

  // Save URL to profile
  const { data, error: dbError } = await db
    .from("profile")
    .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .single();

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  return NextResponse.json({ avatar_url: avatarUrl, profile: data });
}

export async function DELETE() {
  const db = getServiceSupabase();

  // Remove from storage
  await db.storage.from("avatars").remove(["avatar.jpg", "avatar.png", "avatar.webp"]);

  // Clear URL from profile
  const { data, error } = await db
    .from("profile")
    .update({ avatar_url: null, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, profile: data });
}
