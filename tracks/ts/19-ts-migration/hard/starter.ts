export type MigrationTool = {
  name: string;
  needsCompilerApi: boolean;
};

export type MigrationPlanInput = {
  packageManager: "pnpm" | "npm";
  configPath: string;
  blockers: readonly string[];
  tools: readonly MigrationTool[];
};

export type MigrationStep =
  | { kind: "install"; command: string }
  | { kind: "fix"; blocker: string }
  | { kind: "typecheck"; compiler: "ts6" | "ts7"; command: string }
  | { kind: "tool"; name: string; compiler: "ts6" | "ts7" };

export function buildMigrationPlan(
  input: MigrationPlanInput,
): MigrationStep[] {
  // TODO: ułóż bezpieczny plan migracji TS 6 → 7
  void input;
  return [];
}
