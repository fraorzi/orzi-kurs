import { describe, it, expect } from "vitest";
import { createDeferred } from "./starter.js";

describe("createDeferred", () => {
  it("zwraca obiekt z promisą i funkcjami resolve/reject", () => {
    const d = createDeferred();
    expect(d.promise, "promise ma być instancją Promise").toBeInstanceOf(Promise);
    expect(typeof d.resolve, "resolve ma być funkcją").toBe("function");
    expect(typeof d.reject, "reject ma być funkcją").toBe("function");
  });

  it("resolve rozstrzyga promisę z zewnątrz przekazaną wartością", async () => {
    const d = createDeferred();
    d.resolve(7);
    await expect(
      d.promise,
      "wywołanie resolve(7) poza executorem ma rozstrzygnąć promise wartością 7",
    ).resolves.toBe(7);
  });

  it("reject odrzuca promisę przekazanym błędem", async () => {
    const d = createDeferred();
    d.reject(new Error("boom"));
    await expect(d.promise).rejects.toThrow("boom");
  });

  it("liczy się tylko pierwsze rozstrzygnięcie", async () => {
    const d = createDeferred();
    d.resolve("pierwsze");
    d.resolve("drugie");
    await expect(
      d.promise,
      "promisa rozstrzyga się raz — drugie resolve ma być zignorowane",
    ).resolves.toBe("pierwsze");
  });
});
