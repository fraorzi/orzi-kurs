import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("walidator type strippingu", () => {
  it("akceptuje czysty erasable TypeScript", () => {
    const source = `import type { Config } from "./config.js";\nexport const x: number = 1;\n`;
    expect(solve(source, "script.ts")).toEqual([]);
  });

  it("odrzuca rozszerzenie .tsx", () => {
    expect(solve("export const x = 1;\n", "widget.tsx")).toEqual(["tsx"]);
  });

  it("wykrywa enum i namespace jako składnię nie-erasable", () => {
    const source = `enum Level { Low }\nnamespace Util {}\n`;
    expect(solve(source, "legacy.ts")).toEqual(["enum", "namespace"]);
  });

  it("wykrywa alias ścieżki nieistniejący w runtime", () => {
    const source = `import { db } from "@/lib/db.js";\nimport type { Row } from "@/lib/rows.js";\n`;
    expect(solve(source, "query.ts")).toContain("path-alias");
  });

  it("wymaga jawnego import type przy imporcie klamrowym", () => {
    const source = `import { helper } from "./helper.js";\nexport const x = helper();\n`;
    expect(solve(source, "app.ts")).toEqual(["type-import-must-be-explicit"]);
  });
});
