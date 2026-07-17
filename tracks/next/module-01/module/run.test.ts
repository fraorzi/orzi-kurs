import { describe, expect, it, vi } from "vitest";
import {
  buildIssueFilterHref,
  getProjectIssue,
  listProjectIssues,
  parseIssueFilters,
  updateIssueStatus,
  type IssueRecord,
  type IssueStore,
} from "./src";

vi.mock("server-only", () => ({}));

const issue: IssueRecord = {
  id: "i-1",
  projectId: "p-real",
  title: "Błąd płatności",
  status: "open",
  assigneeName: null,
  internalNotes: "token dostawcy",
};

function makeStore(role: "viewer" | "member" | "owner" | null = "member"): IssueStore {
  return {
    findMembership: vi.fn(async () => role ? { role } : null),
    listIssues: vi.fn(async () => [issue]),
    findIssue: vi.fn(async () => issue),
    updateIssueStatus: vi.fn(async () => undefined),
  };
}

describe("project issues module", () => {
  it("normalizuje filtry i zachowuje obce query params", () => {
    expect(parseIssueFilters(new URLSearchParams(
      `status=broken&page=-2&q=${encodeURIComponent(`  ${"x".repeat(90)}  `)}`,
    ))).toEqual({ status: "all", page: 1, query: "x".repeat(80) });
    expect(buildIssueFilterHref(
      new URLSearchParams("status=open&page=7&view=compact"),
      { status: "done" },
    )).toBe("/issues?status=done&page=1&view=compact");
  });

  it("autoryzuje listę przed query i zwraca minimalne DTO", async () => {
    const denied = makeStore(null);
    await expect(listProjectIssues(denied, "p-real", "u-1", {
      status: "all", query: "", page: 1,
    })).resolves.toEqual([]);
    expect(denied.listIssues).not.toHaveBeenCalled();

    const allowed = makeStore();
    await expect(listProjectIssues(allowed, "p-real", "u-1", {
      status: "open", query: "pay", page: 1,
    })).resolves.toEqual([{
      id: "i-1", title: "Błąd płatności", status: "open", assigneeName: null,
    }]);
  });

  it("nie ujawnia szczegółu spoza projektu", async () => {
    await expect(getProjectIssue(makeStore(), "p-other", "u-1", "i-1"))
      .resolves.toBeNull();
  });

  it("ignoruje podszyty projectId i sprawdza authz przy zasobie", async () => {
    const formData = new FormData();
    formData.set("issueId", "i-1");
    formData.set("projectId", "p-forged");
    formData.set("status", "done");
    const store = makeStore("member");
    const expireTag = vi.fn();
    await expect(updateIssueStatus(
      { status: "idle" }, formData, async () => "u-1", store, expireTag,
    )).resolves.toEqual({ status: "success", issueId: "i-1" });
    expect(store.findMembership).toHaveBeenCalledWith("p-real", "u-1");
    expect(store.updateIssueStatus).toHaveBeenCalledWith("i-1", "done");
    expect(expireTag).toHaveBeenCalledWith("project:p-real:issues");

    const viewer = makeStore("viewer");
    await expect(updateIssueStatus(
      { status: "idle" }, formData, async () => "u-1", viewer, vi.fn(),
    )).resolves.toEqual({ status: "error", message: "Zgłoszenie niedostępne." });
    expect(viewer.updateIssueStatus).not.toHaveBeenCalled();
  });
});
