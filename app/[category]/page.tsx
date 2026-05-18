import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CategoryGallery from "@/components/CategoryGallery";

const CATEGORIES: Record<string, string> = {
  weddings: "Weddings",
  "bar-mitzvah": "Bar & Bat Mitzvahs",
  sheva: "Sheva Brachot",
  engagement: "Engagement Parties",
  other: "Other Events",
};

// Map URL slug → DB category value
const SLUG_TO_DB: Record<string, string> = {
  weddings: "wedding",
  "bar-mitzvah": "barmitzvah",
  sheva: "sheva",
  engagement: "engagement",
  other: "other",
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const label = CATEGORIES[category];
  if (!label) return {};
  return {
    title: `${label} | Chaya Lea Rabinovitz`,
    description: `Browse ${label.toLowerCase()} planned by Chaya Lea Rabinovitz.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!CATEGORIES[category]) notFound();

  const supabase = await createClient();
  const { data: photos } = await supabase
    .from("photos")
    .select("id, src, alt, label, caption, position")
    .eq("category", SLUG_TO_DB[category])
    .order("position");

  return (
    <CategoryGallery
      photos={photos ?? []}
      categoryLabel={CATEGORIES[category]}
    />
  );
}
