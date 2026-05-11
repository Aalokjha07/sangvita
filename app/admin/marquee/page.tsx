"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getStoredMarqueeItems, saveStoredMarqueeItems } from "@/lib/adminStorage";

export default function AdminMarqueePage() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(getStoredMarqueeItems());
  }, []);

  const handleAdd = () => {
    const text = window.prompt("Enter the marquee text:");
    if (!text?.trim()) return;
    const next = [text.trim(), ...items];
    setItems(next);
    saveStoredMarqueeItems(next);
  };

  const handleEdit = (index: number) => {
    const text = window.prompt("Edit marquee text:", items[index]);
    if (!text?.trim()) return;
    const next = [...items];
    next[index] = text.trim();
    setItems(next);
    saveStoredMarqueeItems(next);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("Delete this marquee entry?")) return;
    const next = items.filter((_, idx) => idx !== index);
    setItems(next);
    saveStoredMarqueeItems(next);
  };

  return (
    <AdminShell title="Marquee Management" active="marquee">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Marquee</p>
          <h2 className="text-3xl font-bold text-white mt-2">Add, edit, or remove homepage marquee text</h2>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
        >
          Add Marquee
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-200 leading-relaxed">{item}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleEdit(index)}
                className="rounded-full border border-blue-500 px-5 py-2 text-sm text-blue-200 transition hover:bg-blue-500/10"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-300">
          No marquee items are currently configured. Use the Add Marquee button to create announcements.
        </div>
      )}
    </AdminShell>
  );
}
