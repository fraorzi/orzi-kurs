import { describe, expect, it } from "vitest";
import { auditRendering, type RenderNode } from "./starter";

describe("auditRendering", () => {
  it("nie utożsamia asynchroniczności z dynamicznym renderem", () => {
    const nodes: RenderNode[] = [
      { name: "Navigation", source: "deterministic", async: false, insideSuspense: false },
      { name: "AsyncMarkdown", source: "deterministic", async: true, insideSuspense: false },
      {
        name: "Catalog",
        source: "cached",
        async: true,
        cacheProfile: "hours",
        insideSuspense: false,
      },
    ];

    expect(auditRendering(nodes)).toEqual({
      staticShell: ["Navigation", "AsyncMarkdown", "Catalog"],
      dynamicHoles: [],
      blockers: [],
    });
  });

  it("rozróżnia prawidłowe dynamiczne dziury od blockerów", () => {
    const nodes: RenderNode[] = [
      { name: "Viewer", source: "runtime", async: true, insideSuspense: true },
      { name: "Headers", source: "runtime", async: true, insideSuspense: false },
      {
        name: "LiveScore",
        source: "cached",
        async: true,
        cacheProfile: "seconds",
        insideSuspense: true,
      },
      {
        name: "LivePrice",
        source: "cached",
        async: true,
        cacheProfile: "seconds",
        insideSuspense: false,
      },
    ];

    expect(auditRendering(nodes)).toEqual({
      staticShell: [],
      dynamicHoles: ["Viewer", "LiveScore"],
      blockers: ["Headers", "LivePrice"],
    });
  });
});
