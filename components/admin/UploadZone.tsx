"use client";

import { useState, useRef } from "react";

const CATEGORIES = [
  { value: "wedding", label: "Weddings" },
  { value: "barmitzvah", label: "Bar & Bat Mitzvahs" },
  { value: "sheva", label: "Sheva Brachot" },
  { value: "engagement", label: "Engagements" },
  { value: "other", label: "Other Events" },
];

interface UploadZoneProps {
  onUploaded: () => void;
  totalPhotos: number;
}

export default function UploadZone({ onUploaded, totalPhotos }: UploadZoneProps) {
  const [draggingOver, setDraggingOver] = useState(false);
  const [category, setCategory] = useState("wedding");
  const [label, setLabel] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList) => {
    if (!files.length) return;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgress(`Uploading ${i + 1} of ${files.length}…`);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("label", label || file.name.replace(/\.[^.]+$/, ""));
      formData.append("caption", caption);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) { console.error("Upload failed for", file.name); }
    }

    setProgress("");
    setUploading(false);
    setLabel("");
    setCaption("");
    onUploaded();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    uploadFiles(e.dataTransfer.files);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-yellow-200 shadow-md">
      <h3
        className="text-2xl text-pink-600 mb-4"
        style={{ fontFamily: "var(--font-great-vibes)" }}
      >
        Upload New Photos
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-pink-700 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-pink-200 rounded-xl px-3 py-2 text-pink-900 focus:outline-none focus:border-pink-400 cursor-pointer"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-pink-700 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
            Event name (optional)
          </label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Cohen Wedding 2026"
            className="w-full border border-pink-200 rounded-xl px-3 py-2 text-pink-900 focus:outline-none focus:border-pink-400"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-pink-700 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
          Caption (optional)
        </label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="A short description shown under the photo…"
          className="w-full border border-pink-200 rounded-xl px-3 py-2 text-pink-900 focus:outline-none focus:border-pink-400"
          style={{ fontFamily: "var(--font-cormorant)" }}
        />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          draggingOver
            ? "border-pink-400 bg-pink-50"
            : "border-pink-200 hover:border-pink-300 hover:bg-pink-50/50"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-pink-500" style={{ fontFamily: "var(--font-cormorant)" }}>{progress}</p>
          </div>
        ) : (
          <>
            <svg className="w-10 h-10 text-pink-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-pink-600 font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
              Drop photos here or click to browse
            </p>
            <p className="text-pink-400 text-sm mt-1" style={{ fontFamily: "var(--font-cormorant)" }}>
              JPG, PNG, WebP — multiple files supported
            </p>
          </>
        )}
      </div>
    </div>
  );
}
