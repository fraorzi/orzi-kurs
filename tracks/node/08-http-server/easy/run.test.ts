import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Dopasuj metodę i pathname", () => {
  it("spełnia kontrakt zadania", async () => {
    const routes = [
      { method: "GET", path: "/users" },
      { method: "POST", path: "/users" },
    ];
    expect(solve(routes, "GET", "/users?page=2")).toEqual({ status: 200 });
    expect(solve(routes, "DELETE", "/users")).toEqual({
      status: 405,
      allow: ["GET", "POST"],
    });
    expect(solve(routes, "GET", "/missing")).toEqual({ status: 404 });
  });
});
