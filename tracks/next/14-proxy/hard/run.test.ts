import { getRewrittenUrl, isRewrite } from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./starter";

describe("proxy pricing experiment", () => {
  it.each([
    ["even", "a"],
    ["odd", "b"],
  ] as const)("wybiera stabilny bucket dla %s", (anonymousId, variant) => {
    const response = proxy(new NextRequest(
      "https://example.com/pricing?currency=PLN",
      { headers: { "x-anonymous-id": anonymousId } },
    ));
    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(
      `https://example.com/pricing/${variant}?currency=PLN`,
    );
    expect(response.headers.get("x-middleware-request-x-pricing-variant"))
      .toBe(variant);
    expect(response.headers.get("set-cookie")).toContain(
      `pricing-variant=${variant}`,
    );
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("SameSite=lax");
    expect(response.headers.get("set-cookie")).toContain("Max-Age=2592000");
  });

  it("preferuje istniejące poprawne cookie", () => {
    const response = proxy(new NextRequest("https://example.com/pricing", {
      headers: {
        cookie: "pricing-variant=b",
        "x-anonymous-id": "even",
      },
    }));
    expect(getRewrittenUrl(response)).toBe("https://example.com/pricing/b");
  });

  it("przepuszcza pozostałe trasy", () => {
    const response = proxy(new NextRequest("https://example.com/about"));
    expect(isRewrite(response)).toBe(false);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
