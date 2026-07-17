export type IssueStatus = "open" | "in-progress" | "done";
export type ProjectRole = "viewer" | "member" | "owner";

export interface IssueRecord {
  readonly id: string;
  readonly projectId: string;
  readonly title: string;
  readonly status: IssueStatus;
  readonly assigneeName: string | null;
  readonly internalNotes: string;
}

export type IssueDto = Omit<IssueRecord, "projectId" | "internalNotes">;

export interface IssueFilters {
  readonly status: "all" | IssueStatus;
  readonly query: string;
  readonly page: number;
}

export interface IssueStore {
  findMembership(projectId: string, userId: string): Promise<{ readonly role: ProjectRole } | null>;
  listIssues(projectId: string, filters: IssueFilters): Promise<readonly IssueRecord[]>;
  findIssue(issueId: string): Promise<IssueRecord | null>;
  updateIssueStatus(issueId: string, status: IssueStatus): Promise<void>;
}
