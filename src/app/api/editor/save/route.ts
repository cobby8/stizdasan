import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define safe sections to prevent arbitrary file writes
const ALLOWED_SECTIONS = ["hero", "about", "features", "location"];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { section, data } = body;

        if (!ALLOWED_SECTIONS.includes(section)) {
            return NextResponse.json({ error: "Invalid section" }, { status: 400 });
        }

        const dataDir = path.join(process.cwd(), "src", "data");
        const filePath = path.join(dataDir, `${section}.json`);

        // Read existing data first
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "Data file not found" }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const existingData = JSON.parse(fileContent);

        // Merge updates
        const updatedData = {
            ...existingData,
            ...data
        };

        // Write back
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 4), "utf-8");

        return NextResponse.json({ success: true, daa: updatedData });
    } catch (error) {
        console.error("Save error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
