import { NextResponse } from "next/server";

/**
 * GET /api/csv/jobs/:jobId
 * Returns a placeholder ingestion job response for UI integration.
 */
export async function GET(_: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;
  return NextResponse.json({
    jobId,
    status: "queued",
    progress: 0,
    message: "CSV ingestion job tracking scaffold. Integrate with queue worker.",
  });
}
