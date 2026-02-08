import { NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET() {
  const res = await adminFetch("/admin/rooms");

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
