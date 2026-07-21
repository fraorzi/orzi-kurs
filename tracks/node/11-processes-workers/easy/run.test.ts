import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("bezpieczny spec wywołania", () => {
  it("buduje spec z tablicą argumentów i shell: false", () => {
    expect(solve("in/a.jpg", "out/a.webp", "webp")).toEqual({
      file: "img-tool",
      args: ["--input", "in/a.jpg", "--output", "out/a.webp", "--format", "webp"],
      shell: false,
    });
  });

  it("odrzuca znaki interpretowalne przez shell w ścieżkach", () => {
    expect(() => solve("a.jpg; rm -rf /", "out.webp", "webp")).toThrow();
    expect(() => solve("a.jpg", "out$(whoami).webp", "webp")).toThrow();
    expect(() => solve("plik ze spacją.jpg", "out.webp", "webp")).toThrow();
  });

  it("odrzuca format spoza allow-listy", () => {
    expect(() => solve("a.jpg", "b.gif", "gif")).toThrow();
    expect(() => solve("a.jpg", "b.exe", "exe")).toThrow();
  });

  it("akceptuje oba dozwolone formaty", () => {
    expect(solve("a.jpg", "b.png", "png").args).toContain("png");
    expect(solve("a.jpg", "b.webp", "webp").args).toContain("webp");
  });
});
