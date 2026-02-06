import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`, {
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json({ rooms: data });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`, {
      method: "POST",
      body: formData,
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
