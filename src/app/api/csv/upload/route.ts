import { NextResponse } from "next/server";
import { parseCsv } from "@/lib/csv/parsers/parseCsv";
import { polesSchema } from "@/lib/csv/schema/polesSchema";
import { validateCsvRows } from "@/lib/csv/validators/validateCsvRows";

/**
 * POST /api/csv/upload
 * Accepts { fileType: "poles", content: "csv text" } and returns validation results.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fileType = body?.fileType;
    const content = body?.content;

    if (fileType !== "poles") {
      return NextResponse.json({ error: "Unsupported fileType. Supported: poles" }, { status: 400 });
    }
    if (typeof content !== "string" || content.length === 0) {
      return NextResponse.json({ error: "content must be a non-empty CSV string" }, { status: 400 });
    }

    const rows = parseCsv(content);
    const errors = validateCsvRows(rows, polesSchema);
    return NextResponse.json({
      fileType,
      totalRows: rows.length,
      valid: errors.length === 0,
      errors,
      sample: rows.slice(0, 5),
    });
  } catch (error) {
    console.error("[CsvUploadRoute] Failed to process CSV upload", error);
    return NextResponse.json({ error: "Failed to process CSV" }, { status: 500 });
  }
}
