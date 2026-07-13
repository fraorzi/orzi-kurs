import { describe, it, expect } from "vitest";
import { settle } from "./starter.js";

describe("settle", () => {
  it("dla spełnionej promisy zwraca { ok: true, value }", async () => {
    expect(await settle(Promise.resolve(1))).toEqual({ ok: true, value: 1 });
  });

  it("dla odrzuconej promisy zwraca { ok: false, error } zamiast rzucać", async () => {
    const err = new Error("boom");
    const result = await settle(Promise.reject(err));
    expect(
      result,
      "settle ma złapać odrzucenie (try/catch wokół await) i zwrócić je jako pole error",
    ).toEqual({ ok: false, error: err });
  });

  it("nigdy się nie odrzuca — nawet dla odrzuconej promisy", async () => {
    await expect(
      settle(Promise.reject(new Error("x"))),
      "settle nie może propagować odrzucenia — ma je zamienić na zwykły wynik",
    ).resolves.toMatchObject({ ok: false });
  });

  it("działa też dla zwykłej wartości (await na nie-promisie)", async () => {
    expect(await settle(42)).toEqual({ ok: true, value: 42 });
  });
});
