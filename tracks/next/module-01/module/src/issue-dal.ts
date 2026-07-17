import "server-only";

import type { IssueDto, IssueFilters, IssueRecord, IssueStore } from "./types";

function toDto(issue: IssueRecord): IssueDto {
  return {
    id: issue.id,
    title: issue.title,
    status: issue.status,
    assigneeName: issue.assigneeName,
  };
}

export async function listProjectIssues(
  store: IssueStore,
  projectId: string,
  _userId: string,
  filters: IssueFilters,
): Promise<readonly IssueDto[]> {
  return (await store.listIssues(projectId, filters)).map(toDto);
}

export async function getProjectIssue(
  store: IssueStore,
  projectId: string,
  _userId: string,
  issueId: string,
): Promise<IssueDto | null> {
  const issue = await store.findIssue(issueId);
  return issue?.projectId === projectId ? toDto(issue) : null;
}
