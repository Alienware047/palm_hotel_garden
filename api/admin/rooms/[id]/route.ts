import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await adminFetch(`/admin/rooms/${params.id}`);

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

    const res = await adminFetch(`/admin/rooms/${params.id}`, {
      method: "POST",
      body: formData,
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
    const res = await adminFetch(`/admin/rooms/${params.id}`, { method: "DELETE" });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
