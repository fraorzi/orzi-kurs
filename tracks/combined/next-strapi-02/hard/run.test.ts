import { describe, expect, it } from "vitest"; import { imageDescriptor } from "./starter";
describe("Strapi media + Image", () => { it("tworzy pełny descriptor", () => { expect(imageDescriptor({ url: "/uploads/a.webp", width: 800, height: 600, alternativeText: " Okładka " }, "https://cms.example.com")).toEqual({ src: "https://cms.example.com/uploads/a.webp", width: 800, height: 600, alt: "Okładka" }); }); it("odrzuca obcy origin", () => { expect(() => imageDescriptor({ url: "https://evil.test/a", width: 1, height: 1 }, "https://cms.example.com")).toThrow(/origin/); }); });

