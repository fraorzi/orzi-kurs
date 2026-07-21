import { describe, expect, it } from "vitest";
import { imageDescriptor, type Asset } from "./starter";

const TRUSTED_ORIGIN = "https://cms.example.com";

describe("Strapi media + Image", () => {
  it("tworzy pełny descriptor i przycina alternativeText", () => {
    const asset: Asset = {
      url: "/uploads/a.webp",
      width: 800,
      height: 600,
      alternativeText: " Okładka ",
    };
    expect(imageDescriptor(asset, TRUSTED_ORIGIN)).toEqual({
      src: "https://cms.example.com/uploads/a.webp",
      width: 800,
      height: 600,
      alt: "Okładka",
    });
  });

  it("domyślnie ustawia pusty alt, gdy alternativeText nie jest podany", () => {
    const asset: Asset = { url: "/uploads/b.webp", width: 100, height: 100 };
    expect(imageDescriptor(asset, TRUSTED_ORIGIN).alt).toBe("");
  });

  it("odrzuca obcy origin", () => {
    const asset: Asset = { url: "https://evil.test/a", width: 1, height: 1 };
    expect(() => imageDescriptor(asset, TRUSTED_ORIGIN)).toThrow(/origin/);
  });

  it("odrzuca nieprawidłowe wymiary", () => {
    const zeroWidth: Asset = { url: "/a.webp", width: 0, height: 100 };
    const fractionalHeight: Asset = {
      url: "/a.webp",
      width: 100,
      height: 100.5,
    };
    expect(() => imageDescriptor(zeroWidth, TRUSTED_ORIGIN)).toThrow(
      /dimensions/i,
    );
    expect(() => imageDescriptor(fractionalHeight, TRUSTED_ORIGIN)).toThrow(
      /dimensions/i,
    );
  });

  it("akceptuje bezwzględny URL z tego samego originu", () => {
    const asset: Asset = {
      url: "https://cms.example.com/uploads/c.webp",
      width: 400,
      height: 300,
    };
    expect(imageDescriptor(asset, TRUSTED_ORIGIN).src).toBe(
      "https://cms.example.com/uploads/c.webp",
    );
  });
});
