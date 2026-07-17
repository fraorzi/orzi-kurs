import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Sprawdź macierz permissions przez HTTP", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(await solve(async (role) => ({ anonymous: 401, editor: 403, admin: 200 })[role])).toEqual([401, 403, 200]);
  });
});

