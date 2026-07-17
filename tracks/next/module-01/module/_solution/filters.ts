import type { IssueFilters } from "./types";

const statuses: readonly IssueFilters["status"][] = ["all", "open", "in-progress", "done"];

export function parseIssueFilters(params: URLSearchParams): IssueFilters {
  const status = params.get("status");
  const page = Number(params.get("page") ?? 1);
  return {
    status: statuses.includes(status as IssueFilters["status"])
      ? status as IssueFilters["status"]
      : "all",
    query: (params.get("q") ?? "").trim().slice(0, 80),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function buildIssueFilterHref(
  current: URLSearchParams,
  patch: Partial<IssueFilters>,
): string {
  const next = new URLSearchParams(current);
  if (patch.status !== undefined) next.set("status", patch.status);
  if (patch.query !== undefined) {
    patch.query ? next.set("q", patch.query) : next.delete("q");
  }
  if (patch.page !== undefined) next.set("page", String(patch.page));
  if (patch.status !== undefined || patch.query !== undefined) next.set("page", "1");
  return `/issues?${next.toString()}`;
}
