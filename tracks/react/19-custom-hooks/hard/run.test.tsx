import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  SaveAvailability,
  type NetworkSource,
} from "./starter";

describe("useNetworkStatus", () => {
  it("aktualizuje domenowy widok po zmianie źródła", () => {
    let online = true;
    const listeners = new Set<() => void>();
    const source: NetworkSource = {
      subscribe(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      getSnapshot: () => online,
      getServerSnapshot: () => true,
    };

    render(<SaveAvailability source={source} />);
    expect(screen.getByRole("button", { name: "Zapisz" })).toBeEnabled();

    act(() => {
      online = false;
      listeners.forEach((listener) => listener());
    });
    expect(screen.getByRole("button", { name: "Brak połączenia" }))
      .toBeDisabled();
  });

  it("udostępnia odroczony debug label dla współdzielonego hooka", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/19-custom-hooks/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toMatch(/useDebugValue\s*\(\s*online\s*,/);
    expect(source).toContain('"Online"');
    expect(source).toContain('"Offline"');
  });
});
