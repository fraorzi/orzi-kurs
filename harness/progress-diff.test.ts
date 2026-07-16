import { describe, expect, it } from "vitest";
import { changedProgressTaskIds } from "./progress-diff";

describe("progress diff", () => {
  it("reports only task entries whose persisted value changed", () => {
    const before = {
      "js/01-functions/easy": {
        status: "passed" as const,
        attempts: 1,
        lastRunAt: "2026-07-14T10:00:00.000Z",
      },
      "js/02-scope/easy": {
        status: "failed" as const,
        attempts: 1,
        lastRunAt: "2026-07-14T11:00:00.000Z",
      },
    };
    const after = {
      ...before,
      "js/01-functions/easy": {
        ...before["js/01-functions/easy"],
        attempts: 2,
      },
      "js/03-types-coercion/easy": {
        status: "passed" as const,
        attempts: 1,
        lastRunAt: "2026-07-14T12:00:00.000Z",
      },
    };

    expect(changedProgressTaskIds(before, after)).toEqual([
      "js/01-functions/easy",
      "js/03-types-coercion/easy",
    ]);
  });
});
