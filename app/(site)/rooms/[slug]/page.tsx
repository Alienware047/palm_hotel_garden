// app/(site)/rooms/[slug]/page.tsx
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const dynamic = "force-dynamic";

interface RoomPageProps {
  params: { slug: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  try {
    const res = await fetch(`${API_URL}/rooms/${params.slug}`, { cache: "no-store" });
    if (!res.ok) return notFound();

    const data = await res.json();

    if (!data || !data.rooms || data.rooms.length === 0) return notFound();

    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 capitalize">{String(data.category).replace(/-/g, " ")}</h1>
        <p className="text-muted-foreground mb-8">Total Rooms: {data.total ?? data.rooms.length}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.rooms.map((room: any) => {
            const img = room.image && String(room.image).startsWith("http") ? room.image : `${API_URL}${room.image}`;
            return (
              <div key={room.id} className="rounded-xl shadow-md overflow-hidden bg-white">
                <img src={img} alt={room.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{room.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{room.capacity} guests • ${room.price}/night</p>
                  <p className="text-sm">{room.is_available ? "Available" : "Not available"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Failed to fetch category:", err);
    return notFound();
  }
}
