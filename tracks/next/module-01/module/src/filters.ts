import type { IssueFilters } from "./types";

export function parseIssueFilters(params: URLSearchParams): IssueFilters {
  return {
    status: (params.get("status") ?? "all") as IssueFilters["status"],
    query: params.get("q") ?? "",
    page: Number(params.get("page") ?? 1),
  };
}

export function buildIssueFilterHref(
  _current: URLSearchParams,
  patch: Partial<IssueFilters>,
): string {
  return `/issues?status=${patch.status ?? "all"}`;
}
