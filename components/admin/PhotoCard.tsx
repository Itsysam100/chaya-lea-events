"use client";

import { useState } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";

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

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id, disabled: !editMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const supabase = createClient();

  const saveField = async (field: keyof Photo, value: string | number) => {
    setSaving(true);
    await supabase.from("photos").update({ [field]: value }).eq("id", photo.id);
    onUpdate(photo.id, { [field]: value } as Partial<Photo>);
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    // Delete from storage if it's a Supabase URL
    if (photo.src.includes("supabase")) {
      const path = photo.src.split("/gallery/")[1];
      if (path) await supabase.storage.from("gallery").remove([path]);
    }
    await supabase.from("photos").delete().eq("id", photo.id);
    onDelete(photo.id);
  };

  const handlePositionBlur = () => {
    const num = parseInt(posInput);
    if (!isNaN(num) && num !== photo.position) {
      saveField("position", num);
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {editMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 bg-white/90 rounded-lg p-1.5 cursor-grab active:cursor-grabbing shadow-sm"
            title="Drag to reorder"
          >
            <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm8-16a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        )}
        {saving && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
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
            className="w-full border border-pink-100 rounded-lg px-2 py-1 text-sm text-pink-900 focus:outline-none focus:border-pink-300"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
          {/* Caption */}
          <textarea
            defaultValue={photo.caption}
            onBlur={(e) => saveField("caption", e.target.value)}
            placeholder="Caption under photo…"
            rows={2}
            className="w-full border border-pink-100 rounded-lg px-2 py-1 text-sm text-pink-900 focus:outline-none focus:border-pink-300 resize-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
          {/* Category + Position row */}
          <div className="flex gap-2">
            <select
              defaultValue={photo.category}
              onChange={(e) => saveField("category", e.target.value)}
              className="flex-1 border border-pink-100 rounded-lg px-2 py-1 text-sm text-pink-900 focus:outline-none focus:border-pink-300 cursor-pointer"
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
                className="w-14 border border-pink-100 rounded-lg px-2 py-1 text-sm text-pink-900 text-center focus:outline-none focus:border-pink-300"
                min={1}
              />
            </div>
          </div>
          {/* Delete */}
          <button
            onClick={handleDelete}
            className={`w-full py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
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
