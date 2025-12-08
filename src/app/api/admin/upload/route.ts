import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { authOptions } from "@/utils/authOptions";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Sanitize filename: remove spaces, special chars
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure directory exists (mkdir if not? we did it via command, but good to be safe)
        // await mkdir(uploadDir, { recursive: true }); // skipping for now as we made it

        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
