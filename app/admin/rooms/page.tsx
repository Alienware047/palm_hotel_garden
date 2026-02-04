"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoomModal from "../components/roommodal";
import { LucideIcon } from "lucide-react";
import { Hotel, DollarSign, Users, Image as ImageIcon, } from "lucide-react";



interface RoomImage {
  image_url: string;
  is_primary: boolean;
}

interface Room {
  id?: number;
  name: string;
  slug: string;
  price: number;
  capacity: number;
  description: string;
  is_available?: boolean;
  images?: RoomImage[];
  created_at: string;
}


export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | undefined>();
  const [sortBy, setSortBy] = useState<
    "newest" | "price_low" | "price_high" | "name_asc" | "capacity"
  >("newest");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  // Fetch Rooms
  const fetchRooms = async () => {
    if (!token) return router.push("/admin-login");

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`,
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json", } }
      );

      if (!res.ok) throw new Error("Failed to fetch rooms");
      setRooms(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Save Room (Create / Update)
  const handleSaveRoom = async (formData: FormData) => {
    if (!token) return router.push("/admin-login");

    const roomId = formData.get("id");
    const url = roomId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms/${roomId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save room");
      }

      setModalOpen(false);
      setEditRoom(undefined);
      fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete Room
  const handleDeleteRoom = async (id: number) => {
    if (!token) return router.push("/admin-login");
    if (!confirm("Delete this room?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");
      fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Filtered & Sorted Rooms
  const filteredRooms = rooms
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "capacity":
          return b.capacity - a.capacity;
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    const totalRooms = rooms.length;

    const avgPrice =
      totalRooms > 0
        ? Math.round(
            rooms.reduce((sum, r) => sum + r.price, 0) / totalRooms
          )
        : 0;

    const maxCapacity =
      totalRooms > 0
        ? Math.max(...rooms.map((r) => r.capacity))
        : 0;

    const roomsWithImages = rooms.filter(
      (r) => r.images && r.images.length > 0
    ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--muted))]">
        <p>Loading Rooms…</p>
      </div>
    );
  }

  return (
    <div className="sm:p-8 bg-[rgb(var(--background))] min-h-screen transition-colors">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[rgb(var(--foreground))]">
        Manage Rooms
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* STATS */}
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ">
        <StatCard
          label="Total Rooms"
          value={totalRooms}
          Icon={Hotel}
        />

        <StatCard
          label="Average Price"
          value={avgPrice}
          Icon={DollarSign}
        />

        <StatCard
          label="Max Capacity"
          value={maxCapacity}
          Icon={Users}
        />

        <StatCard
          label="Rooms With Images"
          value={roomsWithImages}
          Icon={ImageIcon}
        />
      </div>




      {/* Search + Sort + Add */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <input
          className="w-full sm:w-1/2 border border-[rgb(var(--border))] rounded px-4 py-2 text-[rgb(var(--foreground))] bg-[rgb(var(--card))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full sm:w-1/4 border border-[rgb(var(--border))] rounded px-4 py-2 text-[rgb(var(--foreground))] bg-[rgb(var(--card))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="capacity">Capacity</option>
        </select>

        <button
          onClick={() => setModalOpen(true)}
          className="glass px-6 py-2 rounded text-white border border-[rgb(var(--glass-border))] w-full sm:w-auto transition-all"
        >
          Add Room
        </button>
      </div>

      {/* Room List */}
      <div
        className="
          max-h-[65vh]
          overflow-y-auto
          pr-2
          scrollbar-thin
          scrollbar-thumb-rounded
          scrollbar-thumb-[rgb(var(--primary))]
          scrollbar-track-[rgb(var(--card))]
        "
      >
        <div className="flex flex-col gap-4">
          {filteredRooms.map((room) => {
            const primaryImage = room.images?.find(
              (img) => img.is_primary
            );

            return (
              <div
                key={room.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-[rgb(var(--border))] rounded-lg overflow-hidden shadow glass no-hover transition-shadow hover:shadow-lg p-3 sm:p-4"
              >
                {/* IMAGE */}
                <div className="flex-shrink-0 w-full sm:w-40 h-32 sm:h-28 md:h-32 lg:h-36 xl:h-40 border border-[rgb(var(--border))] rounded overflow-hidden">
                  {primaryImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${primaryImage.image_url}`}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-200">
                      No Image
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-semibold text-lg text-[rgb(var(--foreground))]">
                    {room.name}
                  </h3>
                  <h3 className="font-semibold text-sm text-[rgb(var(--muted))]">
                    {room.slug}
                  </h3>
                  <p className="text-sm text-[rgb(var(--muted))]">
                    ${room.price} · {room.capacity} beds
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                  <button
                    className="glass px-3 py-1 rounded hover-white border border-[rgb(var(--glass-border))] transition-all w-20 text-center"
                    onClick={() => {
                      setEditRoom(room);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="glass px-3 py-1 rounded hover-glow text-red-500 border border-[rgb(var(--glass-border))] transition-all w-20 text-center"
                    onClick={() => handleDeleteRoom(room.id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ROOM MODAL */}
      <RoomModal
        open={modalOpen}
        room={editRoom}
        onClose={() => {
          setModalOpen(false);
          setEditRoom(undefined);
        }}
        onSave={handleSaveRoom}
      />
    </div>
  );


  function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon: LucideIcon;
}) {
  return (
    <div className="p-4 rounded glass hover:text-white flex flex-col items-center gap-2 transition-all">
      <Icon className="w-6 h-6" />
      <p className="text-sm ">{label}</p>
      <p className="text-2xl font-bold ">
        {value}
      </p>
    </div>
  );
}
}
