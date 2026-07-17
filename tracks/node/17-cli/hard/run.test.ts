import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("format pomocy i błędów", () => {
  it("pomoc zawiera usage, opcje i przykład z nazwą komendy", () => {
    const help = solve("loganalyzer");
    expect(help).toContain("Usage: loganalyzer");
    expect(help).toContain("--json");
    expect(help).toContain("--max-bytes");
    expect(help).toContain("Example:");
    expect(help).toContain("loganalyzer");
  });

  it("błąd formatuje komunikat i wskazówkę --help", () => {
    const output = solve("loganalyzer", new Error("plik nie istnieje"));
    expect(output).toContain("Error: plik nie istnieje");
    expect(output).toContain("Run 'loganalyzer --help' for usage.");
  });

  it("cause pojawia się tylko w trybie debug", () => {
    const error = new Error("zapis padł", { cause: "ENOSPC" });
    expect(solve("tool", error, false)).not.toContain("ENOSPC");
    expect(solve("tool", error, true)).toContain("ENOSPC");
  });

  it("wartości nie będące Error opisuje generycznie", () => {
    const output = solve("tool", "wybuch nie-Error");
    expect(output).toContain("Unknown error");
    expect(output).not.toContain("wybuch");
  });
});
