import { createServer } from "node:http";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

function echoServer() {
  return createServer((request, response) => {
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({ path: request.url }));
  });
}

describe("serwer na porcie efemerycznym", () => {
  it("serwuje ruch na przydzielonym porcie i zwraca wynik run", async () => {
    const result = await solve(echoServer(), async (origin) => {
      expect(origin).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
      const response = await fetch(`${origin}/ping`);
      return response.json();
    });
    expect(result).toEqual({ path: "/ping" });
  });

  it("zamyka serwer po zakończeniu", async () => {
    const server = echoServer();
    await solve(server, async () => undefined);
    expect(server.listening).toBe(false);
  });

  it("zamyka serwer także gdy run rzuci", async () => {
    const server = echoServer();
    await expect(
      solve(server, async () => {
        throw new Error("scenariusz padł");
      }),
    ).rejects.toThrow("scenariusz padł");
    expect(server.listening).toBe(false);
  });

  it("dwa równoległe serwery dostają różne porty", async () => {
    const origins: string[] = [];
    await Promise.all([
      solve(echoServer(), async (origin) => void origins.push(origin)),
      solve(echoServer(), async (origin) => void origins.push(origin)),
    ]);
    expect(origins[0]).not.toBe(origins[1]);
  });
});
