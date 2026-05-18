import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const db = sql();
  const rows = await db`
    SELECT id, src, alt, category, label, caption, position
    FROM photos ORDER BY category, position
  `;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { src, alt = "", category, label = "", caption = "", position = 0 } = body;

  const db = sql();
  const rows = await db`
    INSERT INTO photos (src, alt, category, label, caption, position)
    VALUES (${src}, ${alt}, ${category}, ${label}, ${caption}, ${position})
    RETURNING *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
