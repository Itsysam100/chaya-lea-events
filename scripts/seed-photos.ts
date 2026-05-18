/**
 * Run once to seed the 12 placeholder photos into Supabase.
 * Usage: npx ts-node --project tsconfig.json -e "require('./scripts/seed-photos')"
 * Or:    npx tsx scripts/seed-photos.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || supabaseUrl.includes("your-project")) {
  console.error("❌  Set real Supabase credentials in .env.local first.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", alt: "Elegant wedding table",     category: "wedding",     label: "Wedding Reception",       caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80", alt: "Outdoor wedding",           category: "wedding",     label: "Garden Wedding",          caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", alt: "Wedding floral",            category: "wedding",     label: "Floral Decor",            caption: "", position: 3 },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", alt: "Bar Mitzvah party",         category: "barmitzvah", label: "Bar Mitzvah",             caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80", alt: "Bat Mitzvah",               category: "barmitzvah", label: "Bat Mitzvah",             caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80", alt: "Sheva Brachot dinner",      category: "sheva",       label: "Sheva Brachot",           caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", alt: "Intimate gathering",        category: "sheva",       label: "Intimate Gathering",      caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=800&q=80", alt: "Engagement celebration",    category: "engagement",  label: "Engagement Party",        caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80", alt: "Engagement balloons",       category: "engagement",  label: "Engagement Celebration",  caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80", alt: "Special occasion cake",     category: "other",       label: "Special Occasion",        caption: "", position: 1 },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", alt: "Private event",             category: "other",       label: "Private Event",           caption: "", position: 2 },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", alt: "Birthday celebration",       category: "other",       label: "Birthday Celebration",    caption: "", position: 3 },
];

async function seed() {
  console.log("Seeding", photos.length, "photos...");
  const { error } = await supabase.from("photos").insert(photos);
  if (error) {
    console.error("❌  Insert failed:", error.message);
    process.exit(1);
  }
  console.log("✅  Seeded successfully.");
}

seed();
