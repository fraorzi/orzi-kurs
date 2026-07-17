import { describe, expect, it, vi } from "vitest";
import { readSession } from "./starter";

describe("readSession", () => {
  it("ufa dopiero zweryfikowanemu payloadowi i minimalizuje wynik", async () => {
    const verify = vi.fn(async () => ({
      userId: "u-1",
      role: "admin",
      expiresAt: 200,
      email: "secret@example.com",
    }));
    await expect(readSession("signed-token", verify, 100)).resolves.toEqual({
      userId: "u-1",
      role: "admin",
      expiresAt: 200,
    });
    expect(verify).toHaveBeenCalledWith("signed-token");
  });

  it.each([
    { userId: "u-1", role: "owner", expiresAt: 200 },
    { userId: "", role: "member", expiresAt: 200 },
    { userId: "u-1", role: "member", expiresAt: 100 },
  ])("odrzuca payload $role/$expiresAt", async (payload) => {
    await expect(readSession("token", async () => payload, 100)).resolves.toBeNull();
  });

  it("odrzuca błąd podpisu", async () => {
    await expect(readSession("forged", async () => {
      throw new Error("bad signature");
    }, 100)).resolves.toBeNull();
  });
});
