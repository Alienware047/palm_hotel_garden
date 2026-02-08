import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ⭐ FIX HERE
  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    return NextResponse.json({ alerts: [] }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/alerts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
