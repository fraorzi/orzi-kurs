import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { metricLine } from "./src/dashboard";
import {
  summarize,
  type MetricSample,
  type MetricSummary,
} from "./src/legacy-metrics.js";

describe("legacy-metrics.d.ts", () => {
  it("opisuje dane i wynik bez utraty typów", () => {
    type _sample = Expect<
      Equal<MetricSample, { name: string; value: number }>
    >;
    type _summary = Expect<
      Equal<
        MetricSummary,
        { count: number; total: number; average: number }
      >
    >;
    const result = summarize([{ name: "latency", value: 10 }]);
    expect(result).toEqual({ count: 1, total: 10, average: 10 });
  });

  it("odrzuca wartość metryki o złym typie", () => {
    const illegal = (): MetricSample => ({
      name: "latency",
      // @ts-expect-error value jest number
      value: "10",
    });
    expect(illegal).toBeTypeOf("function");
  });
});

describe("metricLine", () => {
  it("formatuje średnią i pusty zbiór", () => {
    expect(
      metricLine("latency", [
        { name: "latency", value: 10 },
        { name: "latency", value: 20 },
      ]),
    ).toBe("latency: count=2, avg=15.00");
    expect(metricLine("latency", [])).toBe(
      "latency: count=0, avg=0.00",
    );
  });
});
