import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "about.json");

const DEFAULT = {
  heading: "Creating Unforgettable Celebrations",
  para1: "With a passion for detail and a love for beautiful moments, we have been crafting elegant celebrations for families across the community. Every event is a unique story — and we are honoured to help you tell yours.",
  para2: "From intimate sheva brachot gatherings to grand wedding receptions, we bring creativity, care, and calm to every occasion. Your vision is our mission.",
};

function readData() {
  try {
    if (!existsSync(DATA_FILE)) return DEFAULT;
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return DEFAULT;
  }
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) mkdirSync(dataDir);
    writeFileSync(DATA_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
