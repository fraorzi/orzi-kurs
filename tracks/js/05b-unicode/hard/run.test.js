import { describe, it, expect } from "vitest";
import { graphemeCount, truncateGraphemes } from "./starter.js";

const FAMILY = "👨‍👩‍👧‍👦"; // 7 punktów kodowych sklejonych ZWJ, 1 grafem
const FLAG = "🇵🇱"; // 2 symbole regionalne, 1 grafem

describe("graphemeCount", () => {
  it("liczy zwykłe znaki i pojedyncze emoji", () => {
    expect(graphemeCount("a😀b")).toBe(3);
    expect(graphemeCount("")).toBe(0);
  });

  it("emoji ZWJ (rodzina) to jeden grafem, nie siedem punktów kodowych", () => {
    expect(
      [...FAMILY].length,
      "kontrola: rodzina ma 7 punktów kodowych",
    ).toBe(7);
    expect(
      graphemeCount(FAMILY),
      "Intl.Segmenter z granularity 'grapheme' scala klaster ZWJ w jeden grafem",
    ).toBe(1);
  });

  it("flaga to jeden grafem", () => {
    expect(graphemeCount(FLAG)).toBe(1);
  });
});

describe("truncateGraphemes", () => {
  it("tnie po grafemach, nie po jednostkach", () => {
    expect(
      truncateGraphemes("a😀b🎉c", 3),
      "3 grafemy 'a😀b' — cięcie po jednostkach UTF-16 rozbiłoby emoji",
    ).toBe("a😀b");
  });

  it("nie rozcina klastra ZWJ w środku", () => {
    expect(
      truncateGraphemes(FAMILY + "x", 1),
      "pierwszy grafem to cała rodzina — nie wolno jej rozciąć na części ZWJ",
    ).toBe(FAMILY);
  });

  it("gdy grafemów jest nie więcej niż max, zwraca cały napis", () => {
    expect(truncateGraphemes("hi", 5)).toBe("hi");
  });
});
