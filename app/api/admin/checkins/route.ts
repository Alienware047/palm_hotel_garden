import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const filter = req.nextUrl.searchParams.get("filter") || "";

    const res = await adminFetch(`/admin/checkins?page=${page}&filter=${filter}`);

    if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
