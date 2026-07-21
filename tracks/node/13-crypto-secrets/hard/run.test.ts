import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("weryfikator scrypt", () => {
  it("koduje rekord jako salt:key w hex (16 i 32 bajty)", async () => {
    const record = await solve("correct horse");
    expect(record.encoded).toMatch(/^[0-9a-f]{32}:[0-9a-f]{64}$/);
  });

  it("weryfikuje poprawny sekret i odrzuca błędny", async () => {
    const record = await solve("correct horse");
    await expect(record.verify("correct horse")).resolves.toBe(true);
    await expect(record.verify("wrong")).resolves.toBe(false);
    await expect(record.verify("")).resolves.toBe(false);
  });

  it("sól jest losowa per rekord — ten sam sekret daje różne encoded", async () => {
    const [a, b] = await Promise.all([solve("tajne"), solve("tajne")]);
    expect(a.encoded).not.toBe(b.encoded);
    expect(a.encoded.split(":")[0]).not.toBe(b.encoded.split(":")[0]);
  });

  it("porównanie kluczy jest stałoczasowe (timingSafeEqual w źródle)", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source).toContain("timingSafeEqual");
    expect(source).toContain("scrypt");
  });
});
