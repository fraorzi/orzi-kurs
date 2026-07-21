import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("normalizacja repeatable komponentu FAQ", () => {
  it("przycina białe znaki i usuwa techniczne id", () => {
    expect(solve([{ id: 1, question: " Q? ", answer: " A " }])).toEqual([
      { question: "Q?", answer: "A" },
    ]);
  });

  it("odrzuca element z pustym pytaniem", () => {
    expect(solve([{ id: 2, question: "", answer: "x" }])).toEqual([]);
  });

  it("odrzuca element z pustą odpowiedzią po przycięciu", () => {
    expect(solve([{ id: 3, question: "Q?", answer: "   " }])).toEqual([]);
  });

  it("zachowuje kolejność wielu poprawnych elementów", () => {
    expect(
      solve([
        { id: 1, question: "Pierwsze?", answer: "A1" },
        { id: 2, question: "Drugie?", answer: "A2" },
      ]),
    ).toEqual([
      { question: "Pierwsze?", answer: "A1" },
      { question: "Drugie?", answer: "A2" },
    ]);
  });

  it("filtruje niepoprawne elementy, zachowując poprawne wokół nich", () => {
    expect(
      solve([
        { question: "Dobre?", answer: "Tak" },
        { question: "", answer: "Pominięte" },
        { question: "Też dobre?", answer: "Tak" },
      ]),
    ).toEqual([
      { question: "Dobre?", answer: "Tak" },
      { question: "Też dobre?", answer: "Tak" },
    ]);
  });
});
