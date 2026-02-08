"use client";


import { useState, useEffect } from "react";

interface Room {
  id?: number;
  name: string;
  slug: string;
  price: number;
  capacity: number;
  description: string;
  image_urls?: string[];
}

interface RoomModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void; // send FormData for file upload
  room?: Room;
}

export default function RoomModal({ open, onClose, onSave, room }: RoomModalProps) {
  const [form, setForm] = useState<Room>({
    name: "",
    slug: "",
    price: 0,
    capacity: 1,
    description: "",
    image_urls: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (room) {
      setForm(room);
      setImages([]); // reset images for editing
    } else {
      setForm({
        name: "",
        slug: "",
        price: 0,
        capacity: 1,
        description: "",
        image_urls: [],
      });
      setImages([]);
    }
  }, [room]);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setError("You can upload a maximum of 3 images.");
      return;
    }
    setError("");
    setImages(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    if (form.id) fd.append("id", String(form.id));
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("price", String(form.price));
    fd.append("capacity", String(form.capacity));
    fd.append("description", form.description);

    images.forEach((img) => fd.append("images[]", img));

    onSave(fd); // send FormData to parent
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {room ? "Edit Room" : "Add Room"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ⭐ Image Preview Gallery */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Room Images
            </p>

            <div className="flex gap-3 flex-wrap">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group w-20 h-20 rounded-xl overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover transition group-hover:scale-110"
                    />

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setImages(prev => prev.filter((_, index) => index !== i))
                      }
                      className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  No images selected
                </div>
              )}
            </div>
          </div>

          {/* ⭐ Upload Box */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-muted/40 transition">
            <span className="text-sm text-muted-foreground">
              Click to upload (Max 3 images)
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* ⭐ Room Info Fields */}

          <input
            type="text"
            placeholder="Room Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          />

          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Capacity"
              value={form.capacity === 0 ? "" : form.capacity}
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />

            <input
              type="number"
              placeholder="Price (GHS)"
              value={form.price === 0 ? "" : form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* ⭐ Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-glass px-4 py-2 rounded-xl border  transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className=" px-5 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition shadow-md"
            >
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
