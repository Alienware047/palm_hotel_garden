import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No images uploaded" }, { status: 400 });
  }

  if (files.length > 3) {
    return NextResponse.json(
      { error: "Maximum of 3 images allowed" },
      { status: 400 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public/images/rooms");
  await fs.mkdir(uploadDir, { recursive: true });

  const imageUrls: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    imageUrls.push(`/images/rooms/${fileName}`);
  }

  return NextResponse.json({ image_urls: imageUrls });
}
