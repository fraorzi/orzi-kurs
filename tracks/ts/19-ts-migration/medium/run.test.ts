import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  auditTs7Readiness,
  type MigrationIssue,
} from "./starter";

describe("auditTs7Readiness", () => {
  it("wykrywa blockery i zmiany domyślne w stabilnej kolejności", () => {
    const result = auditTs7Readiness(
      {
        baseUrl: "./src",
        moduleResolution: "node10",
        module: "umd",
        esModuleInterop: false,
      },
      {
        environment: "bundler",
        requiredGlobalTypes: ["node", "vitest/globals"],
        tsconfigAboveSource: true,
        usesImportAssertions: true,
        usesLegacyNamespaceModule: true,
        invokesTscWithFiles: true,
      },
    );
    type _result = Expect<Equal<typeof result, MigrationIssue[]>>;
    expect(result.map((issue) => issue.code)).toEqual([
      "base-url",
      "module-resolution",
      "module-kind",
      "interop-false",
      "import-assertion",
      "legacy-namespace",
      "implicit-types",
      "implicit-root-dir",
      "implicit-strict",
      "single-file-cli",
    ]);
    expect(result[1]?.recommendation).toBe(
      "Ustaw moduleResolution na bundler.",
    );
    expect(result[6]?.recommendation).toBe(
      "Ustaw types na: node, vitest/globals.",
    );
  });

  it("dobiera nodenext dla projektu uruchamianego bez bundlera", () => {
    const result = auditTs7Readiness(
      {
        moduleResolution: "classic",
        types: ["node"],
        rootDir: "./src",
        strict: true,
      },
      {
        environment: "node",
        requiredGlobalTypes: ["node"],
        tsconfigAboveSource: false,
        usesImportAssertions: false,
        usesLegacyNamespaceModule: false,
        invokesTscWithFiles: false,
      },
    );
    expect(result).toEqual([
      {
        code: "module-resolution",
        severity: "blocker",
        recommendation: "Ustaw moduleResolution na nodenext.",
      },
    ]);
  });

  it("zwraca pustą listę dla jawnej nowoczesnej konfiguracji", () => {
    expect(
      auditTs7Readiness(
        {
          moduleResolution: "bundler",
          module: "esnext",
          types: ["node"],
          rootDir: "./src",
          strict: true,
        },
        {
          environment: "bundler",
          requiredGlobalTypes: ["node"],
          tsconfigAboveSource: true,
          usesImportAssertions: false,
          usesLegacyNamespaceModule: false,
          invokesTscWithFiles: false,
        },
      ),
    ).toEqual([]);
  });
});
