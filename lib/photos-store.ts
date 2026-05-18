import { put, list, del } from "@vercel/blob";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  label: string;
  caption: string;
  position: number;
}

const PHOTOS_PATH = "photos.json";

export async function readPhotos(): Promise<Photo[]> {
  try {
    const { blobs } = await list({ prefix: PHOTOS_PATH });
    const blob = blobs.find((b) => b.pathname === PHOTOS_PATH);
    if (!blob) return [];
    const res = await fetch(blob.url, { cache: "no-store" });
    return await res.json();
  } catch {
    return [];
  }
}

export async function writePhotos(photos: Photo[]): Promise<void> {
  // Delete all existing versions of photos.json
  const { blobs } = await list({ prefix: PHOTOS_PATH });
  const existing = blobs.filter((b) => b.pathname === PHOTOS_PATH);
  if (existing.length > 0) {
    await del(existing.map((b) => b.url));
  }

  await put(PHOTOS_PATH, JSON.stringify(photos), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}
