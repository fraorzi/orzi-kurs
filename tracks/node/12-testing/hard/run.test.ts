import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Testuj przez port efemeryczny", () => {
  it("spełnia kontrakt zadania", async () => {
    const { createServer } = await import("node:http");
    const server = createServer((_request, response) => response.end("ok"));
    await expect(
      solve(server, async (origin) => await (await fetch(origin)).text()),
    ).resolves.toBe("ok");
    expect(server.listening).toBe(false);
  });
});
