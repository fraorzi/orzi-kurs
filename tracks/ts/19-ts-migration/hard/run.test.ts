import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  buildMigrationPlan,
  type MigrationStep,
} from "./starter";

describe("buildMigrationPlan", () => {
  it("układa pnpm pipeline z narzędziami API na TS 6", () => {
    const plan = buildMigrationPlan({
      packageManager: "pnpm",
      configPath: "tsconfig.json",
      blockers: ["base-url", "legacy-resolution"],
      tools: [
        { name: "typescript-eslint", needsCompilerApi: true },
        { name: "declaration-check", needsCompilerApi: false },
      ],
    });
    type _plan = Expect<Equal<typeof plan, MigrationStep[]>>;
    expect(plan).toEqual([
      {
        kind: "install",
        command:
          "pnpm add -D typescript@npm:@typescript/typescript6@^6.0.3 @typescript/native@npm:typescript@^7.0.2",
      },
      { kind: "fix", blocker: "base-url" },
      { kind: "fix", blocker: "legacy-resolution" },
      {
        kind: "typecheck",
        compiler: "ts6",
        command:
          "pnpm exec tsc6 --stableTypeOrdering --noEmit -p tsconfig.json",
      },
      { kind: "tool", name: "typescript-eslint", compiler: "ts6" },
      {
        kind: "typecheck",
        compiler: "ts7",
        command: "pnpm exec tsc --noEmit -p tsconfig.json",
      },
      { kind: "tool", name: "declaration-check", compiler: "ts7" },
    ]);
  });

  it("generuje odpowiednie komendy npm i nie dodaje ignoreDeprecations", () => {
    const plan = buildMigrationPlan({
      packageManager: "npm",
      configPath: "configs/tsconfig.app.json",
      blockers: [],
      tools: [],
    });
    expect(plan).toEqual([
      {
        kind: "install",
        command:
          "npm install --save-dev typescript@npm:@typescript/typescript6@^6.0.3 @typescript/native@npm:typescript@^7.0.2",
      },
      {
        kind: "typecheck",
        compiler: "ts6",
        command:
          "npx tsc6 --stableTypeOrdering --noEmit -p configs/tsconfig.app.json",
      },
      {
        kind: "typecheck",
        compiler: "ts7",
        command: "npx tsc --noEmit -p configs/tsconfig.app.json",
      },
    ]);
    expect(
      plan.some(
        (step) =>
          "command" in step && step.command.includes("ignoreDeprecations"),
      ),
    ).toBe(false);
  });
});
