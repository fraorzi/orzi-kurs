import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Napisz cienki kontroler z sanitization", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const ctx = { params: { documentId: "doc" }, state: { user: { id: "u1" } }, body: undefined as object | undefined };
    await solve({ service: async () => ({ title: "A", secret: "x" }), sanitize: async ({ title }: { title?: unknown }) => ({ title }) }, ctx);
    expect(ctx.body).toEqual({ title: "A" });
  });
});

