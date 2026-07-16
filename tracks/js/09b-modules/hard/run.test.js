import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadPlugin, runPlugin } from "./src/index.js";

describe("loader pluginów", () => {
  it("ładuje plugin uppercase i uruchamia eksport domyślny", async () => {
    await expect(runPlugin("uppercase", "Zażółć")).resolves.toBe("ZAŻÓŁĆ");
  });

  it("ładuje plugin slugify dopiero przez rejestr", async () => {
    await expect(runPlugin("slugify", "  Żółta Łódź  ")).resolves.toBe("zolta-lodz");
  });

  it("zwraca obiekt modułu z eksportem domyślnym", async () => {
    const plugin = await loadPlugin("uppercase");
    expect(plugin.default, "dynamiczny import zwraca namespace modułu")
      .toBeTypeOf("function");
  });

  it("odrzuca nazwę spoza jawnej allow-listy", async () => {
    await expect(runPlugin("admin", "x")).rejects.toThrow("Unknown plugin: admin");
  });

  it("używa dynamicznego importu bez interpolowania nieufnej nazwy w ścieżce", () => {
    const source = readFileSync(new URL("./src/registry.js", import.meta.url), "utf8");
    expect(source, "każdy loader ma używać import()").toMatch(/\bimport\s*\(/);
    expect(
      source,
      "nie składaj ścieżki modułu z name; zastosuj jawny rejestr dozwolonych loaderów",
    ).not.toMatch(/import\s*\(\s*`[^`]*\$\{\s*name\s*\}/);
  });
});
