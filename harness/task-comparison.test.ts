import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { format } from "prettier";
import { describe, expect, it, vi } from "vitest";
import { GET } from "../app/api/task/route";
import LevelPage from "../app/track/[track]/[topic]/[level]/page";
import { TRACKS_ROOT } from "./paths";
import type { Progress } from "./types";

const state = vi.hoisted<{ progress: Progress }>(() => ({ progress: {} }));
vi.mock("./progress", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./progress")>()),
  readProgress: () => state.progress,
}));

const taskId = "react/01-components-props-purity/easy";

describe("task comparison data flow", () => {
  it("formats both the API response and the page without changing the saved snapshot", async () => {
    const reference = readFileSync(join(TRACKS_ROOT, taskId, "_solution.tsx"), "utf8");
    const snapshot = await format(reference, {
      parser: "typescript",
      printWidth: 140,
      semi: false,
      singleQuote: true,
    });
    state.progress = {
      [taskId]: {
        status: "passed",
        attempts: 1,
        lastRunAt: "2026-09-05T00:00:00Z",
        verifiedStarter: snapshot,
      },
    };
    const response = await GET(new NextRequest(`http://localhost/api/task?id=${taskId}`));
    const data = await response.json();
    expect(data.starter).toBe(data.solution);
    expect(data.starter).not.toBe(snapshot);

    const page = await LevelPage({
      params: Promise.resolve({
        track: "react",
        topic: "01-components-props-purity",
        level: "easy",
      }),
    });
    expect(page.props.initialStarter).toBe(page.props.initialSolution);
    expect(page.props.initialStarter).toBe(data.starter);
    expect(state.progress[taskId].verifiedStarter).toBe(snapshot);
  });

  it("keeps the reference locked before a passing submission", async () => {
    state.progress = {};
    const response = await GET(new NextRequest(`http://localhost/api/task?id=${taskId}`));
    const data = await response.json();
    expect(data.solution).toBeNull();
    expect(data.starter).toBeNull();
  });
});
