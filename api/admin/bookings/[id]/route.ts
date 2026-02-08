import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const res = await adminFetch(`/admin/bookings/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // For actions like checkin we may POST to this path
  try {
    const res = await adminFetch(`/admin/bookings/${params.id}`, { method: "POST" });

    if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
