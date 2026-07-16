import { describe, expect, it, vi } from "vitest";
import { createClient } from "./src/client";

describe("createClient", () => {
  it("wywołuje właściwy handler z inputem", () => {
    const getUser = vi.fn((input: { id: number }) => ({
      id: input.id,
      name: "Ala",
    }));
    const client = createClient({
      getUser,
      health: (_input: null) => "ok" as const,
    });

    expect(client.call("getUser", { id: 7 })).toEqual({
      id: 7,
      name: "Ala",
    });
    expect(getUser).toHaveBeenCalledWith({ id: 7 });
    expect(client.call("health", null)).toBe("ok");
  });
});
