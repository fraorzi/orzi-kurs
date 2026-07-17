import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Dodaj bezpieczny correlation ID", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    let calls = 0;
    const ctx = { requestId: "bad id", state: {}, headers: {} };
    await solve(ctx, async () => { calls += 1; }, () => "generated-123");
    expect(ctx).toMatchObject({ state: { requestId: "generated-123" }, headers: { "x-request-id": "generated-123" } });
    expect(calls).toBe(1);
  });
});

