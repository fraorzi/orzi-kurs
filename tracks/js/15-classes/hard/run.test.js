import { describe, it, expect } from "vitest";
import { PowerArray, Wallet } from "./starter.js";

describe("PowerArray", () => {
  it("dziedziczy z Array i dodaje isEmpty/first", () => {
    const arr = PowerArray.from([1, 2, 5]);
    expect(arr).toBeInstanceOf(Array);
    expect(arr.isEmpty()).toBe(false);
    expect(arr.first()).toBe(1);
    expect(PowerArray.from([]).isEmpty()).toBe(true);
  });

  it("filter i map zwracają PowerArray z działającymi metodami", () => {
    const arr = PowerArray.from([1, 2, 5, 10]);
    const filtered = arr.filter((x) => x >= 5);
    expect(
      filtered,
      "wbudowane metody tworzą wynik przez this.constructor — dziedzicząc z Array dostajesz to za darmo",
    ).toBeInstanceOf(PowerArray);
    expect(filtered.first()).toBe(5);
    expect(arr.map((x) => x * 2)).toBeInstanceOf(PowerArray);
  });

  it("zwykłe operacje tablicowe działają", () => {
    const arr = PowerArray.from([3, 1, 2]);
    arr.push(4);
    expect([...arr]).toEqual([3, 1, 2, 4]);
    expect(arr.length).toBe(4);
  });
});

describe("Wallet", () => {
  it("deposit i withdraw operują na prywatnym saldzie", () => {
    const w = new Wallet(100);
    expect(w.deposit(50)).toBe(150);
    expect(w.withdraw(30)).toBe(120);
    expect(w.balance).toBe(120);
  });

  it("waliduje kwoty i stan", () => {
    const w = new Wallet(10);
    expect(() => w.deposit(0)).toThrow(RangeError);
    expect(() => w.withdraw(-1)).toThrow(RangeError);
    expect(() => w.withdraw(11), "wypłata ponad stan ma rzucać RangeError").toThrow(RangeError);
    expect(w.balance, "nieudane operacje nie mogą zmienić salda").toBe(10);
  });

  it("saldo jest naprawdę prywatne — pole # nie jest właściwością", () => {
    const w = new Wallet(100);
    expect(
      Object.keys(w),
      "pole #balance nie może być zwykłą właściwością — Object.keys ma nie widzieć nic",
    ).toEqual([]);
    expect(Object.getOwnPropertyNames(w)).toEqual([]);
    expect(JSON.stringify(w)).toBe("{}");
  });

  it("domyślne saldo to 0", () => {
    expect(new Wallet().balance).toBe(0);
  });
});
