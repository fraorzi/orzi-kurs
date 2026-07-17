"use server";

import type { IssueStatus, IssueStore } from "./types";

export type UpdateIssueState =
  | { readonly status: "idle" }
  | { readonly status: "error"; readonly message: string }
  | { readonly status: "success"; readonly issueId: string };

const statuses: readonly IssueStatus[] = ["open", "in-progress", "done"];

export async function updateIssueStatus(
  _previous: UpdateIssueState,
  formData: FormData,
  getUserId: () => Promise<string | null>,
  store: IssueStore,
  expireTag: (tag: string) => void,
): Promise<UpdateIssueState> {
  const userId = await getUserId();
  const issueId = formData.get("issueId");
  const nextStatus = formData.get("status");
  if (!userId) return { status: "error", message: "Brak dostępu." };
  if (
    typeof issueId !== "string" || !issueId ||
    typeof nextStatus !== "string" || !statuses.includes(nextStatus as IssueStatus)
  ) return { status: "error", message: "Niepoprawne dane." };
  const issue = await store.findIssue(issueId);
  if (!issue) return { status: "error", message: "Zgłoszenie niedostępne." };
  const membership = await store.findMembership(issue.projectId, userId);
  if (!membership || membership.role === "viewer") {
    return { status: "error", message: "Zgłoszenie niedostępne." };
  }
  await store.updateIssueStatus(issueId, nextStatus as IssueStatus);
  expireTag(`project:${issue.projectId}:issues`);
  return { status: "success", issueId };
}
