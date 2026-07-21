import { describe, expect, it } from "vitest";
import { solve } from "./starter";

async function* from(parts: readonly string[]): AsyncGenerator<string> {
  for (const part of parts) yield part;
}

async function collect(parts: readonly string[]): Promise<string[]> {
  const lines: string[] = [];
  for await (const line of solve(from(parts))) lines.push(line);
  return lines;
}

describe("iterator linii", () => {
  it("skleja linię przeciętą między chunkami", async () => {
    await expect(collect(["ala ", "ma kota\nkot ", "ma ale\n"])).resolves.toEqual([
      "ala ma kota",
      "kot ma ale",
    ]);
  });

  it("rozbija wiele linii z jednego chunka", async () => {
    await expect(collect(["a\nb\nc\n"])).resolves.toEqual(["a", "b", "c"]);
  });

  it("wydaje ostatnią linię bez końcowego znaku nowej linii", async () => {
    await expect(collect(["x\ny"])).resolves.toEqual(["x", "y"]);
  });

  it("ucina \\r z końcówek CRLF", async () => {
    await expect(collect(["a\r\nb\r\n"])).resolves.toEqual(["a", "b"]);
  });

  it("wejście zakończone newline nie produkuje pustej linii na końcu", async () => {
    await expect(collect(["a\n"])).resolves.toEqual(["a"]);
  });
});
