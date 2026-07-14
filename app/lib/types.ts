export type Level = "easy" | "medium" | "hard";
export type TaskStatus = "passed" | "passed-with-hint" | "failed" | "not-started";

export interface CatalogLevel {
  id: string;
  status: TaskStatus;
}

export interface CatalogTopic {
  id: string;
  title: string;
  levels: CatalogLevel[];
}

export interface CatalogTrack {
  id: string;
  topics: CatalogTopic[];
}

export interface Catalog {
  tracks: CatalogTrack[];
}

export interface LearningResource {
  title: string;
  url: string;
  description: string;
}

export interface TestResult {
  name: string;
  status: "pass" | "fail";
  message?: string;
}

export interface LintIssue {
  ruleId: string;
  message: string;
  line: number;
}

export interface SubmitResult {
  taskId: string;
  passed: boolean;
  tests: TestResult[];
  lint: { errors: LintIssue[]; warnings: LintIssue[] };
  durationMs: number;
  usedHint?: boolean;
  error?: string;
}

export interface TaskResponse {
  readme: string;
  taskMd: string;
  hintsTotal: number;
  starterPath: string | null;
  solution: string | null;
  error?: string;
}
