import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const routes = [
  { method: "GET", path: "/items" },
  { method: "DELETE", path: "/items" },
  { method: "GET", path: "/health" },
];

describe("router: metoda + pathname", () => {
  it("dopasowuje metodę i ścieżkę", () => {
    expect(solve(routes, "GET", "/items")).toEqual({ status: 200 });
  });

  it("ignoruje query string przy dopasowaniu", () => {
    expect(solve(routes, "GET", "/items?page=2&sort=asc")).toEqual({
      status: 200,
    });
  });

  it("zwraca 405 z posortowaną listą Allow dla złej metody", () => {
    expect(solve(routes, "POST", "/items")).toEqual({
      status: 405,
      allow: ["DELETE", "GET"],
    });
  });

  it("nie duplikuje metod w Allow", () => {
    const doubled = [...routes, { method: "GET", path: "/items" }];
    expect(solve(doubled, "POST", "/items")).toEqual({
      status: 405,
      allow: ["DELETE", "GET"],
    });
  });

  it("zwraca 404 dla nieznanej ścieżki", () => {
    expect(solve(routes, "GET", "/missing")).toEqual({ status: 404 });
  });
});
