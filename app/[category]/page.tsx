import { notFound } from "next/navigation";
import { readPhotos } from "@/lib/photos-store";
import CategoryGallery from "@/components/CategoryGallery";

const CATEGORIES: Record<string, string> = {
  weddings: "Weddings",
  "bar-mitzvah": "Bar Mitzvahs",
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

  const allPhotos = await readPhotos().catch(() => []);
  const photos = allPhotos
    .filter((p) => p.category === SLUG_TO_DB[category])
    .sort((a, b) => a.position - b.position);

  return (
    <CategoryGallery
      photos={photos}
      categoryLabel={CATEGORIES[category]}
    />
  );
}
