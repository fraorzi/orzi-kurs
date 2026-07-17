import { describe, expect, it, vi } from "vitest";
import { runCheckoutJourney, type BrowserPage, type Locator } from "./starter";

describe("runCheckoutJourney", () => {
  it("pokrywa krytyczny przepływ przez semantyczne lokatory", async () => {
    const events: string[] = [];
    function locator(label: string): Locator {
      return {
        click: vi.fn(async () => { events.push(`click:${label}`); }),
        fill: vi.fn(async (value) => { events.push(`fill:${label}:${value}`); }),
      };
    }
    const page: BrowserPage = {
      goto: vi.fn(async (path) => { events.push(`goto:${path}`); }),
      getByRole: vi.fn((role, { name }) => locator(`${role}:${name}`)),
      getByText: vi.fn((text) => locator(`text:${text}`)),
      waitForURL: vi.fn(async (pattern) => {
        expect(pattern.test("https://example.com/orders/o-42")).toBe(true);
        events.push("wait:order-url");
      }),
      expectVisible: vi.fn(async () => { events.push("expect:visible"); }),
    };

    await runCheckoutJourney(page);

    expect(events).toEqual([
      "goto:/products",
      "click:link:Kawa",
      "click:button:Dodaj do koszyka",
      "click:link:Koszyk",
      "expect:visible",
      "expect:visible",
      "click:link:Do kasy",
      "fill:textbox:Email:ada@example.com",
      "click:button:Złóż zamówienie",
      "wait:order-url",
      "expect:visible",
    ]);
    expect(page.getByText).toHaveBeenCalledWith("1 produkt");
  });
});
