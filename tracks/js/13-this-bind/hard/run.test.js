import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { myBind, delay } from "./starter.js";

function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}

describe("myBind", () => {
  it("wiąże this i dokleja preset przed argumentami wywołania", () => {
    const greetAla = myBind(greet, { name: "Ala" }, "Cześć");
    expect(greetAla("!")).toBe("Cześć, Ala!");
    expect(greetAla("?")).toBe("Cześć, Ala?");
  });

  it("działa bez preset — samo wiązanie kontekstu", () => {
    const bound = myBind(greet, { name: "Bob" });
    expect(bound("Hej", ".")).toBe("Hej, Bob.");
  });

  it("ponowne wiązanie nie zmienia this (jak w prawdziwym bind)", () => {
    const first = myBind(greet, { name: "Ala" }, "Cześć");
    const rebound = myBind(first, { name: "Bob" });
    expect(
      rebound("?"),
      "pierwsza związana funkcja ignoruje this z zewnątrz — drugie wiązanie nie ma jak go podmienić",
    ).toBe("Cześć, Ala?");
  });

  it("zwraca NOWĄ funkcję, nie modyfikuje oryginału", () => {
    const bound = myBind(greet, { name: "X" });
    expect(bound).not.toBe(greet);
    expect(greet.call({ name: "Y" }, "Hej", "!"), "oryginalna funkcja ma działać jak wcześniej").toBe("Hej, Y!");
  });
});

describe("delay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("wywołuje fn dopiero po ms milisekundach", () => {
    const spy = vi.fn();
    const delayed = delay(spy, 1000);
    delayed("a");
    expect(spy, "przed upływem ms fn nie może być wywołane").not.toHaveBeenCalled();
    vi.advanceTimersByTime(999);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledWith("a");
  });

  it("przekazuje wszystkie argumenty", () => {
    const spy = vi.fn();
    const delayed = delay(spy, 100);
    delayed(1, 2, 3);
    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledWith(1, 2, 3);
  });

  it("przekazuje this z wywołania wrappera", () => {
    const seen = [];
    const obj = {
      value: 42,
      show: delay(function () {
        seen.push(this.value);
      }, 500),
    };
    obj.show();
    vi.advanceTimersByTime(500);
    expect(
      seen,
      "wrapper wywołany jako obj.show() musi przekazać this=obj do fn — setTimeout z arrow + fn.apply(this, args)",
    ).toEqual([42]);
  });

  it("każde wywołanie planuje osobny timer", () => {
    const spy = vi.fn();
    const delayed = delay(spy, 100);
    delayed("x");
    delayed("y");
    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
