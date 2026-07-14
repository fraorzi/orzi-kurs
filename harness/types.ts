export type Level = "easy" | "medium" | "hard";

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
  error?: string;
}

export interface TaskProgress {
  status: "passed" | "passed-with-hint" | "failed";
  attempts: number;
  firstPassedAt?: string;
  firstPassedWithHintAt?: string;
  firstPassedWithoutHintAt?: string;
  lastRunAt: string;
}

export type Progress = Record<string, TaskProgress>;
