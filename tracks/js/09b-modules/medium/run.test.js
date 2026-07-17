import { afterEach, describe, expect, it } from "vitest";
import { apiUrl, environment, setEnvironment } from "./src/index.js";

afterEach(() => {
  setEnvironment("development");
});

describe("konfiguracja środowiska", () => {
  it("zaczyna w development i buduje lokalny URL", () => {
    expect(environment).toBe("development");
    expect(apiUrl("/users")).toBe("http://localhost:3000/users");
  });

  it("importowane wiązanie reaguje na późniejszą zmianę eksportu", () => {
    setEnvironment("production");
    expect(environment, "import environment ma być żywym wiązaniem, nie kopią")
      .toBe("production");
    expect(apiUrl("/users"), "apiUrl ma czytać aktualne environment przy wywołaniu")
      .toBe("https://api.example.com/users");
  });

  it("obsługuje środowisko testowe i normalizuje slash", () => {
    setEnvironment("test");
    expect(apiUrl("health")).toBe("http://localhost:4000/health");
  });

  it("odrzuca nieznane środowisko bez zmiany poprzedniej wartości", () => {
    expect(() => setEnvironment("staging")).toThrow("Unknown environment: staging");
    expect(environment).toBe("development");
  });
});
