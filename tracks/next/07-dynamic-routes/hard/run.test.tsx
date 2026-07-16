import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@harness/next-test";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import Page, { generateStaticParams } from "./src/page";

describe("localized product route", () => {
  it("generuje parametry zgodne z nazwami segmentów", async () => {
    await expect(generateStaticParams()).resolves.toEqual([
      { locale: "pl", slug: "monitor" },
      { locale: "en", slug: "keyboard" },
    ]);
  });

  it("renderuje istniejący produkt po await params", async () => {
    render(await Page({ params: Promise.resolve({ locale: "en", slug: "keyboard" }) }));
    expect(screen.getByRole("article")).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading")).toHaveTextContent("en:keyboard");
  });

  it.each([
    { locale: "de", slug: "keyboard" },
    { locale: "pl", slug: "missing" },
  ])("zwraca not-found dla $locale/$slug", async (params) => {
    await expect(Page({ params: Promise.resolve(params) })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
  });
});
