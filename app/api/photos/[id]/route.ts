import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/session";

async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) return false;
  return true;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const db = sql();

  // Build SET clause dynamically from allowed fields
  const allowed = ["alt", "category", "label", "caption", "position"] as const;
  const entries = Object.entries(body).filter(([k]) => allowed.includes(k as typeof allowed[number]));

  if (entries.length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  // Update each field individually (safe with parameterised neon sql)
  for (const [field, value] of entries) {
    if (field === "alt")      await db`UPDATE photos SET alt      = ${value as string}  WHERE id = ${id}`;
    if (field === "category") await db`UPDATE photos SET category = ${value as string}  WHERE id = ${id}`;
    if (field === "label")    await db`UPDATE photos SET label    = ${value as string}  WHERE id = ${id}`;
    if (field === "caption")  await db`UPDATE photos SET caption  = ${value as string}  WHERE id = ${id}`;
    if (field === "position") await db`UPDATE photos SET position = ${value as number}  WHERE id = ${id}`;
  }

  const rows = await db`SELECT * FROM photos WHERE id = ${id}`;
  return NextResponse.json(rows[0]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = sql();

  // Get src to delete from Blob storage if applicable
  const rows = await db`SELECT src FROM photos WHERE id = ${id}`;
  if (rows.length > 0) {
    const src: string = rows[0].src;
    if (src.includes("vercel-storage.com") || src.includes("blob.vercel")) {
      try {
        const { del } = await import("@vercel/blob");
        await del(src);
      } catch {
        // Non-fatal: blob may already be deleted
      }
    }
  }

  await db`DELETE FROM photos WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
