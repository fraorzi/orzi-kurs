import { getRedirectUrl } from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./starter";

describe("proxy auth prefilter", () => {
  it("zachowuje chronioną podtrasę i query w redirect", () => {
    const response = proxy(new NextRequest(
      "https://example.com/dashboard/projects?sort=recent&page=2",
    ));
    expect(getRedirectUrl(response)).toBe(
      "https://example.com/login?next=%2Fdashboard%2Fprojects%3Fsort%3Drecent%26page%3D2",
    );
  });

  it("przepuszcza request z cookie sesyjnym", () => {
    const response = proxy(new NextRequest("https://example.com/dashboard", {
      headers: { cookie: "session=signed-token" },
    }));
    expect(getRedirectUrl(response)).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("nie blokuje publicznej trasy", () => {
    const response = proxy(new NextRequest("https://example.com/pricing"));
    expect(getRedirectUrl(response)).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
