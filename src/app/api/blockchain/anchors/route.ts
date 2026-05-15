import { NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";

interface AnchorRequestBody {
  eventType: string;
  sourceId: string;
  payload: unknown;
  chainId?: string;
}

interface AnchorResponseBody {
  anchorId: string;
  payloadSha256: string;
  txHash: string;
  chainId: string;
  status: "accepted";
}

/**
 * Returns true when the incoming body has all required fields for anchoring.
 */
function isValidAnchorRequest(value: unknown): value is AnchorRequestBody {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.eventType === "string"
    && v.eventType.length > 0
    && typeof v.sourceId === "string"
    && v.sourceId.length > 0
    && "payload" in v;
}

/**
 * Converts arbitrary JSON-like payload into a deterministic JSON string.
 */
function canonicalizePayload(payload: unknown): string {
  return JSON.stringify(payload, Object.keys(payload as object).sort());
}

/**
 * Computes SHA-256 hash for the canonical payload string.
 */
function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * Creates a deterministic mock transaction hash from the payload hash.
 */
function buildMockTxHash(payloadHash: string): string {
  return `0x${createHash("sha256").update(`tx:${payloadHash}`).digest("hex")}`;
}

/**
 * POST /api/blockchain/anchors
 * Accepts an event payload and returns a hash + mock chain anchor metadata.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidAnchorRequest(body)) {
      return NextResponse.json(
        { error: "Invalid payload. Required: eventType, sourceId, payload" },
        { status: 400 },
      );
    }

    const canonicalPayload = canonicalizePayload(body.payload);
    const payloadSha256 = sha256(canonicalPayload);
    const txHash = buildMockTxHash(payloadSha256);

    const response: AnchorResponseBody = {
      anchorId: randomUUID(),
      payloadSha256,
      txHash,
      chainId: body.chainId || "simulated-local-chain",
      status: "accepted",
    };

    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    console.error("[BlockchainAnchorsRoute] Failed to anchor payload", error);
    return NextResponse.json({ error: "Failed to process anchor request" }, { status: 500 });
  }
}
