import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("wyliczanie stanu workflow dokumentu", () => {
  it("zwraca new, gdy lokalizacja nigdy nie była publikowana", () => {
    expect(solve("Treść robocza", null)).toBe("new");
  });

  it("zwraca modified, gdy draft różni się od published", () => {
    expect(solve("Nowa treść", "Stara treść")).toBe("modified");
  });

  it("zwraca published, gdy draft jest identyczny z published", () => {
    expect(solve("Treść", "Treść")).toBe("published");
  });

  it("rozróżnia new od modified po samej obecności published", () => {
    expect(solve("X", null)).toBe("new");
    expect(solve("X", "Y")).toBe("modified");
  });

  it("traktuje pustą treść identyczną w obu wersjach jako published", () => {
    expect(solve("", "")).toBe("published");
  });
});
