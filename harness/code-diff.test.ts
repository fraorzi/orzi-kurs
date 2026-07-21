import { describe, expect, it } from "vitest";
import { buildCodeDiff } from "../app/lib/code-diff";

describe("code diff", () => {
  it("keeps identical lines as aligned context", () => {
    const result = buildCodeDiff("const value = 1;\nreturn value;\n", "const value = 1;\nreturn value;\n");

    expect(result.limited).toBe(false);
    expect(result.rows).toEqual([
      {
        left: { number: 1, text: "const value = 1;", hasLineTerminator: true },
        right: { number: 1, text: "const value = 1;", hasLineTerminator: true },
        kind: "context",
      },
      {
        left: { number: 2, text: "return value;", hasLineTerminator: true },
        right: { number: 2, text: "return value;", hasLineTerminator: true },
        kind: "context",
      },
    ]);
  });

  it("keeps the unchanged tail aligned after a single insertion", () => {
    const rows = buildCodeDiff("first\nthird\n", "first\nsecond\nthird\n").rows;

    expect(rows.map((row) => row.kind)).toEqual(["context", "add", "context"]);
    expect(rows[1]).toMatchObject({
      left: null,
      right: { number: 2, text: "second" },
    });
    expect(rows[2]).toMatchObject({
      left: { number: 2, text: "third" },
      right: { number: 3, text: "third" },
    });
  });

  it("keeps the unchanged tail aligned after a deletion", () => {
    const rows = buildCodeDiff("first\nsecond\nthird\n", "first\nthird\n").rows;

    expect(rows.map((row) => row.kind)).toEqual(["context", "remove", "context"]);
    expect(rows[1]).toMatchObject({
      left: { number: 2, text: "second" },
      right: null,
    });
    expect(rows[2]).toMatchObject({
      left: { number: 3, text: "third" },
      right: { number: 2, text: "third" },
    });
  });

  it("pairs a replacement and explains that it changed content", () => {
    const rows = buildCodeDiff("before\nold value\nafter", "before\nnew value\nafter").rows;

    expect(rows.map((row) => row.kind)).toEqual(["context", "change", "context"]);
    expect(rows[1]).toMatchObject({
      left: { number: 2, text: "old value" },
      right: { number: 2, text: "new value" },
      changeReason: "content",
    });
  });

  it("marks a whitespace-only replacement explicitly", () => {
    const rows = buildCodeDiff("  return value;", "    return value;").rows;

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      kind: "change",
      changeReason: "whitespace",
    });
  });

  it("treats trailing line whitespace as whitespace-only", () => {
    const rows = buildCodeDiff("return value;  ", "return value;\t").rows;

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      kind: "change",
      changeReason: "whitespace",
    });
  });

  it("treats whitespace changed inside code as content", () => {
    const rows = buildCodeDiff("  return value;", "return  value;  ").rows;

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      kind: "change",
      changeReason: "content",
    });
  });

  it("does not hide meaningful whitespace inside JavaScript literals", () => {
    const rows = buildCodeDiff(
      'return " ";\nconst template = `a b`;\nconst pattern = /a b/;',
      'return "";\nconst template = `ab`;\nconst pattern = /ab/;',
    ).rows;

    expect(rows).toHaveLength(3);
    expect(rows.every((row) => row.changeReason === "content")).toBe(true);
  });

  it("normalizes CRLF and LF line endings", () => {
    const rows = buildCodeDiff("first\r\nsecond\r\n", "first\nsecond\n").rows;

    expect(rows.map((row) => row.kind)).toEqual(["context", "context"]);
  });

  it("preserves a final newline as an exact, explainable difference", () => {
    const rows = buildCodeDiff("const value = 1;", "const value = 1;\n").rows;

    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      left: { number: 1, text: "const value = 1;", hasLineTerminator: false },
      right: { number: 1, text: "const value = 1;", hasLineTerminator: true },
      kind: "change",
      changeReason: "end-of-file-newline",
    });
  });

  it("returns no rows for two empty inputs and represents one blank line exactly", () => {
    expect(buildCodeDiff("", "").rows).toEqual([]);
    expect(buildCodeDiff("", "\n").rows).toEqual([
      {
        left: null,
        right: { number: 1, text: "", hasLineTerminator: true },
        kind: "add",
      },
    ]);
  });

  it("does not cascade changes after a large insertion", () => {
    const original = Array.from({ length: 1_200 }, (_, index) => `line-${index + 1}`);
    const inserted = Array.from({ length: 200 }, (_, index) => `inserted-${index + 1}`);
    const rows = buildCodeDiff(
      `${original.join("\n")}\n`,
      `${[...original.slice(0, 600), ...inserted, ...original.slice(600)].join("\n")}\n`,
    ).rows;

    expect(rows).toHaveLength(1_400);
    expect(rows.filter((row) => row.kind === "add")).toHaveLength(200);
    expect(rows.at(-1)).toMatchObject({
      kind: "context",
      left: { number: 1_200, text: "line-1200" },
      right: { number: 1_400, text: "line-1200" },
    });
  });

  it("uses a prefix-and-suffix fallback when the configured edit bound is exceeded", () => {
    const result = buildCodeDiff("first\nlast\n", "first\na\nb\nc\nlast\n", {
      maxEditLength: 1,
    });

    expect(result.limited).toBe(true);
    expect(result.rows.map((row) => row.kind)).toEqual([
      "context",
      "add",
      "add",
      "add",
      "context",
    ]);
    expect(result.rows.at(-1)).toMatchObject({
      left: { number: 2, text: "last" },
      right: { number: 5, text: "last" },
    });
  });
});
