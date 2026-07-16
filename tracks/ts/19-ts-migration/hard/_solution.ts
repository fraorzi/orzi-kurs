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
  const exec = input.packageManager === "pnpm" ? "pnpm exec" : "npx";
  const install =
    input.packageManager === "pnpm"
      ? "pnpm add -D typescript@npm:@typescript/typescript6@^6.0.3 @typescript/native@npm:typescript@^7.0.2"
      : "npm install --save-dev typescript@npm:@typescript/typescript6@^6.0.3 @typescript/native@npm:typescript@^7.0.2";

  return [
    { kind: "install", command: install },
    ...input.blockers.map(
      (blocker): MigrationStep => ({ kind: "fix", blocker }),
    ),
    {
      kind: "typecheck",
      compiler: "ts6",
      command:
        `${exec} tsc6 --stableTypeOrdering --noEmit -p ${input.configPath}`,
    },
    ...input.tools
      .filter((tool) => tool.needsCompilerApi)
      .map(
        (tool): MigrationStep => ({
          kind: "tool",
          name: tool.name,
          compiler: "ts6",
        }),
      ),
    {
      kind: "typecheck",
      compiler: "ts7",
      command: `${exec} tsc --noEmit -p ${input.configPath}`,
    },
    ...input.tools
      .filter((tool) => !tool.needsCompilerApi)
      .map(
        (tool): MigrationStep => ({
          kind: "tool",
          name: tool.name,
          compiler: "ts7",
        }),
      ),
  ];
}
