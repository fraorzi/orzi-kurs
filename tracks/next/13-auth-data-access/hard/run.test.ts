import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ currentViewer: vi.fn(), readTeamMembers: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("./src/security", () => ({ currentViewer: mocks.currentViewer }));
vi.mock("./src/team-store", () => ({ readTeamMembers: mocks.readTeamMembers }));
import { getTeamDirectory } from "./src/team-dal";

const record = {
  id: "u-2", name: "Alicja", email: "a@example.com", teamId: "t-1",
  role: "member", passwordHash: "hash", recoveryToken: "token",
};

describe("getTeamDirectory field policy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.readTeamMembers.mockResolvedValue([record]);
  });

  it("udostępnia email adminowi tego samego teamu", async () => {
    mocks.currentViewer.mockResolvedValue({ userId: "u-1", teamId: "t-1", role: "admin" });
    await expect(getTeamDirectory("t-1")).resolves.toEqual([
      { id: "u-2", name: "Alicja", email: "a@example.com" },
    ]);
  });

  it("minimalizuje DTO zwykłego członka", async () => {
    mocks.currentViewer.mockResolvedValue({ userId: "u-3", teamId: "t-1", role: "member" });
    await expect(getTeamDirectory("t-1")).resolves.toEqual([
      { id: "u-2", name: "Alicja" },
    ]);
  });

  it("odrzuca obcy team przed zapytaniem", async () => {
    mocks.currentViewer.mockResolvedValue({ userId: "u-9", teamId: "t-9", role: "admin" });
    await expect(getTeamDirectory("t-1")).rejects.toThrow("Team not found");
    expect(mocks.readTeamMembers).not.toHaveBeenCalled();
  });
});
