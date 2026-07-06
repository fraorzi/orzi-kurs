import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { loadUserProfile, loadWithFallback } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");

describe("składnia", () => {
  it("kod używa async/await zamiast .then()/.catch()", () => {
    expect(
      src.includes(".then(") || src.includes(".catch("),
      "to zadanie ćwiczy przepisanie składni — usuń wszystkie .then() i .catch(), zastąp je await i try/catch",
    ).toBe(false);
    expect(/async function|async \(/.test(src), "funkcje mają być zadeklarowane jako async").toBe(true);
  });
});

describe("loadUserProfile", () => {
  it("pobiera użytkownika, potem jego posty, zwraca { user, posts }", async () => {
    const fetchUser = async () => ({ id: 7, name: "Ala" });
    const fetchPosts = async (id) => [`post-of-${id}`];
    await expect(loadUserProfile(fetchUser, fetchPosts)).resolves.toEqual({
      user: { id: 7, name: "Ala" },
      posts: ["post-of-7"],
    });
  });

  it("błąd z fetchUser propaguje się jako odrzucenie", async () => {
    const fetchUser = async () => {
      throw new Error("network");
    };
    await expect(
      loadUserProfile(fetchUser, async () => []),
      "async funkcja odrzuca automatycznie, gdy await rzuci — nie łap tego błędu",
    ).rejects.toThrow("network");
  });
});

describe("loadWithFallback", () => {
  it("zwraca dane, gdy fetchData się udaje", async () => {
    let backupCalled = false;
    const result = await loadWithFallback(
      async () => "primary",
      async () => {
        backupCalled = true;
        return "backup";
      },
    );
    expect(result).toBe("primary");
    expect(backupCalled, "backup nie może być wywołany, gdy fetchData się udało").toBe(false);
  });

  it("po błędzie fetchData zwraca wynik fetchBackup", async () => {
    const result = await loadWithFallback(
      async () => {
        throw new Error("down");
      },
      async () => "backup",
    );
    expect(result, "odrzucenie fetchData ma być złapane w try/catch, a w catch zwrócony backup").toBe("backup");
  });
});
