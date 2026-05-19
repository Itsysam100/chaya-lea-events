"use client";

import { useState, useEffect } from "react";

interface Stat {
  value: string;
  label: string;
}

interface AboutContent {
  heading: string;
  para1: string;
  para2: string;
  para3: string;
  photoUrl: string;
  stats: Stat[];
}

const DEFAULT: AboutContent = {
  heading: "Creating Unforgettable Celebrations",
  para1: "With a passion for detail and a love for beautiful moments, we have been crafting elegant celebrations for families across the community. Every event is a unique story — and we are honoured to help you tell yours.",
  para2: "From intimate sheva brachot gatherings to grand wedding receptions, we bring creativity, care, and calm to every occasion. Your vision is our mission.",
  para3: "",
  photoUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "200+", label: "Events Planned" },
    { value: "500+", label: "Happy Clients" },
  ],
};

export default function AboutEditor() {
  const [content, setContent] = useState<AboutContent>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => setContent({ ...DEFAULT, ...d }))
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

  const textField = (
    key: "heading" | "para1" | "para2" | "para3" | "photoUrl",
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
      {rows === 1 ? (
        <input
          type="text"
          value={content[key]}
          onChange={(e) => setContent((prev) => ({ ...prev, [key]: e.target.value }))}
          className="w-full border border-pink-200 rounded-xl px-4 py-3 text-mahogany focus:outline-none focus:border-pink-400 transition-colors bg-white text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        />
      ) : (
        <textarea
          rows={rows}
          value={content[key]}
          onChange={(e) => setContent((prev) => ({ ...prev, [key]: e.target.value }))}
          className="w-full border border-pink-200 rounded-xl px-4 py-3 text-mahogany resize-none focus:outline-none focus:border-pink-400 transition-colors bg-white text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        />
      )}
    </div>
  );

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setContent((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

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

      {/* Text content */}
      {textField("heading", "Sub-heading", 2)}
      {textField("para1", "First Paragraph", 5)}
      {textField("para2", "Second Paragraph", 5)}
      {textField("para3", "Third Paragraph (optional)", 4)}

      {/* Photo */}
      <div className="mb-5">
        <label
          className="block text-pink-700 font-semibold mb-1.5 text-sm uppercase tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Photo URL
        </label>
        <input
          type="text"
          value={content.photoUrl}
          onChange={(e) => setContent((prev) => ({ ...prev, photoUrl: e.target.value }))}
          placeholder="https://..."
          className="w-full border border-pink-200 rounded-xl px-4 py-3 text-mahogany focus:outline-none focus:border-pink-400 transition-colors bg-white text-base"
          style={{ fontFamily: "var(--font-cormorant)" }}
        />
        {content.photoUrl && (
          <img
            src={content.photoUrl}
            alt="Preview"
            className="mt-3 h-32 w-auto rounded-xl object-cover border border-pink-100"
          />
        )}
      </div>

      {/* Stats */}
      <div className="mb-2">
        <p
          className="text-pink-700 font-semibold mb-3 text-sm uppercase tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Stats
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.stats.map((stat, i) => (
            <div key={i} className="border border-pink-100 rounded-xl p-4 bg-pink-50/40">
              <label
                className="block text-pink-500 text-xs font-semibold mb-1 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Stat {i + 1}
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                placeholder="e.g. 10+"
                className="w-full border border-pink-200 rounded-lg px-3 py-2 text-gold font-bold text-xl mb-2 focus:outline-none focus:border-pink-400 bg-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                placeholder="e.g. Years Experience"
                className="w-full border border-pink-200 rounded-lg px-3 py-2 text-muted text-sm focus:outline-none focus:border-pink-400 bg-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
