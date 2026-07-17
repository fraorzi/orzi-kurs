export type CompilerOptionsSnapshot = {
  baseUrl?: string;
  moduleResolution?: string;
  module?: string;
  esModuleInterop?: boolean;
  allowSyntheticDefaultImports?: boolean;
  types?: readonly string[];
  rootDir?: string;
  strict?: boolean;
};

export type ProjectFacts = {
  environment: "bundler" | "node";
  requiredGlobalTypes: readonly string[];
  tsconfigAboveSource: boolean;
  usesImportAssertions: boolean;
  usesLegacyNamespaceModule: boolean;
  invokesTscWithFiles: boolean;
};

export type MigrationIssue = {
  code:
    | "base-url"
    | "module-resolution"
    | "module-kind"
    | "interop-false"
    | "import-assertion"
    | "legacy-namespace"
    | "implicit-types"
    | "implicit-root-dir"
    | "implicit-strict"
    | "single-file-cli";
  severity: "blocker" | "behavior-change";
  recommendation: string;
};

export function auditTs7Readiness(
  options: CompilerOptionsSnapshot,
  facts: ProjectFacts,
): MigrationIssue[] {
  const issues: MigrationIssue[] = [];
  if (options.baseUrl !== undefined) {
    issues.push({
      code: "base-url",
      severity: "blocker",
      recommendation: "Usuń baseUrl i wpisz jego prefiks w wartościach paths.",
    });
  }
  if (
    options.moduleResolution === "node" ||
    options.moduleResolution === "node10" ||
    options.moduleResolution === "classic"
  ) {
    issues.push({
      code: "module-resolution",
      severity: "blocker",
      recommendation:
        facts.environment === "bundler"
          ? "Ustaw moduleResolution na bundler."
          : "Ustaw moduleResolution na nodenext.",
    });
  }
  if (
    options.module === "amd" ||
    options.module === "umd" ||
    options.module === "systemjs" ||
    options.module === "none"
  ) {
    issues.push({
      code: "module-kind",
      severity: "blocker",
      recommendation: "Przenieś emit modułów do esnext, preserve albo nodenext.",
    });
  }
  if (
    options.esModuleInterop === false ||
    options.allowSyntheticDefaultImports === false
  ) {
    issues.push({
      code: "interop-false",
      severity: "blocker",
      recommendation: "Usuń wartości false i popraw importy CommonJS.",
    });
  }
  if (facts.usesImportAssertions) {
    issues.push({
      code: "import-assertion",
      severity: "blocker",
      recommendation: "Zastąp import assertions atrybutami importu z with.",
    });
  }
  if (facts.usesLegacyNamespaceModule) {
    issues.push({
      code: "legacy-namespace",
      severity: "blocker",
      recommendation: "Zmień module Foo na namespace Foo.",
    });
  }
  if (
    options.types === undefined &&
    facts.requiredGlobalTypes.length > 0
  ) {
    issues.push({
      code: "implicit-types",
      severity: "behavior-change",
      recommendation: `Ustaw types na: ${facts.requiredGlobalTypes.join(", ")}.`,
    });
  }
  if (options.rootDir === undefined && facts.tsconfigAboveSource) {
    issues.push({
      code: "implicit-root-dir",
      severity: "behavior-change",
      recommendation: "Ustaw jawne rootDir wskazujące katalog źródeł.",
    });
  }
  if (options.strict === undefined) {
    issues.push({
      code: "implicit-strict",
      severity: "behavior-change",
      recommendation: "Ustaw strict jawnie i napraw diagnostyki osobnym krokiem.",
    });
  }
  if (facts.invokesTscWithFiles) {
    issues.push({
      code: "single-file-cli",
      severity: "behavior-change",
      recommendation: "Użyj tsc -p albo dodaj --ignoreConfig dla pojedynczego pliku.",
    });
  }
  return issues;
}
