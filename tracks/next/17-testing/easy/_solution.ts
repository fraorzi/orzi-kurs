export type Scenario =
  | "pure-logic"
  | "sync-server-component"
  | "client-component"
  | "route-handler"
  | "database-dal"
  | "server-action-repository"
  | "async-server-component"
  | "streaming-hydration"
  | "multi-page-journey";

export type TestLayer = "unit" | "integration" | "e2e";

export function chooseTestLayer(scenario: Scenario): TestLayer {
  if (
    scenario === "async-server-component" ||
    scenario === "streaming-hydration" ||
    scenario === "multi-page-journey"
  ) return "e2e";
  if (
    scenario === "route-handler" ||
    scenario === "database-dal" ||
    scenario === "server-action-repository"
  ) return "integration";
  return "unit";
}
