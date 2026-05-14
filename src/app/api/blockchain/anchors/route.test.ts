import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("/api/blockchain/anchors", () => {
  it("returns 400 when required fields are missing", async () => {
    const req = new Request("http://localhost/api/blockchain/anchors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foo: "bar" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns accepted response with hash and txHash", async () => {
    const req = new Request("http://localhost/api/blockchain/anchors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "sensor-tilt-alert",
        sourceId: "pole-22",
        payload: { tiltX: 0.81, tiltY: 0.11, ts: 1234 },
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(202);
    expect(body.status).toBe("accepted");
    expect(body.payloadSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(body.txHash).toMatch(/^0x[a-f0-9]{64}$/);
  });
});
