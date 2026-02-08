import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const search = req.nextUrl.searchParams.get("search") || "";
    const status = req.nextUrl.searchParams.get("status") || "";
    const payment = req.nextUrl.searchParams.get("payment") || "";

    const res = await adminFetch(`/admin/bookings?page=${page}&search=${search}&status=${status}&payment=${payment}`);

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/admin/bookings error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await adminFetch(`/admin/bookings`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("POST /api/admin/bookings error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
