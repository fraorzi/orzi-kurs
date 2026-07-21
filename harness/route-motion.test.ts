import { describe, expect, it } from "vitest";
import { routeDirection } from "../app/lib/route-motion";

describe("routeDirection", () => {
  it.each([
    ["/", "/"],
    ["/track/js", "/track/js"],
    ["/track/js/01-basics", "/track/js/01-basics"],
    ["/track/js/01-basics/easy", "/track/js/01-basics/easy"],
  ])("keeps the same route neutral: %s", (previousPathname, pathname) => {
    expect(routeDirection(previousPathname, pathname)).toBe(0);
  });

  it.each([
    ["/", "/track/js"],
    ["/track/js", "/track/js/01-basics"],
    ["/track/js/01-basics", "/track/js/01-basics/easy"],
    ["/", "/track/js/01-basics/easy"],
  ])("moves forward into a descendant: %s -> %s", (previousPathname, pathname) => {
    expect(routeDirection(previousPathname, pathname)).toBe(1);
  });

  it.each([
    ["/track/js", "/"],
    ["/track/js/01-basics", "/track/js"],
    ["/track/js/01-basics/easy", "/track/js/01-basics"],
    ["/track/js/01-basics/easy", "/"],
  ])("moves backward into an ancestor: %s -> %s", (previousPathname, pathname) => {
    expect(routeDirection(previousPathname, pathname)).toBe(-1);
  });

  it.each([
    ["/track/js/01-basics/easy", "/track/react"],
    ["/track/react", "/track/js/01-basics/easy"],
  ])("keeps unrelated branches neutral across depths: %s -> %s", (previousPathname, pathname) => {
    expect(routeDirection(previousPathname, pathname)).toBe(0);
  });

  it("keeps sibling levels neutral", () => {
    expect(
      routeDirection(
        "/track/js/01-basics/easy",
        "/track/js/01-basics/hard",
      ),
    ).toBe(0);
  });

  it("keeps sibling topics neutral", () => {
    expect(
      routeDirection("/track/js/01-basics", "/track/js/02-functions"),
    ).toBe(0);
  });

  it("keeps sibling tracks neutral", () => {
    expect(routeDirection("/track/js", "/track/react")).toBe(0);
  });
});
