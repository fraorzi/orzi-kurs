import { describe, expect, it, vi } from "vitest";
import { reserveStock } from "./starter";

describe("reserveStock expected errors", () => {
  it("zwraca walidację bez wywołania adaptera", async () => {
    const reserve = vi.fn(async () => true);
    await expect(reserveStock("   ", reserve)).resolves.toEqual({
      status: "validation-error",
      message: "SKU jest wymagane",
    });
    expect(reserve).not.toHaveBeenCalled();
  });

  it("zwraca konflikt jako dane", async () => {
    await expect(reserveStock(" p-1 ", async () => false)).resolves.toEqual({
      status: "conflict",
      message: "Produkt jest już niedostępny",
    });
  });

  it("przepuszcza nieoczekiwaną awarię", async () => {
    await expect(reserveStock("p-1", async () => {
      throw new Error("database offline");
    })).rejects.toThrow("database offline");
  });
});
