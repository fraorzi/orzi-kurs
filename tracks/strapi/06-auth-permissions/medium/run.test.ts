import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const PERMISSIONS = {
  editor: ["api::article.article.find", "api::article.article.update"],
  public: ["api::article.article.find"],
};

describe("permissions jako allow-list", () => {
  it("zezwala na akcję jawnie przyznaną roli", () => {
    expect(solve(PERMISSIONS, "editor", "api::article.article.update")).toBe(true);
  });

  it("odmawia akcji nieprzyznanej roli, która ma inne uprawnienia", () => {
    expect(solve(PERMISSIONS, "editor", "api::article.article.delete")).toBe(false);
  });

  it("odmawia dla roli nieobecnej w permissions, bez rzucania błędu", () => {
    expect(solve(PERMISSIONS, "guest", "api::article.article.find")).toBe(false);
  });

  it("nie dopasowuje częściowo nazwy akcji", () => {
    expect(solve(PERMISSIONS, "public", "api::article.article.find-one")).toBe(false);
  });

  it("każda rola ma niezależną listę uprawnień", () => {
    expect(solve(PERMISSIONS, "public", "api::article.article.update")).toBe(false);
    expect(solve(PERMISSIONS, "public", "api::article.article.find")).toBe(true);
  });
});
