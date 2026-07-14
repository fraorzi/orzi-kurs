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
  progress?: TaskProgress;
  error?: string;
}

export interface AttemptRecord {
  at: string;
  passed: boolean;
  usedHint: boolean;
  durationMs: number;
  failedTests: number;
  lintErrors: number;
  error?: string;
}

export interface TaskProgress {
  status: "passed" | "passed-with-hint" | "failed" | "not-started";
  attempts: number;
  history?: AttemptRecord[];
  masteryScore?: number;
  cleanPassStreak?: number;
  nextReviewAt?: string;
  lastAttemptPassed?: boolean;
  resetCount?: number;
  lastResetAt?: string;
  firstPassedAt?: string;
  firstPassedWithHintAt?: string;
  firstPassedWithoutHintAt?: string;
  lastRunAt: string;
}

export type Progress = Record<string, TaskProgress>;
