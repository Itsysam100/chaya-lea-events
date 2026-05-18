import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { readPhotos, writePhotos } from "@/lib/photos-store";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as string;
  const label = (formData.get("label") as string) || file?.name?.replace(/\.[^.]+$/, "") || "";
  const caption = (formData.get("caption") as string) || "";

  if (!file || !category) {
    return NextResponse.json({ error: "file and category are required" }, { status: 400 });
  }

  // Upload image to Vercel Blob
  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  // Add to photos list
  const photos = await readPhotos();
  const categoryPhotos = photos.filter((p) => p.category === category);
  const newPhoto = {
    id: crypto.randomUUID(),
    src: blob.url,
    alt: label,
    category,
    label,
    caption,
    position: categoryPhotos.length + 1,
  };

  await writePhotos([...photos, newPhoto]);
  return NextResponse.json(newPhoto, { status: 201 });
}
