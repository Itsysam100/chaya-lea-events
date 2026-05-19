"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import PhotoCard from "./PhotoCard";
import UploadZone from "./UploadZone";

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  label: string;
  caption: string;
  position: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "Weddings",
  barmitzvah: "Bar Mitzvahs",
  sheva: "Sheva Brachot",
  engagement: "Engagements",
  other: "Other Events",
};

const ALL_TAB = "all";

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(ALL_TAB);

  const fetchPhotos = useCallback(async () => {
    const res = await fetch("/api/photos");
    const data = await res.json();
    setPhotos(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent, category: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const categoryPhotos = photos.filter((p) => p.category === category);
    const oldIndex = categoryPhotos.findIndex((p) => p.id === active.id);
    const newIndex = categoryPhotos.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(categoryPhotos, oldIndex, newIndex);
    const updated = reordered.map((p, i) => ({ ...p, position: i + 1 }));

    setPhotos((prev) => [
      ...prev.filter((p) => p.category !== category),
      ...updated,
    ]);

    await Promise.all(
      updated.map((p) =>
        fetch(`/api/photos/${p.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ position: p.position }),
        })
      )
    );
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<Photo>) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fields } : p))
    );
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const categories = Object.keys(CATEGORY_LABELS);

  // Which categories to render based on active tab
  const visibleCategories = activeTab === ALL_TAB
    ? categories
    : categories.filter((c) => c === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-4xl sm:text-5xl text-pink-600"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Gallery Manager
          </h1>
          <p
            className="text-pink-500 text-lg"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {photos.length} photos · Chaya Lea Events
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-yellow-600 text-white px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-yellow-700 transition-colors cursor-pointer text-sm sm:text-base"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {showUpload ? "Hide Upload" : "+ Add Photos"}
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors cursor-pointer border text-sm sm:text-base ${
              editMode
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-white text-pink-600 border-pink-300 hover:border-pink-500"
            }`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {editMode ? "✓ Edit Mode ON" : "Edit Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="text-pink-400 text-sm hover:text-pink-600 cursor-pointer transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Upload zone */}
      {showUpload && (
        <div className="mb-8">
          <UploadZone
            totalPhotos={photos.length}
            onUploaded={() => { fetchPhotos(); setShowUpload(false); }}
          />
        </div>
      )}

      {editMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-yellow-700 text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
            Drag the <strong>⠿</strong> handle to reorder, type a number in <strong>#</strong> to set exact position, or tap <strong>Replace photo</strong> to swap the image. Changes save instantly.
          </p>
        </div>
      )}

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab(ALL_TAB)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border whitespace-nowrap ${
            activeTab === ALL_TAB
              ? "bg-pink-600 text-white border-pink-600"
              : "bg-white text-pink-700 border-pink-200 hover:border-pink-400"
          }`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          All ({photos.length})
        </button>
        {categories.map((cat) => {
          const count = photos.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border whitespace-nowrap ${
                activeTab === cat
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-pink-700 border-pink-200 hover:border-pink-400"
              }`}
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {CATEGORY_LABELS[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Category sections */}
      {visibleCategories.map((cat) => {
        const catPhotos = photos
          .filter((p) => p.category === cat)
          .sort((a, b) => a.position - b.position);

        return (
          <div key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2
                className="text-2xl sm:text-3xl text-pink-600"
                style={{ fontFamily: "var(--font-great-vibes)" }}
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <span className="text-pink-400 text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
                ({catPhotos.length} photos)
              </span>
              <div className="flex-1 h-px bg-pink-100" />
            </div>

            {catPhotos.length === 0 ? (
              <p className="text-pink-300 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                No photos yet — upload some above.
              </p>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, cat)}
              >
                <SortableContext
                  items={catPhotos.map((p) => p.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {catPhotos.map((photo) => (
                      <PhotoCard
                        key={photo.id}
                        photo={photo}
                        editMode={editMode}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        );
      })}
    </div>
  );
}
