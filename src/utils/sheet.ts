import Papa from "papaparse";

export const SHEET_ID = "1Tc-JXZlXfbwWJzVhk3NKB6oZoDrqy8iEeIAN0WIjwww";
const EXPORT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1000455425`;

export interface ClassSession {
    grade: string;
    count: number;
}

export interface TimeSlot {
    time: string; // e.g. "08:30~09:40"
    label: string; // e.g. "0교시"
    schedule: {
        [day: string]: ClassSession[]; // Day -> List of classes
    };
}

export const DAYS = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

export async function fetchSchedule(branch: "dasan1" | "dasan2"): Promise<TimeSlot[]> {
    try {
        const response = await fetch(EXPORT_URL);
        const text = await response.text();
        const result = Papa.parse(text, { header: false, skipEmptyLines: false });
        const fullData = result.data as string[][];

        // Define Ranges based on user request
        // Branch 1: Start to Row 145 (Indices 0 to 145 approx)
        // Branch 2: Row 148 onwards
        // Exclude Rows 146 and 293 (approx) - We will detect them by content "합계" or index.

        // Actually, safer to slice based on indices provided if they are rigid.
        // User said: "148행부터가 2호점", "146행과 293행은 총인원합계"
        // Let's assume these are 1-based row numbers from the Sheet.
        // 0-based indices:
        // Branch 1 Range: 0 to 144 (Row 145 is likely empty or padding before total?)
        // Row 145 (146th) = Total -> Skip
        // Row 147 (148th) = Branch 2 Start

        let targetRows: string[][] = [];

        if (branch === "dasan1") {
            targetRows = fullData.slice(0, 146); // Up to row 146 (exclusive of 146 index, so 0-145)
        } else {
            targetRows = fullData.slice(147); // Row 148 onwards (Index 147)
        }

        // Find Header Row in the slice
        let headerRowIndex = -1;
        for (let i = 0; i < targetRows.length; i++) {
            if (targetRows[i].includes("월요일")) {
                headerRowIndex = i;
                // console.log(`Found header for ${branch} at relative index ${i}`);
                break;
            }
        }

        if (headerRowIndex === -1) return [];

        const headers = targetRows[headerRowIndex];
        const dayIndices: { [key: string]: number } = {};
        DAYS.forEach(day => {
            const idx = headers.indexOf(day);
            if (idx !== -1) dayIndices[day] = idx;
        });

        const scheduleList: TimeSlot[] = [];
        let currentTimeSlot: TimeSlot | null = null;

        // Iterate rows after header
        for (let i = headerRowIndex + 1; i < targetRows.length; i++) {
            const row = targetRows[i];

            // Safety check
            if (!row || row.length === 0) continue;

            const timeCol = row[0]; // "0교시..."
            const gradeCol = row[1]; // "6세..."

            // Detect Total Rows to skip (User mentioned 146, 293 which might be inside the slice or relative)
            // If "합계" is in 0 or 1, skip.
            if (timeCol?.includes("합계") || gradeCol?.includes("합계")) continue;


            // New Time Block Detection
            if (timeCol && timeCol.trim() !== "") {
                const parts = timeCol.split("\n");
                const label = parts[0]?.trim() || "";
                const time = parts[1]?.trim() || "";

                currentTimeSlot = {
                    label,
                    time,
                    schedule: {}
                };
                DAYS.forEach(d => currentTimeSlot!.schedule[d] = []);
                scheduleList.push(currentTimeSlot);
            }

            if (!currentTimeSlot) continue;
            if (!gradeCol) continue;

            // Check counts for each day
            DAYS.forEach(day => {
                const idx = dayIndices[day];
                if (idx !== undefined) {
                    const val = row[idx];
                    // Val is the count (e.g. "5", "0", "1") or empty
                    if (val && val.trim() !== "" && val !== "0") {
                        const count = parseInt(val.replace(/,/g, ""), 10) || 0;
                        if (count > 0) {
                            currentTimeSlot?.schedule[day].push({
                                grade: gradeCol,
                                count: count
                            });
                        }
                    }
                }
            });
        }

        return scheduleList;
    } catch (error) {
        console.error("Failed to fetch schedule:", error);
        return [];
    }
}
