import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET() {
  const res = await adminFetch(`/admin/profile`);
  if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await adminFetch(`/admin/profile`, { method: "PUT", body: JSON.stringify(body) });
    if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const res = await adminFetch(`/admin/update`, { method: "DELETE" });
    if (res.status === 401) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
