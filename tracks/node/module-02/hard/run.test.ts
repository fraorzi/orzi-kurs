import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("rdzeń usługi HTTP", () => {
  it("waliduje, koreluje i deduplikuje zapis", async () => {
    const create = vi.fn(
      async (input: { title: string }, requestId: string) => ({
        id: requestId,
        title: input.title,
      }),
    );
    const log = vi.fn();
    const handle = solve({ create }, log);
    const request = () =>
      new Request("http://service.test/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": "k1",
          "x-request-id": "r1",
        },
        body: JSON.stringify({ title: "  Ship release  " }),
      });
    const first = await handle(request());
    expect(first.status).toBe(201);
    expect(await first.json()).toEqual({ id: "r1", title: "Ship release" });
    const second = await handle(request());
    expect(await second.json()).toEqual({ id: "r1", title: "Ship release" });
    expect(create).toHaveBeenCalledOnce();
    expect(log).toHaveBeenCalledWith({ requestId: "r1", status: 201 });
    const missing = await handle(new Request("http://service.test/missing"));
    expect(missing.status).toBe(404);
  });
});
