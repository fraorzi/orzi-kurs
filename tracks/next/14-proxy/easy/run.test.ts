import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";
import { config } from "./starter";

describe("config.matcher", () => {
  it.each(["/", "/dashboard", "/products/p-1", "/pl/account/settings"])(
    "obejmuje trasę aplikacji %s",
    (pathname) => {
      expect(unstable_doesMiddlewareMatch({
        config,
        url: `https://example.com${pathname}`,
      })).toBe(true);
    },
  );

  it.each([
    "/api/orders",
    "/_next/static/chunks/app.js",
    "/_next/image?url=%2Fhero.jpg&w=640&q=75",
    "/favicon.ico",
    "/sitemap.xml",
    "/robots.txt",
  ])("pomija zasób %s", (pathname) => {
    expect(unstable_doesMiddlewareMatch({
      config,
      url: `https://example.com${pathname}`,
    })).toBe(false);
  });
});
