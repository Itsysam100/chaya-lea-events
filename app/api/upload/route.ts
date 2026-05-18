import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as string;
  const label = (formData.get("label") as string) ?? "";
  const caption = (formData.get("caption") as string) ?? "";

  if (!file || !category) {
    return NextResponse.json({ error: "file and category are required" }, { status: 400 });
  }

  // Upload to Vercel Blob
  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  // Get next position for the category
  const db = sql();
  const posRows = await db`
    SELECT COALESCE(MAX(position), 0) + 1 AS next_pos
    FROM photos WHERE category = ${category}
  `;
  const position = posRows[0].next_pos as number;

  const rows = await db`
    INSERT INTO photos (src, alt, category, label, caption, position)
    VALUES (${blob.url}, ${label}, ${category}, ${label}, ${caption}, ${position})
    RETURNING *
  `;

  return NextResponse.json(rows[0], { status: 201 });
}
