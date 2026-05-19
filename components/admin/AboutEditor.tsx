"use client";

import { useState, useEffect } from "react";

interface AboutContent {
  heading: string;
  para1: string;
  para2: string;
}

const DEFAULT: AboutContent = {
  heading: "Creating Unforgettable Celebrations",
  para1: "With a passion for detail and a love for beautiful moments, we have been crafting elegant celebrations for families across the community. Every event is a unique story — and we are honoured to help you tell yours.",
  para2: "From intimate sheva brachot gatherings to grand wedding receptions, we bring creativity, care, and calm to every occasion. Your vision is our mission.",
};

export default function AboutEditor() {
  const [content, setContent] = useState<AboutContent>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => setContent(d))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const field = (
    key: keyof AboutContent,
    label: string,
    rows: number = 4
  ) => (
    <div className="mb-5">
      <label
        className="block text-pink-700 font-semibold mb-1.5 text-sm uppercase tracking-wide"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {label}
      </label>
      <textarea
        rows={rows}
        value={content[key]}
        onChange={(e) => setContent((prev) => ({ ...prev, [key]: e.target.value }))}
        className="w-full border border-pink-200 rounded-xl px-4 py-3 text-mahogany resize-none focus:outline-none focus:border-pink-400 transition-colors bg-white text-lg leading-relaxed"
        style={{ fontFamily: "var(--font-cormorant)" }}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-3xl text-pink-600"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            About Text
          </h2>
          <p className="text-pink-400 text-sm mt-0.5" style={{ fontFamily: "var(--font-cormorant)" }}>
            Edit what visitors see in the About Us section
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
            saved
              ? "bg-green-500 text-white"
              : "bg-pink-600 text-white hover:bg-pink-700"
          } disabled:opacity-60`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {field("heading", "Sub-heading", 2)}
      {field("para1", "First Paragraph", 5)}
      {field("para2", "Second Paragraph", 5)}
    </div>
  );
}
