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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{room ? "Edit Room" : "Add Room"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Room Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

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
            className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
          />


          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Preview */}
          <div className="flex gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
