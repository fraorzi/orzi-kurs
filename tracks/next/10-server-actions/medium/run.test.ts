import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  currentSession: vi.fn(),
  canEditProject: vi.fn(),
  persistProjectTitle: vi.fn(),
  updateTag: vi.fn(),
}));
vi.mock("next/cache", () => ({ updateTag: mocks.updateTag }));
vi.mock("./src/security", () => ({
  currentSession: mocks.currentSession,
  canEditProject: mocks.canEditProject,
}));
vi.mock("./src/project-store", () => ({
  persistProjectTitle: mocks.persistProjectTitle,
}));

import { updateProject } from "./src/actions";

function projectForm(projectId: string, title: string) {
  const data = new FormData();
  data.set("projectId", projectId);
  data.set("title", title);
  return data;
}

describe("updateProject authorization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.currentSession.mockResolvedValue({ userId: "u-7" });
    mocks.canEditProject.mockResolvedValue(true);
    mocks.persistProjectTitle.mockResolvedValue(undefined);
  });

  it("sprawdza uprawnienie zasobu przed zapisem", async () => {
    await expect(updateProject(projectForm("p-2", "  Nowy tytuł  "))).resolves.toEqual({
      status: "success",
      projectId: "p-2",
    });
    expect(mocks.canEditProject).toHaveBeenCalledWith("u-7", "p-2");
    expect(mocks.persistProjectTitle).toHaveBeenCalledWith("p-2", "Nowy tytuł");
    expect(mocks.updateTag.mock.calls).toEqual([
      ["user:u-7:projects"],
      ["project:p-2"],
    ]);
  });

  it("nie mutuje po odmowie authz", async () => {
    mocks.canEditProject.mockResolvedValue(false);
    await expect(updateProject(projectForm("p-9", "Sekretny projekt")))
      .resolves.toEqual({ status: "forbidden" });
    expect(mocks.persistProjectTitle).not.toHaveBeenCalled();
    expect(mocks.updateTag).not.toHaveBeenCalled();
  });

  it("nie sprawdza payloadu przed authn", async () => {
    mocks.currentSession.mockResolvedValue(null);
    await expect(updateProject(projectForm("", ""))).resolves.toEqual({ status: "forbidden" });
    expect(mocks.canEditProject).not.toHaveBeenCalled();
  });
});
