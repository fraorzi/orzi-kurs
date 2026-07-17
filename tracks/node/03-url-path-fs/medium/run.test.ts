import { resolve, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const root = resolve("/srv/uploads");

describe("bramka path traversal", () => {
  it("przepuszcza plik i podkatalog wewnątrz roota", async () => {
    await expect(solve(root, "avatar.png")).resolves.toBe(
      [root, "avatar.png"].join(sep),
    );
    await expect(solve(root, "team/logo.svg")).resolves.toBe(
      [root, "team", "logo.svg"].join(sep),
    );
  });

  it("przepuszcza sam root", async () => {
    await expect(solve(root, ".")).resolves.toBe(root);
  });

  it("odrzuca ucieczkę przez ..", async () => {
    await expect(solve(root, "../etc/passwd")).rejects.toThrow();
    await expect(solve(root, "a/../../etc/passwd")).rejects.toThrow();
  });

  it("odrzuca ścieżkę absolutną spoza roota", async () => {
    await expect(solve(root, resolve("/etc/passwd"))).rejects.toThrow();
  });

  it("odrzuca rodzeństwo o zbieżnym prefiksie tekstowym", async () => {
    await expect(solve(root, `${root}-evil/plik.txt`)).rejects.toThrow();
  });
});
