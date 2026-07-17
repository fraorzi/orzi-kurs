import { describe, expect, it } from "vitest";
import { chooseTestLayer, type Scenario, type TestLayer } from "./starter";

describe("chooseTestLayer", () => {
  it.each<[Scenario, TestLayer]>([
    ["pure-logic", "unit"],
    ["sync-server-component", "unit"],
    ["client-component", "unit"],
    ["route-handler", "integration"],
    ["database-dal", "integration"],
    ["server-action-repository", "integration"],
    ["async-server-component", "e2e"],
    ["streaming-hydration", "e2e"],
    ["multi-page-journey", "e2e"],
  ])("dobiera %s → %s", (scenario, layer) => {
    expect(chooseTestLayer(scenario)).toBe(layer);
  });
});
