import { describe, expect, it } from "vitest";
import { buildCatalog } from "./catalog";
import { buildRoadmap } from "../app/lib/roadmap";
import type { Catalog, CatalogTopic, TaskStatus } from "../app/lib/types";

function topic(id: string, ...statuses: TaskStatus[]): CatalogTopic {
  return {
    id,
    title: id,
    levels: statuses.map((status, index) => ({
      id: ["easy", "medium", "hard"][index],
      status,
      attempts: status === "not-started" ? 0 : 1,
      masteryScore: 0,
    })),
  };
}

describe("learning roadmap", () => {
  it("centers the earliest unfinished core topic, even when later courses were started", () => {
    const roadmap = buildRoadmap({
      tracks: [
        { id: "react", topics: [topic("react/01-components-props-purity", "failed")] },
        {
          id: "js",
          topics: [
            topic("js/02-scope", "not-started"),
            topic("js/01-functions", "passed", "passed-with-hint"),
          ],
        },
      ],
    });
    expect(roadmap.current?.id).toBe("js/02-scope");
    expect(roadmap.passed).toBe(1);
    expect(roadmap.steps[0].topic.status).toBe("complete");
    expect(roadmap.steps.at(-1)?.topic.href).toBe("/track/react/01-components-props-purity");
  });

  it("keeps partial topics current and counts tasks separately from topics", () => {
    const roadmap = buildRoadmap({
      tracks: [{ id: "js", topics: [topic("js/01-functions", "passed", "failed", "not-started")] }],
    });
    expect(roadmap.current).toMatchObject({ status: "started", passed: 1, total: 3 });
    expect(roadmap.passed).toBe(0);
  });

  it("branches electives off the core and advances to TypeScript without completing them", () => {
    const catalog: Catalog = {
      tracks: [
        {
          id: "js",
          topics: [
            topic("js/18-weakmap-weakset", "passed"),
            topic("js/18b-weakref", "not-started"),
          ],
        },
        { id: "ts", topics: [topic("ts/01-basic-types", "not-started")] },
      ],
    };
    const roadmap = buildRoadmap(catalog);
    expect(roadmap.current?.id).toBe("ts/01-basic-types");
    expect(roadmap.steps[0].branches[0].id).toBe("js/18b-weakref");
    expect(roadmap.total).toBe(3);
  });

  it("returns to unfinished electives once the core is complete", () => {
    const roadmap = buildRoadmap({
      tracks: [
        {
          id: "js",
          topics: [topic("js/18-weakmap-weakset", "passed"), topic("js/18b-weakref", "failed")],
        },
      ],
    });
    expect(roadmap.current?.id).toBe("js/18b-weakref");
  });

  it("handles an empty or fully completed catalog without inventing a current topic", () => {
    expect(buildRoadmap({ tracks: [] })).toMatchObject({ current: null, total: 0, passed: 0 });
    expect(
      buildRoadmap({
        tracks: [{ id: "js", topics: [topic("js/01-functions", "passed-with-hint")] }],
      }),
    ).toMatchObject({ current: null, total: 1, passed: 1 });
  });

  it("does not drop electives whose original parent is absent", () => {
    const roadmap = buildRoadmap({
      tracks: [{ id: "js", topics: [topic("js/18b-weakref", "not-started")] }],
    });
    expect(roadmap.total).toBe(1);
    expect(roadmap.current?.id).toBe("js/18b-weakref");
  });

  it("represents every real catalog topic exactly once, with valid topic links", () => {
    const catalog = buildCatalog({});
    const roadmap = buildRoadmap(catalog);
    const actual = roadmap.steps.flatMap((step) => [step.topic, ...step.branches]);
    const expected = catalog.tracks.flatMap((track) => track.topics.map((item) => item.id));
    expect(actual.map((item) => item.id).sort()).toEqual(expected.sort());
    expect(new Set(actual.map((item) => item.id)).size).toBe(actual.length);
    expect(actual.every((item) => item.href === `/track/${item.id}`)).toBe(true);
    expect(roadmap.steps.every((step) => step.branches.length <= 1)).toBe(true);
    expect(roadmap.current?.id).toBe("js/01-functions");
  });
});
