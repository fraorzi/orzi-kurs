import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ currentViewer: vi.fn(), readProject: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("./src/security", () => ({ currentViewer: mocks.currentViewer }));
vi.mock("./src/project-store", () => ({ readProject: mocks.readProject }));
import { getProjectDTO } from "./src/project-dal";

describe("getProjectDTO", () => {
  beforeEach(() => {
    mocks.currentViewer.mockResolvedValue({ userId: "u-1" });
    mocks.readProject.mockResolvedValue({
      id: "p-1", name: "Migracja", status: "active", budget: 100000,
      secretNotes: "secret", memberIds: ["u-1"],
    });
  });

  it("zwraca minimalny DTO członkowi projektu", async () => {
    await expect(getProjectDTO("p-1")).resolves.toEqual({
      id: "p-1", name: "Migracja", status: "active",
    });
  });

  it("ukrywa istnienie projektu przed obcym użytkownikiem", async () => {
    mocks.currentViewer.mockResolvedValue({ userId: "u-9" });
    await expect(getProjectDTO("p-1")).rejects.toThrow("Project not found");
  });

  it("oznacza DAL jako server-only", () => {
    const source = readFileSync(join(
      process.cwd(), "tracks/next/13-auth-data-access/medium/src/project-dal.ts",
    ), "utf8");
    expect(source.trimStart().startsWith('import "server-only"')).toBe(true);
  });
});
