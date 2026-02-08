"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import RoomBookingClient from "@/components/frontend/rooms/RoomBookingClient";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

interface RoomImage {
  url: string;
  is_primary: boolean;
}

interface Room {
  id: number;
  name: string;
  slug: string;
  price: number;
  capacity: number;
  description: string;
  is_available: boolean;
  images: RoomImage[];
}

interface Facility {
  slug: string;
  name: string;
  description: string;
  short?: string;
  image: string;
  price_range: {
    min: number;
    max: number;
  };
  capacity: {
    min: number;
    max: number;
  };
}

interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  price_range: {
    min: number;
    max: number;
  };
}

interface ApiResponse {
  category: Category;
  total: number;
  rooms: Room[];
  facilities: Facility[];
}

const mediaUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL.replace("/api", "")}${path}`;
};

export default function RoomPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewRooms, setViewRooms] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/rooms/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to load room data");
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-lg text-red-600">{error || "Failed to load data"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* CATEGORY HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">{data.category.name}</h1>
        <p className="text-muted-foreground mb-2">{data.category.description}</p>
        <p className="text-sm text-muted-foreground">
          Price Range: ${data.category.price_range.min.toFixed(2)} - $
          {data.category.price_range.max.toFixed(2)}
        </p>
      </div>

      {/* TOGGLE BUTTONS */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewRooms(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            viewRooms
              ? "bg-primary text-white shadow-lg"
              : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Rooms ({data.rooms.length})
        </button>
        <button
          onClick={() => setViewRooms(false)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            !viewRooms
              ? "bg-primary text-white shadow-lg"
              : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Facilities ({data.facilities.length})
        </button>
      </div>

      {/* ROOMS VIEW */}
      {viewRooms && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
          {data.rooms.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No rooms available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.rooms.map((room) => {
                const primaryImage = room.images.find((img) => img.is_primary) || room.images[0];
                return (
                  <div
                    key={room.id}
                    className="border rounded-2xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={mediaUrl(primaryImage?.url)}
                      alt={room.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 flex-1">{room.description}</p>

                      <div className="space-y-2 mb-4">
                        <p className="text-primary font-bold text-lg">${room.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">
                          👥 Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                        </p>
                        <p className={`text-xs font-semibold ${room.is_available ? "text-green-600" : "text-red-600"}`}>
                          {room.is_available ? "✓ Available" : "✗ Unavailable"}
                        </p>
                      </div>

                      {/* Booking Form */}
                      <RoomBookingClient
                        room={room}
                        apiUrl={API_URL}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FACILITIES VIEW */}
      {!viewRooms && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Additional Facilities</h2>
          {data.facilities.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No facilities available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.facilities.map((facility) => (
                <div
                  key={facility.slug}
                  className="border rounded-2xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition-shadow"
                >
                  <img
                    src={mediaUrl(facility.image)}
                    alt={facility.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex-1">{facility.description}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-primary font-bold text-lg">
                        ${facility.price_range.min.toFixed(2)} - ${facility.price_range.max.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        👥 Capacity: {facility.capacity.min} - {facility.capacity.max} guest
                        {facility.capacity.max > 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Facility Booking Form */}
                    <FacilityBookingForm
                      facility={facility}
                      apiUrl={API_URL}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ===================================================== */
/* Facility Booking Form Component */
/* ===================================================== */

function FacilityBookingForm({
  facility,
  apiUrl,
}: {
  facility: Facility;
  apiUrl: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_from: "",
    date_to: "",
    total_price: facility.price_range.min,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${apiUrl}/bookings/facilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facility_type: facility.slug,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          date_from: formData.date_from,
          date_to: formData.date_to,
          total_price: parseFloat(formData.total_price.toString()),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Booking failed");
      }

      const data = await response.json();
      setMessage({
        type: "success",
        text: `Facility booked! Booking Ref: ${data.data.booking_ref}`,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date_from: "",
        date_to: "",
        total_price: facility.price_range.min,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Booking failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {message && (
        <div
          className={`text-sm p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <input
        type="text"
        placeholder="Your name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <input
        type="tel"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <input
        type="date"
        required
        value={formData.date_from}
        onChange={(e) => setFormData({ ...formData, date_from: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <input
        type="date"
        value={formData.date_to}
        onChange={(e) => setFormData({ ...formData, date_to: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <input
        type="number"
        placeholder="Total price"
        step="0.01"
        min={facility.price_range.min}
        value={formData.total_price}
        onChange={(e) => setFormData({ ...formData, total_price: parseFloat(e.target.value) })}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 text-sm"
      >
        {loading ? "Booking..." : "Book Facility"}
      </button>
    </form>
  );
}
