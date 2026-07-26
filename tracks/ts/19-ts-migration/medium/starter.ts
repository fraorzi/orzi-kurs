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
  // TODO
  void options;
  void facts;
  return [];
}
