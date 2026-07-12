import { describe, it, expect, afterEach } from "vitest";
import { fetchWithRetry } from "./starter.js";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), { status });

/** Atrapa fetch odtwarzająca kolejne, zaplanowane odpowiedzi; liczy wywołania. */
function scriptedFetch(steps) {
  const state = { calls: 0 };
  globalThis.fetch = async () => {
    const step = steps[state.calls];
    state.calls += 1;
    if (step === "network-error") {
      throw new TypeError("Failed to fetch");
    }
    return jsonResponse(step.data ?? {}, step.status);
  };
  return state;
}

describe("fetchWithRetry — sukces", () => {
  it("zwraca dane za pierwszym razem (jedno wywołanie)", async () => {
    const state = scriptedFetch([{ status: 200, data: { id: 1 } }]);
    await expect(fetchWithRetry("/api/x")).resolves.toEqual({ id: 1 });
    expect(state.calls, "przy sukcesie nie ma po co ponawiać").toBe(1);
  });
});

describe("fetchWithRetry — ponawianie 5xx", () => {
  it("ponawia po 500 i zwraca dane, gdy kolejna próba się uda", async () => {
    const state = scriptedFetch([
      { status: 500 },
      { status: 500 },
      { status: 200, data: { id: 2 } },
    ]);
    await expect(fetchWithRetry("/api/x", 2)).resolves.toEqual({ id: 2 });
    expect(state.calls, "dwa razy 500, potem sukces — łącznie 3 wywołania fetch").toBe(3);
  });

  it("po wyczerpaniu prób rzuca ostatni błąd", async () => {
    const state = scriptedFetch([{ status: 500 }, { status: 500 }, { status: 500 }]);
    await expect(fetchWithRetry("/api/x", 2)).rejects.toThrow("HTTP 500");
    expect(state.calls, "retries = 2 znaczy maksymalnie 3 wywołania (1 + 2 ponowienia)").toBe(3);
  });
});

describe("fetchWithRetry — brak ponawiania 4xx", () => {
  it("404 rzuca od razu, bez ponawiania", async () => {
    const state = scriptedFetch([{ status: 404 }, { status: 200 }]);
    await expect(fetchWithRetry("/api/brak", 2)).rejects.toThrow("HTTP 404");
    expect(
      state.calls,
      "4xx to błąd żądania — ponowienie da ten sam wynik, więc rzuć natychmiast",
    ).toBe(1);
  });
});

describe("fetchWithRetry — błędy sieci", () => {
  it("ponawia po błędzie sieci (fetch odrzucił obietnicę)", async () => {
    const state = scriptedFetch(["network-error", { status: 200, data: { id: 3 } }]);
    await expect(fetchWithRetry("/api/x", 2)).resolves.toEqual({ id: 3 });
    expect(state.calls, "odrzucenie fetch to błąd sieci — bywa przejściowy, więc ponawiamy").toBe(2);
  });

  it("gdy sieć zawsze zawodzi, rzuca ostatni błąd sieci", async () => {
    scriptedFetch(["network-error", "network-error", "network-error"]);
    await expect(fetchWithRetry("/api/x", 2)).rejects.toThrow("Failed to fetch");
  });
});
