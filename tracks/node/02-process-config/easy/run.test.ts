import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("parser argumentów CLI", () => {
  it("zwraca wartości domyślne dla pustego argv", () => {
    expect(solve([])).toEqual({ port: 3000, host: "127.0.0.1", json: false });
  });

  it("parsuje wszystkie trzy formy opcji", () => {
    expect(solve(["--port", "8080", "--host=0.0.0.0", "--json"])).toEqual({
      port: 8080,
      host: "0.0.0.0",
      json: true,
    });
  });

  it("odrzuca nieznany argument z jego nazwą w komunikacie", () => {
    expect(() => solve(["--prot", "80"])).toThrow(/--prot/);
  });

  it("odrzuca port spoza zakresu i nieliczbowy", () => {
    expect(() => solve(["--port", "0"])).toThrow();
    expect(() => solve(["--port", "70000"])).toThrow();
    expect(() => solve(["--port", "abc"])).toThrow();
    expect(() => solve(["--port", "80.5"])).toThrow();
  });
});
