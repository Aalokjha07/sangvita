"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

type AdminArticleFormProps = {
  article?: {
    _id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
  };
  submitLabel: string;
  onSave: (article: any) => void;
};

const AdminArticleForm = ({ article, submitLabel, onSave }: AdminArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Research");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setCategory(article.category);
      setImages(article.images || []);
    }
  }, [article]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError("");

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const data = await response.json();
        setImages((prev) => [...prev, data.secure_url]);
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (images.length === 0) {
      setUploadError("Please upload at least one article image.");
      return;
    }

    setUploading(true);

    try {
      const articleData = {
        title: title.trim() || "Untitled Article",
        description: description.trim() || "No description provided",
        category: category,
        images: images,
      };

      let response;
      if (article?._id) {
        // Update existing article
        response = await fetch(`/api/articles/${article._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleData),
        });
      } else {
        // Create new article
        response = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save article");
      }

      const savedArticle = await response.json();
      onSave(savedArticle);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Failed to save article");
      console.error("Save error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          <span className="font-semibold">Article Title *</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Advancements in Molecular Biology"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-semibold">Category *</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          >
            <option value="Research">Research</option>
            <option value="Health">Health</option>
            <option value="Corporate">Corporate</option>
            <option value="News">News</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          <span className="font-semibold">Description * (Use formatting options below)</span>
          <RichTextEditor 
            value={description}
            onChange={setDescription}
            label="Rich Text Description"
            placeholder="Write article description with formatting..."
          />
        </label>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4 border-t border-slate-700 pt-6">
        <div>
          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-semibold">Article Images * (Click to upload multiple)</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
            />
          </label>
          {uploading && <p className="text-blue-400 text-sm">Uploading images...</p>}
        </div>

        {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}

        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Article ${index + 1}`}
                  className="w-full h-32 object-cover rounded-2xl border border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute inset-0 flex items-center justify-center bg-red-600/80 rounded-2xl opacity-0 group-hover:opacity-100 transition font-semibold text-white text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-6 rounded-2xl border border-dashed border-slate-700 text-slate-400">
            No images uploaded yet. Click above to add article images.
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default AdminArticleForm;
