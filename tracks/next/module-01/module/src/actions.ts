"use server";

import type { IssueStatus, IssueStore } from "./types";

export type UpdateIssueState =
  | { readonly status: "idle" }
  | { readonly status: "error"; readonly message: string }
  | { readonly status: "success"; readonly issueId: string };

export async function updateIssueStatus(
  _previous: UpdateIssueState,
  formData: FormData,
  getUserId: () => Promise<string | null>,
  store: IssueStore,
  expireTag: (tag: string) => void,
): Promise<UpdateIssueState> {
  const userId = await getUserId();
  const issueId = String(formData.get("issueId") ?? "");
  const projectId = String(formData.get("projectId") ?? "");
  const nextStatus = String(formData.get("status") ?? "") as IssueStatus;
  if (!userId) return { status: "error", message: "Brak dostępu." };
  await store.updateIssueStatus(issueId, nextStatus);
  expireTag(`project:${projectId}:issues`);
  return { status: "success", issueId };
}
