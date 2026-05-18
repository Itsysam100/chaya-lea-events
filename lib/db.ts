import { neon } from "@neondatabase/serverless";

export function sql() {
  return neon(process.env.DATABASE_URL!);
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  label: string;
  caption: string;
  position: number;
}

export async function getPhotos(): Promise<Photo[]> {
  const db = sql();
  const rows = await db`
    SELECT id, src, alt, category, label, caption, position
    FROM photos
    ORDER BY category, position
  `;
  return rows as Photo[];
}

export async function getPhotosByCategory(category: string): Promise<Photo[]> {
  const db = sql();
  const rows = await db`
    SELECT id, src, alt, category, label, caption, position
    FROM photos
    WHERE category = ${category}
    ORDER BY position
  `;
  return rows as Photo[];
}
