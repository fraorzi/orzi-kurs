import { describe, expect, it } from "vitest";
import { formatComparison } from "../app/lib/format-comparison";
import { buildCodeDiff } from "../app/lib/code-diff";

describe("formatted solution comparison", () => {
  it.each(["js", "ts", "tsx"])(
    "removes wrapping and indentation differences in %s",
    async (ext) => {
      const result = await formatComparison(
        {
          starter: 'export const person={\n name: "Ala", age: 20\n}\r\n',
          solution: 'export const person = { name: "Ala", age: 20 };',
        },
        `tracks/react/topic/easy/starter.${ext}`,
      );
      expect(result.starter).toBe(result.solution);
      expect(
        buildCodeDiff(result.starter!, result.solution!).rows.every(
          (row) => row.kind === "context",
        ),
      ).toBe(true);
    },
  );

  it("formats JSX wrapping with the same project settings", async () => {
    const result = await formatComparison(
      {
        starter:
          'export const view = <button type="button" disabled={false} onClick={() => {}}>Zapisz</button>;',
        solution:
          'export const view = (\n  <button\n type="button"\n disabled={false}\n onClick={() => {}}\n >\n Zapisz\n </button>\n);',
      },
      "tracks/react/topic/easy/starter.tsx",
    );
    expect(result.starter).toBe(result.solution);
  });

  it("retains differences in literals and operators", async () => {
    const result = await formatComparison(
      {
        starter: 'const text = "a b"; const pattern = /a b/; const n = 1 + 2;',
        solution: 'const text = "ab"; const pattern = /ab/; const n = 1 - 2;',
      },
      "tracks/js/topic/easy/starter.js",
    );
    expect(result.starter).not.toBe(result.solution);
    expect(result.starter).toContain('"a b"');
    expect(result.starter).toContain("/a b/");
  });

  it("formats SQL without changing string contents", async () => {
    const result = await formatComparison(
      {
        starter: "select name, age from users where name = 'a b';",
        solution: "SELECT\nname,\nage\nFROM users\nWHERE name = 'a b';",
      },
      "tracks/mysql/topic/easy/starter.sql",
    );
    expect(result.starter).toBe(result.solution);
    expect(result.starter).toContain("'a b'");
  });

  it("formats mixed multi-file snapshots file by file", async () => {
    const result = await formatComparison(
      {
        starter:
          '// \u2500\u2500 view.tsx \u2500\u2500\nexport const view=<div/>;\n\n// \u2500\u2500 data.json \u2500\u2500\n{"a":1}',
        solution:
          '// -- view.tsx --\nexport const view = <div />;\n\n// -- data.json --\n{ "a": 1 }\n',
      },
      "tracks/next/topic/hard/src",
    );
    expect(result.starter).toBe(result.solution);
  });

  it("falls back on both raw inputs if either side is invalid", async () => {
    const input = { starter: "export const = ;", solution: "export const n=1" };
    expect(await formatComparison(input, "tracks/ts/topic/easy/starter.ts")).toEqual(input);
  });

  it("retains locked or missing snapshots", async () => {
    expect(await formatComparison({ starter: null, solution: null }, "starter.ts")).toEqual({
      starter: null,
      solution: null,
    });
  });
});
