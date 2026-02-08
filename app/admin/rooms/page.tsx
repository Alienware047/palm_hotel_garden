"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoomModal from "../../../components/backend/roommodal";
import { LucideIcon, Hotel, DollarSign, Users, Image as ImageIcon } from "lucide-react";

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
  const [sortBy, setSortBy] = useState<"newest" | "price_low" | "price_high" | "name_asc" | "capacity">("newest");

  /* --------------------------
     Fetch Rooms via API route (httpOnly cookie)
  --------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/rooms`);

        if (res.status === 401) {
          router.push("/admin-login");
          return;
        }

        if (!res.ok) throw new Error("Failed to load rooms");

        const data = await res.json();
        setRooms(data || []);
      } catch (err: any) {
        setError(err.message || "Error loading rooms");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleDeleteRoom = async (id: number) => {
    if (!confirm("Delete this room?")) return;

    try {
      const res = await fetch(`/api/admin/rooms/${id}`, { method: "DELETE" });

      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }

      if (!res.ok) throw new Error("Failed to delete room");

      setRooms(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      setError(err.message || "Error deleting room");
    }
  };
const handleSaveRoom = async (formData: FormData) => {
  const roomId = formData.get("id");
  const url = roomId
    ? `/api/admin/rooms/${roomId}`
    : `/api/admin/rooms`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (res.status === 401) {
      router.push("/admin-login");
      return;
    }

    if (!res.ok) throw new Error("Failed to save room");

    const refreshed = await res.json();

    setRooms(prev =>
      roomId
        ? prev.map(r => (r.id === refreshed.id ? refreshed : r))
        : [refreshed, ...prev]
    );

    setModalOpen(false);
    setEditRoom(undefined);

  } catch (err: any) {
    setError(err.message);
  }
};

  /* --------------------------
     Derived Data
  --------------------------- */
  const filteredRooms = rooms
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low": return a.price - b.price;
        case "price_high": return b.price - a.price;
        case "name_asc": return a.name.localeCompare(b.name);
        case "capacity": return b.capacity - a.capacity;
        default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const totalRooms = rooms.length;
  const avgPrice = totalRooms ? Math.round(rooms.reduce((s, r) => s + r.price, 0) / totalRooms) : 0;
  const maxCapacity = totalRooms ? Math.max(...rooms.map(r => r.capacity)) : 0;
  const roomsWithImages = rooms.filter(r => r.images?.length).length;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  /* --------------------------
     UI
  --------------------------- */
  return (
    <div className="sm:p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Rooms</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Rooms" value={totalRooms} Icon={Hotel} />
        <StatCard label="Average Price" value={avgPrice} Icon={DollarSign} />
        <StatCard label="Max Capacity" value={maxCapacity} Icon={Users} />
        <StatCard label="Rooms With Images" value={roomsWithImages} Icon={ImageIcon} />
      </div>

      {/* Search + Sort */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search rooms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="border px-4 py-2 rounded"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price Low</option>
          <option value="price_high">Price High</option>
          <option value="name_asc">Name</option>
          <option value="capacity">Capacity</option>
        </select>
        <button onClick={() => setModalOpen(true)} className="px-6 py-2 bg-black text-white rounded">Add Room</button>
      </div>

      {/* Room List */}
      <div className="flex flex-col gap-4">
        {filteredRooms.map(room => {
          const primary = room.images?.find(i => i.is_primary);
          return (
            <div key={room.id} className="flex gap-4 border p-4 rounded">
              <div className="w-40 h-32 bg-gray-200 overflow-hidden">
                {primary ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${primary.image_url}`} className="w-full h-full object-cover" /> : "No Image"}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{room.name}</h3>
                <p>${room.price}</p>
                <p>{room.capacity} beds</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditRoom(room); setModalOpen(true); }}>Edit</button>
                <button onClick={() => handleDeleteRoom(room.id!)} className="text-red-500">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      <RoomModal
        open={modalOpen}
        room={editRoom}
        onClose={() => { setModalOpen(false); setEditRoom(undefined); }}
        onSave={handleSaveRoom}
      />
    </div>
  );
}

/* --------------------------
   Stat Card
--------------------------- */
function StatCard({ label, value, Icon }: { label: string; value: number; Icon: LucideIcon; }) {
  return (
    <div className="p-4 border rounded text-center">
      <Icon className="mx-auto mb-2" />
      <p>{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
