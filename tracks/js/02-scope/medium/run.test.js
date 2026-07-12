import { describe, it, expect } from "vitest";
import { createBankAccount } from "./starter.js";

describe("createBankAccount", () => {
  it("deposit i withdraw zmieniają saldo i zwracają nową wartość", () => {
    const account = createBankAccount(100);
    expect(account.deposit(50), "deposit ma zwracać nowe saldo").toBe(150);
    expect(account.withdraw(30), "withdraw ma zwracać nowe saldo").toBe(120);
    expect(account.getBalance()).toBe(120);
  });

  it("saldo startowe domyślnie wynosi 0", () => {
    expect(createBankAccount().getBalance()).toBe(0);
  });

  it("saldo jest prywatne — nie ma go we właściwościach obiektu", () => {
    const account = createBankAccount(100);
    expect(
      Object.keys(account).every((key) => typeof account[key] === "function"),
      "obiekt konta ma zawierać wyłącznie metody — saldo trzymaj w zmiennej zamkniętej w zakresie createBankAccount, nie jako właściwość",
    ).toBe(true);
  });

  it("wypłata ponad stan rzuca RangeError i nie zmienia salda", () => {
    const account = createBankAccount(50);
    expect(() => account.withdraw(100), "wypłata ponad stan ma rzucać RangeError").toThrow(RangeError);
    expect(account.getBalance(), "nieudana wypłata nie może zmienić salda").toBe(50);
  });

  it("kwoty <= 0 rzucają RangeError w deposit i withdraw", () => {
    const account = createBankAccount(50);
    expect(() => account.deposit(0)).toThrow(RangeError);
    expect(() => account.deposit(-5)).toThrow(RangeError);
    expect(() => account.withdraw(-5)).toThrow(RangeError);
  });

  it("dwa konta liczą niezależnie", () => {
    const a = createBankAccount(10);
    const b = createBankAccount(10);
    a.deposit(90);
    expect(
      b.getBalance(),
      "konta współdzielą stan — każde wywołanie createBankAccount musi tworzyć NOWĄ zmienną salda w swoim zakresie",
    ).toBe(10);
  });
});
