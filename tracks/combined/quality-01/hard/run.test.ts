import { describe, expect, it } from "vitest";
import { buildRows, type Item, type User } from "./starter";

function trackFindCalls(users: readonly User[]): {
  proxied: readonly User[];
  findCalls: () => number;
} {
  let calls = 0;
  const proxied = new Proxy(users, {
    get(target, prop, receiver) {
      if (prop === "find") calls += 1;
      return Reflect.get(target, prop, receiver);
    },
  });
  return { proxied, findCalls: () => calls };
}

describe("maintenance quality: identity i a11y", () => {
  it("dopasowuje właściciela do pozycji po ownerId", () => {
    const items: Item[] = [{ id: "i1", ownerId: "u1", title: "Pierwszy" }];
    const users: User[] = [{ id: "u1", name: "Ada" }];

    expect(buildRows(items, users)).toEqual([
      { key: "i1", title: "Pierwszy", owner: "Ada", actionLabel: "Edytuj Pierwszy" },
    ]);
  });

  it("pokazuje czytelną wartość zastępczą dla nieznanego właściciela", () => {
    const items: Item[] = [{ id: "i1", ownerId: "brak", title: "Sierota" }];

    expect(buildRows(items, [])[0]?.owner).toBe("Nieznany");
  });

  it("zachowuje tożsamość wiersza po ownerId, nie po pozycji w tablicy", () => {
    const items: Item[] = [
      { id: "i1", ownerId: "u1", title: "Pierwszy" },
      { id: "i2", ownerId: "u1", title: "Drugi" },
    ];
    const users: User[] = [{ id: "u1", name: "Ada" }];

    const reordered = buildRows([...items].reverse(), users);
    expect(reordered.map((row) => row.key)).toEqual(["i2", "i1"]);
  });

  it("nadaje etykiecie akcji kontekst pozycji dla czytnika ekranu", () => {
    const items: Item[] = [
      { id: "i1", ownerId: "u1", title: "Faktura #12" },
      { id: "i2", ownerId: "u1", title: "Faktura #13" },
    ];
    const users: User[] = [{ id: "u1", name: "Ada" }];

    const labels = buildRows(items, users).map((row) => row.actionLabel);
    expect(new Set(labels).size).toBe(2);
    expect(labels[0]).toContain("Faktura #12");
  });

  it("zwraca pustą listę dla pustego wejścia bez błędu", () => {
    expect(buildRows([], [])).toEqual([]);
  });

  it("[quality] buduje indeks właścicieli zamiast skanować users dla każdej pozycji", () => {
    const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
      id: `i${index}`,
      ownerId: `u${index % 5}`,
      title: `Pozycja ${index}`,
    }));
    const users: User[] = Array.from({ length: 5 }, (_, index) => ({
      id: `u${index}`,
      name: `Owner ${index}`,
    }));

    const { proxied, findCalls } = trackFindCalls(users);
    buildRows(items, proxied);

    expect(findCalls()).toBe(0);
  });
});
