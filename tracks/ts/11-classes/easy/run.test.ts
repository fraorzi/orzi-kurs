import { describe, it, expect } from "vitest";
import { Account, describeAccount } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("id jest readonly", () => {
    const acc = new Account("ACC-1", 100);
    const illegal = (): void => {
      // @ts-expect-error id ma być readonly
      acc.id = "ACC-2";
    };
    expect(illegal).toBeTypeOf("function");
    expect(acc.id).toBe("ACC-1");
  });

  it("saldo jest prywatne — nie da się go odczytać z zewnątrz", () => {
    const acc = new Account("ACC-1", 100);
    const illegal = (): void => {
      // @ts-expect-error saldo ma być private
      acc.balance;
    };
    expect(illegal).toBeTypeOf("function");
    expect(acc.getBalance()).toBe(100);
  });
});

describe("Account", () => {
  it("startuje z saldem początkowym", () => {
    expect(new Account("ACC-1", 100).getBalance()).toBe(100);
  });

  it("wpłata powiększa saldo i zwraca nową wartość", () => {
    const acc = new Account("ACC-1", 100);
    expect(acc.deposit(50)).toBe(150);
    expect(acc.getBalance()).toBe(150);
  });

  it("wypłata pomniejsza saldo i zwraca nową wartość", () => {
    const acc = new Account("ACC-1", 100);
    expect(acc.withdraw(30)).toBe(70);
    expect(acc.getBalance()).toBe(70);
  });

  it("wypłata ponad saldo rzuca Error i nie zmienia salda", () => {
    const acc = new Account("ACC-1", 100);
    expect(() => acc.withdraw(1000)).toThrow("brak środków");
    expect(
      acc.getBalance(),
      "nieudana operacja nie może zostawić konta w zmienionym stanie",
    ).toBe(100);
  });

  it("kwota niedodatnia rzuca RangeError w obu metodach", () => {
    const acc = new Account("ACC-1", 100);
    expect(() => acc.deposit(-1)).toThrow(RangeError);
    expect(() => acc.deposit(0)).toThrow(RangeError);
    expect(() => acc.withdraw(0)).toThrow(RangeError);
  });

  it("wypłata całego salda jest dozwolona", () => {
    const acc = new Account("ACC-1", 100);
    expect(
      acc.withdraw(100),
      "granica jest ostra tylko w jedną stronę — 100 z salda 100 przechodzi",
    ).toBe(0);
  });
});

describe("describeAccount", () => {
  it("opisuje konto id i saldem z dwoma miejscami po przecinku", () => {
    expect(describeAccount(new Account("ACC-1", 100))).toBe("ACC-1: 100.00 zł");
  });

  it("czyta saldo przez publiczny getter, nie przez pole", () => {
    const acc = new Account("ACC-2", 12.5);
    acc.deposit(0.25);
    expect(describeAccount(acc)).toBe("ACC-2: 12.75 zł");
  });
});
