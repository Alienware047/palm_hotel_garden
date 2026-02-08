import { NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET() {
  try {
    const res = await adminFetch(`/admin/bookings/stats`);

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
