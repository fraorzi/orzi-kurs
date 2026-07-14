import { describe, it, expect } from "vitest";
import { debounce } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("debounce — działanie bazowe", () => {
  it("odpala raz po ciszy z ostatnimi argumentami", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40);
    d(1);
    d(2);
    await sleep(70);
    expect(log).toEqual([2]);
  });
});

describe("cancel", () => {
  it("porzuca oczekujące wywołanie", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40);
    d(1);
    d.cancel();
    await sleep(70);
    expect(log, "cancel czyści timer — trailing nie odpala").toEqual([]);
  });
});

describe("flush", () => {
  it("odpala oczekujące wywołanie natychmiast i zwraca wynik", () => {
    const log = [];
    const d = debounce((x) => {
      log.push(x);
      return x * 2;
    }, 40);
    d(5);
    const out = d.flush();
    expect(log, "flush odpala od razu, bez czekania na wait").toEqual([5]);
    expect(out, "flush zwraca wynik fn").toBe(10);
  });

  it("po flush nie odpala drugi raz po upływie wait", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40);
    d(5);
    d.flush();
    await sleep(70);
    expect(log, "flush czyści timer — brak podwójnego strzału").toEqual([5]);
  });

  it("flush bez oczekującego wywołania nie odpala nic", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40);
    d(1);
    await sleep(70); // trailing już odpalił
    expect(log).toEqual([1]);
    d.flush(); // nic nie oczekuje
    expect(log, "brak oczekującego wywołania → flush nie odpala 'starych' argumentów").toEqual([1]);
  });
});
