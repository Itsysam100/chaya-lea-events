"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CATEGORIES = [
  { value: "wedding", label: "Weddings" },
  { value: "barmitzvah", label: "Bar & Bat Mitzvahs" },
  { value: "sheva", label: "Sheva Brachot" },
  { value: "engagement", label: "Engagements" },
  { value: "other", label: "Other Events" },
];

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  label: string;
  caption: string;
  position: number;
}

interface PhotoCardProps {
  photo: Photo;
  editMode: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, fields: Partial<Photo>) => void;
}

export default function PhotoCard({ photo, editMode, onDelete, onUpdate }: PhotoCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [posInput, setPosInput] = useState(String(photo.position));
  const [saving, setSaving] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id, disabled: !editMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const saveField = async (field: keyof Photo, value: string | number) => {
    setSaving(true);
    await fetch(`/api/photos/${photo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    onUpdate(photo.id, { [field]: value } as Partial<Photo>);
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    await fetch(`/api/photos/${photo.id}`, { method: "DELETE" });
    onDelete(photo.id);
  };

  const handlePositionBlur = () => {
    const num = parseInt(posInput);
    if (!isNaN(num) && num !== photo.position) {
      saveField("position", num);
    }
  };

  const handleReplacePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplacing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body: formData });
      const { url } = await res.json();
      await saveField("src", url);
      onUpdate(photo.id, { src: url });
    } finally {
      setReplacing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl overflow-hidden shadow-md border-2 transition-all ${
        isDragging ? "border-pink-400 shadow-xl" : "border-transparent"
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] group">
        <Image
          src={photo.src}
          alt={photo.alt || photo.label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Drag handle */}
        {editMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 bg-white/90 rounded-lg p-2 cursor-grab active:cursor-grabbing shadow-sm touch-none"
            title="Drag to reorder"
          >
            <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm8-16a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        )}

        {(saving || replacing) && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Edit controls */}
      {editMode && (
        <div className="p-3 flex flex-col gap-2 border-t border-pink-50">
          {/* Label / title */}
          <input
            defaultValue={photo.label}
            onBlur={(e) => saveField("label", e.target.value)}
            placeholder="Event name…"
            className="w-full border border-pink-100 rounded-lg px-3 py-2 text-sm text-pink-900 focus:outline-none focus:border-pink-300 min-h-[44px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />

          {/* Caption */}
          <textarea
            defaultValue={photo.caption}
            onBlur={(e) => saveField("caption", e.target.value)}
            placeholder="Caption under photo…"
            rows={2}
            className="w-full border border-pink-100 rounded-lg px-3 py-2 text-sm text-pink-900 focus:outline-none focus:border-pink-300 resize-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />

          {/* Category + Position row */}
          <div className="flex gap-2">
            <select
              defaultValue={photo.category}
              onChange={(e) => saveField("category", e.target.value)}
              className="flex-1 border border-pink-100 rounded-lg px-2 py-2 text-sm text-pink-900 focus:outline-none focus:border-pink-300 cursor-pointer min-h-[44px]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <span className="text-pink-400 text-xs" style={{ fontFamily: "var(--font-cormorant)" }}>#</span>
              <input
                type="number"
                value={posInput}
                onChange={(e) => setPosInput(e.target.value)}
                onBlur={handlePositionBlur}
                className="w-14 border border-pink-100 rounded-lg px-2 py-2 text-sm text-pink-900 text-center focus:outline-none focus:border-pink-300 min-h-[44px]"
                min={1}
              />
            </div>
          </div>

          {/* Replace photo */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleReplacePhoto}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={replacing}
            className="w-full py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700 border border-pink-100 min-h-[44px] flex items-center justify-center gap-1.5"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {replacing ? "Uploading…" : "Replace photo"}
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
              confirmDelete
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-pink-50 text-pink-400 hover:bg-pink-100 hover:text-pink-600"
            }`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {confirmDelete ? "Confirm delete?" : "Delete photo"}
          </button>
          {confirmDelete && (
            <button
              onClick={() => setConfirmDelete(false)}
              className="w-full py-1 text-xs text-pink-300 hover:text-pink-500 cursor-pointer"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* Public view — show label + caption */}
      {!editMode && (photo.label || photo.caption) && (
        <div className="px-3 py-2 border-t border-pink-50">
          {photo.label && (
            <p className="text-pink-800 text-sm font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
              {photo.label}
            </p>
          )}
          {photo.caption && (
            <p className="text-pink-500 text-xs mt-0.5" style={{ fontFamily: "var(--font-cormorant)" }}>
              {photo.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
