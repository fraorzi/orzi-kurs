import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("bezpieczny kanał zdarzeń", () => {
  it("emisja error nie rzuca i trafia do report", () => {
    const report = vi.fn();
    const channel = solve(report);
    expect(() => channel.emit("error", new Error("awaria"))).not.toThrow();
    expect(report).toHaveBeenCalledWith("awaria");
  });

  it("report dostaje sam komunikat, bez obiektu błędu", () => {
    const report = vi.fn();
    const channel = solve(report);
    const error = Object.assign(new Error("timeout"), {
      config: { authorization: "Bearer sekret" },
    });
    channel.emit("error", error);
    expect(report).toHaveBeenCalledTimes(1);
    expect(report.mock.calls[0]).toEqual(["timeout"]);
  });

  it("handler error istnieje od chwili powstania kanału", () => {
    const channel = solve(vi.fn());
    expect(channel.listenerCount("error")).toBeGreaterThan(0);
  });

  it("subskrypcje konsumentów działają i nie psują handlera błędów", () => {
    const report = vi.fn();
    const channel = solve(report);
    const listener = vi.fn();
    channel.on("job", listener);
    channel.emit("job", 1);
    channel.off("job", listener);
    channel.emit("job", 2);
    channel.emit("error", new Error("po sprzątaniu"));
    expect(listener).toHaveBeenCalledTimes(1);
    expect(report).toHaveBeenCalledWith("po sprzątaniu");
  });
});
