// import { prisma } from "@/lib/prisma";
// import BookingForm from "../../components/bookingform";
// import { notFound } from "next/navigation";

// export default async function RoomDetails({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const room = await prisma.room.findUnique({
//     where: { slug },
//   });

//   if (!room) return notFound();

//   return (
//     <main className="max-w-4xl mx-auto px-6 py-12">
//       <h1 className="text-3xl font-bold">{room.name}</h1>
//       <p className="text-xl text-yellow-500">GHS {room.price}/night</p>

//       <BookingForm roomId={room.id} price={room.price} />
//     </main>
//   );
// }
