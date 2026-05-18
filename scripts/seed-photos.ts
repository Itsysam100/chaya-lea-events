/**
 * Seed the 12 placeholder photos into Vercel Postgres.
 * Run ONCE after creating the photos table:
 *   npx tsx scripts/seed-photos.ts
 *
 * Requires DATABASE_URL in .env.local
 */
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const db = neon(process.env.DATABASE_URL!);

const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", alt: "Elegant wedding table",    category: "wedding",    label: "Wedding Reception",       caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80", alt: "Outdoor wedding",          category: "wedding",    label: "Garden Wedding",          caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", alt: "Wedding floral",           category: "wedding",    label: "Floral Decor",            caption: "", position: 3 },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", alt: "Bar Mitzvah party",        category: "barmitzvah", label: "Bar Mitzvah",             caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80", alt: "Bat Mitzvah",              category: "barmitzvah", label: "Bat Mitzvah",             caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80", alt: "Sheva Brachot dinner",     category: "sheva",      label: "Sheva Brachot",           caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", alt: "Intimate gathering",       category: "sheva",      label: "Intimate Gathering",      caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=800&q=80", alt: "Engagement celebration",   category: "engagement", label: "Engagement Party",        caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80", alt: "Engagement balloons",      category: "engagement", label: "Engagement Celebration",  caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80", alt: "Special occasion cake",    category: "other",      label: "Special Occasion",        caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", alt: "Private event",            category: "other",      label: "Private Event",           caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", alt: "Birthday celebration",      category: "other",      label: "Birthday Celebration",    caption: "", position: 3 },
];

async function seed() {
  console.log("Creating photos table if not exists…");
  await db`
    CREATE TABLE IF NOT EXISTS photos (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      src TEXT NOT NULL,
      alt TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL,
      label TEXT DEFAULT '',
      caption TEXT DEFAULT '',
      position INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("Seeding", photos.length, "photos…");
  for (const p of photos) {
    await db`
      INSERT INTO photos (src, alt, category, label, caption, position)
      VALUES (${p.src}, ${p.alt}, ${p.category}, ${p.label}, ${p.caption}, ${p.position})
    `;
  }
  console.log("✅  Done.");
}

seed().catch((e) => { console.error(e); process.exit(1); });
