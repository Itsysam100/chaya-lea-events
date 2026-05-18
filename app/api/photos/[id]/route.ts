import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { readPhotos, writePhotos } from "@/lib/photos-store";
import { getSession } from "@/lib/session";

async function requireAdmin() {
  const session = await getSession();
  return !!session.isAdmin;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const photos = await readPhotos();

  const updated = photos.map((p) =>
    p.id === id ? { ...p, ...body } : p
  );
  await writePhotos(updated);

  return NextResponse.json(updated.find((p) => p.id === id));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);

  if (photo?.src?.includes("vercel-storage.com")) {
    try { await del(photo.src); } catch { /* non-fatal */ }
  }

  await writePhotos(photos.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}
