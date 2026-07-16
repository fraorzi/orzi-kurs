export type Level = "easy" | "medium" | "hard";
export type TaskStatus = "passed" | "passed-with-hint" | "failed" | "not-started";

export interface CatalogLevel {
  id: string;
  status: TaskStatus;
  attempts: number;
  masteryScore: number;
  nextReviewAt?: string;
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

export interface TypeIssue {
  file: string;
  line: number;
  code: string;
  message: string;
}

export interface SubmitResult {
  taskId: string;
  passed: boolean;
  tests: TestResult[];
  lint: { errors: LintIssue[]; warnings: LintIssue[] };
  typecheck: { errors: TypeIssue[] };
  durationMs: number;
  usedHint?: boolean;
  progress?: TaskProgress;
  error?: string;
}

export interface TaskProgress {
  status: TaskStatus;
  attempts: number;
  masteryScore?: number;
  cleanPassStreak?: number;
  nextReviewAt?: string;
  lastAttemptPassed?: boolean;
  resetCount?: number;
  lastResetAt?: string;
  firstPassedAt?: string;
  firstPassedWithHintAt?: string;
  firstPassedWithoutHintAt?: string;
  verifiedStarter?: string;
  lastRunAt: string;
}

export interface TaskResponse {
  readme: string;
  taskMd: string;
  hintsTotal: number;
  starterPath: string | null;
  starter: string | null;
  solution: string | null;
  progress: TaskProgress | null;
  error?: string;
}
