import { describe, it, expect } from "vitest";
import { Cart } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("size i units są tylko do odczytu", () => {
    const cart = new Cart();
    const illegal = (): void => {
      // @ts-expect-error size ma być getterem, nie zapisywalnym polem
      cart.size = 99;
      // @ts-expect-error units ma być getterem, nie zapisywalnym polem
      cart.units = 99;
    };
    expect(illegal).toBeTypeOf("function");
    expect(cart.size).toBe(0);
  });

  it("add zwraca ten sam koszyk (łańcuchowanie)", () => {
    const cart: Cart = new Cart().add("a", 1).add("b", 2);
    expect(cart.size).toBe(2);
  });
});

describe("prywatność stanu", () => {
  it("wewnętrzna mapa nie jest widoczna jako właściwość obiektu", () => {
    const cart = new Cart().add("mug", 2);
    expect(
      Object.keys(cart),
      "#items to pole prywatne w runtime — nie może wyciekać przez Object.keys",
    ).not.toContain("items");
  });

  it("JSON.stringify pokazuje pozycje, nie wewnętrzną mapę", () => {
    const cart = new Cart().add("mug", 2);
    expect(
      JSON.stringify(cart),
      "toJSON ma zwracać zwykły obiekt — Map serializuje się do {}",
    ).toBe('{"mug":2}');
  });
});

describe("Cart.fromEntries", () => {
  it("buduje koszyk z par [sku, sztuki]", () => {
    const cart = Cart.fromEntries([
      ["mug", 2],
      ["kbd", 1],
    ]);
    expect(cart.toJSON()).toEqual({ mug: 2, kbd: 1 });
  });

  it("zwraca instancję Cart", () => {
    expect(Cart.fromEntries([])).toBeInstanceOf(Cart);
  });
});

describe("add", () => {
  it("dolicza sztuki do istniejącej pozycji", () => {
    const cart = new Cart().add("mug", 2).add("mug", 3);
    expect(cart.toJSON()).toEqual({ mug: 5 });
    expect(cart.size).toBe(1);
  });

  it("liczba sztuk <= 0 rzuca RangeError", () => {
    expect(() => new Cart().add("mug", 0)).toThrow(RangeError);
    expect(() => new Cart().add("mug", -2)).toThrow(
      "liczba sztuk musi być dodatnia",
    );
  });

  it("pozwala łączyć wywołania", () => {
    const cart = new Cart().add("a", 1).add("b", 2).add("c", 3);
    expect(cart.units).toBe(6);
  });
});

describe("gettery", () => {
  it("size liczy różne pozycje, units — wszystkie sztuki", () => {
    const cart = new Cart().add("a", 1).add("b", 4);
    expect([cart.size, cart.units]).toEqual([2, 5]);
  });

  it("pusty koszyk ma zera", () => {
    const cart = new Cart();
    expect([cart.size, cart.units]).toEqual([0, 0]);
  });
});

describe("remove", () => {
  it("usuwa całą pozycję", () => {
    const cart = new Cart().add("mug", 5);
    cart.remove("mug");
    expect(cart.toJSON()).toEqual({});
  });

  it("usunięcie nieistniejącej pozycji niczego nie psuje", () => {
    const cart = new Cart().add("mug", 5);
    cart.remove("nie-ma");
    expect(cart.toJSON()).toEqual({ mug: 5 });
  });

  it("działa po wyrwaniu z obiektu (nie gubi this)", () => {
    const cart = Cart.fromEntries([
      ["mug", 2],
      ["kbd", 1],
      ["pad", 3],
    ]);
    const remove = cart.remove;
    remove("mug");
    expect(
      cart.toJSON(),
      "zwykła metoda gubi this po przypisaniu do zmiennej — użyj pola z funkcją strzałkową",
    ).toEqual({ kbd: 1, pad: 3 });
  });

  it("działa jako callback forEach (dostaje trzy argumenty)", () => {
    const cart = Cart.fromEntries([
      ["mug", 2],
      ["kbd", 1],
      ["pad", 3],
    ]);
    ["mug", "kbd"].forEach(cart.remove);
    expect(cart.toJSON()).toEqual({ pad: 3 });
  });
});
