import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { type, data } = await req.json();

        // Validate type to prevent arbitrary file writes
        const validTypes = ["features", "coaches", "locations"];
        if (!validTypes.includes(type)) {
            return NextResponse.json({ error: "Invalid data type" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "src", "data", `${type}.json`);

        // Write formatted JSON
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
