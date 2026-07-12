import { describe, it, expect, afterEach } from "vitest";
import { fetchJson, postJson } from "./starter.js";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), { status });

describe("fetchJson", () => {
  it("zwraca sparsowany JSON przy statusie 200", async () => {
    globalThis.fetch = async () => jsonResponse({ id: 1, name: "Ala" });
    await expect(fetchJson("/api/users/1")).resolves.toEqual({ id: 1, name: "Ala" });
  });

  it("rzuca Error('HTTP <status>') przy odpowiedzi 404", async () => {
    globalThis.fetch = async () => jsonResponse({}, 404);
    await expect(
      fetchJson("/api/brak"),
      "fetch NIE odrzuca obietnicy przy 404 — sam sprawdź res.ok i rzuć błąd",
    ).rejects.toThrow("HTTP 404");
  });

  it("rzuca też przy 500", async () => {
    globalThis.fetch = async () => jsonResponse({}, 500);
    await expect(fetchJson("/api/x")).rejects.toThrow("HTTP 500");
  });

  it("woła fetch z przekazanym url", async () => {
    let calledWith;
    globalThis.fetch = async (url) => {
      calledWith = url;
      return jsonResponse({});
    };
    await fetchJson("/api/users");
    expect(calledWith).toBe("/api/users");
  });
});

describe("postJson", () => {
  it("wysyła POST z nagłówkiem JSON i zserializowanym ciałem", async () => {
    let init;
    globalThis.fetch = async (url, options) => {
      init = options;
      return jsonResponse({ ok: true });
    };

    await postJson("/api/users", { name: "Ala" });

    expect(init.method, "metoda ma być POST").toBe("POST");
    expect(
      init.headers["Content-Type"],
      "bez Content-Type serwer nie rozpozna ciała jako JSON",
    ).toBe("application/json");
    expect(init.body, "body musi być stringiem — użyj JSON.stringify(body)").toBe(
      '{"name":"Ala"}',
    );
  });

  it("zwraca sparsowaną odpowiedź", async () => {
    globalThis.fetch = async () => jsonResponse({ id: 7 });
    await expect(postJson("/api/users", {})).resolves.toEqual({ id: 7 });
  });

  it("rzuca przy błędnym statusie", async () => {
    globalThis.fetch = async () => jsonResponse({}, 422);
    await expect(postJson("/api/users", {})).rejects.toThrow("HTTP 422");
  });
});
