import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Napraw brak populate relacji", () => {
  it("wyciąga coverUrl, gdy relacja została jawnie spopulowana", () => {
    expect(solve({ title: "Artykuł", cover: { url: "/img/a.jpg" } })).toEqual({
      title: "Artykuł",
      coverUrl: "/img/a.jpg",
    });
  });

  it("nie rzuca, gdy zapytanie REST nie populate'owało cover (klucz nieobecny)", () => {
    expect(() => solve({ title: "Artykuł" })).not.toThrow();
    expect(solve({ title: "Artykuł" })).toEqual({ title: "Artykuł", coverUrl: null });
  });

  it("traktuje spopulowaną, ale pustą relację (null) tak samo jak brak populate", () => {
    expect(solve({ title: "Artykuł", cover: null })).toEqual({ title: "Artykuł", coverUrl: null });
  });

  it("zachowuje title niezależnie od stanu populate", () => {
    expect(solve({ title: "Bez okładki" }).title).toBe("Bez okładki");
    expect(solve({ title: "Z okładką", cover: { url: "/x.jpg" } }).title).toBe("Z okładką");
  });
});
