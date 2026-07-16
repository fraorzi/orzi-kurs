import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { invoiceTotal } from "./starter";

describe("invoiceTotal", () => {
  it("sumuje poprawne pozycje", () => {
    expect(
      invoiceTotal({
        items: [
          { price: 10, quantity: 2 },
          { price: 2.5, quantity: 4 },
        ],
      }),
    ).toBe(30);
  });

  it.each([
    [null],
    [{}],
    [{ items: "nope" }],
    [{ items: [{ price: "10", quantity: 2 }] }],
    [{ items: [{ price: 10 }] }],
  ])("zwraca null dla %j", (value) => {
    expect(invoiceTotal(value)).toBeNull();
  });

  it("odcina any przed logiką domenową", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    const body = source.slice(source.indexOf("export function invoiceTotal"));
    expect(body).not.toMatch(/\bany\b|\bas\s+|!\./);
    expect(body).toMatch(/:\s*unknown\s*=\s*readSdkInvoice/);
  });
});
