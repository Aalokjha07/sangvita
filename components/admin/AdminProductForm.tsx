"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

type AdminProductFormProps = {
  product?: {
    _id: string;
    name: string;
    category: string;
    price: number;
    mrp: number;
    description: string;
    images: string[];
    tag: string | null;
  };
  submitLabel: string;
  onSave: (product: any) => void;
};

const AdminProductForm = ({ product, submitLabel, onSave }: AdminProductFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [mrp, setMrp] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

 useEffect(() => {
  if (product) {
    setName(product.name);
    setCategory(product.category);
    // Directly use the numbers. No .replace() needed!
    setPrice(product.price); 
    setMrp(product.mrp);
    setDescription(product.description);
    setImages(product.images || []);
    setTag(product.tag ?? "");
  }
}, [product]);

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
      setUploadError("Please upload at least one product image.");
      return;
    }

    setUploading(true);

    try {
      const productData = {
        name: name.trim() || "New Product",
        category: category.trim() || "General",
        price: price || 0,
        mrp: mrp || 0,
        description: description.trim() || "Product description",
        images: images,
        tag: tag.trim() || null,
      };

      let response;
      if (product?._id) {
        // Update existing product
        response = await fetch(`/api/products/${product._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
          credentials: 'include',
        });
      } else {
        // Create new product
        response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
          credentials: 'include',
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || "Failed to save product");
      }

      const savedProduct = await response.json();
      onSave(savedProduct);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Failed to save product");
      console.error("Save error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-semibold">Product Name *</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vita-C Forte"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-semibold">Category *</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Immunity Support"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-semibold">Price *</span>
          <input
  type="number" // Change this
  value={price}
  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
  placeholder="899"
  required
  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
/>
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-semibold">MRP *</span>
          <input
  type="number" // Change this
  value={mrp}
  onChange={(e) => setMrp(parseFloat(e.target.value) || 0)}
  placeholder="1200"
  required
  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
/>
        </label>
        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          <span className="font-semibold">Description * (Use formatting options below)</span>
          <RichTextEditor 
            value={description}
            onChange={setDescription}
            label="Rich Text Description"
            placeholder="Write product description with formatting..."
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          <span className="font-semibold">Tag</span>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Best Seller, New Launch, etc."
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          />
        </label>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4 border-t border-slate-700 pt-6">
        <div>
          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-semibold">Product Images * (Click to upload multiple)</span>
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
                  alt={`Product ${index + 1}`}
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
            No images uploaded yet. Click above to add product images.
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

export default AdminProductForm;
