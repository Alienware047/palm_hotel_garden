import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!API_URL) {
      return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
    }

    const backendRes = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json().catch(() => null);

    if (data && data.url) return NextResponse.json(data);

    return NextResponse.json({ url: "/thank-you", data }, { status: backendRes.ok ? 200 : 400 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
