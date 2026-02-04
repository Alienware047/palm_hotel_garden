// app/(site)/rooms/[slug]/page.tsx
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const revalidate = 0;          // fully static
export const dynamic = "force-static";
export const output = "export";

// -------------------------------
// 1️⃣ Fetch all category slugs at build time
// -------------------------------
async function fetchAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/rooms/slugs`, { cache: "force-cache" });
    if (!res.ok) return [];
    const slugs: string[] = await res.json();
    return slugs;
  } catch (err) {
    console.error("Failed to fetch slugs:", err);
    return [];
  }
}

// -------------------------------
// 2️⃣ Generate static params for all categories
// -------------------------------
export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// -------------------------------
// 3️⃣ Page component
// -------------------------------
interface RoomPageProps {
  params: { slug: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  try {
    // Fetch category by slug
    const res = await fetch(`${API_URL}/rooms/${params.slug}`, { cache: "force-cache" });
    if (!res.ok) return notFound();

    const data = await res.json();

    if (!data.rooms || data.rooms.length === 0) return notFound();

    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 capitalize">
          {data.category.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground mb-8">
          Total Rooms: {data.total}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.rooms.map((room: any) => (
            <div key={room.id} className="rounded-xl shadow-md overflow-hidden bg-white">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{room.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {room.capacity} guests • ${room.price}/night
                </p>
                <p className="text-sm">{room.is_available ? "Available" : "Not available"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Failed to fetch category:", err);
    return notFound();
  }
}
