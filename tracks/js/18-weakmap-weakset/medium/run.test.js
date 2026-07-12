import { describe, it, expect } from "vitest";
import { makeReadLog, Account } from "./starter.js";

describe("makeReadLog", () => {
  it("nieprzeczytana wiadomość zwraca undefined", () => {
    const log = makeReadLog();
    expect(log.readAt({ text: "x" })).toBe(undefined);
  });

  it("readAt zwraca datę zapisaną przez markRead", () => {
    const log = makeReadLog();
    const msg = { text: "hej" };
    const date = new Date(2020, 0, 1);
    log.markRead(msg, date);
    expect(log.readAt(msg), "WeakMap ma kojarzyć wiadomość z jej datą odczytu").toBe(date);
  });

  it("różne wiadomości mają niezależne daty", () => {
    const log = makeReadLog();
    const a = { text: "a" };
    const b = { text: "b" };
    log.markRead(a, new Date(2021, 0, 1));
    expect(log.readAt(b), "b nie było oznaczone — ma zwrócić undefined").toBe(undefined);
  });
});

describe("Account — prywatne saldo przez WeakMap", () => {
  it("getter balance zwraca saldo początkowe", () => {
    expect(new Account(100).balance).toBe(100);
  });

  it("deposit zwiększa saldo", () => {
    const acc = new Account(100);
    acc.deposit(50);
    expect(acc.balance, "deposit ma dodać kwotę do salda trzymanego w WeakMap").toBe(150);
  });

  it("saldo NIE jest własnym polem instancji (Object.keys puste)", () => {
    const acc = new Account(100);
    expect(
      Object.keys(acc),
      "saldo ma żyć w module-owym WeakMap, nie w this.balance — inaczej przecieka przez Object.keys",
    ).toEqual([]);
  });

  it("saldo nie wycieka przez JSON.stringify", () => {
    const acc = new Account(100);
    expect(
      JSON.stringify(acc),
      "prywatny stan w WeakMap nie jest enumerowalny, więc JSON.stringify daje pusty obiekt",
    ).toBe("{}");
  });

  it("dwa konta mają niezależne salda", () => {
    const a = new Account(100);
    const b = new Account(200);
    a.deposit(1);
    expect(b.balance, "klucz WeakMap to konkretna instancja — konta się nie mieszają").toBe(200);
  });
});
