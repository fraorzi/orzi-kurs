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

export function chooseTestLayer(_scenario: Scenario): TestLayer {
  return "e2e";
}
