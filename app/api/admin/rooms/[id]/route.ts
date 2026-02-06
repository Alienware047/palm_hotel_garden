import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms/${params.id}`, {
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${process.env.LARAVEL_URL}/admin/rooms/${params.id}`, {
      method: "POST",
      body: formData,
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms/${params.id}`, {
      method: "DELETE",
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
