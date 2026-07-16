import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Profiler } from "react";
import { describe, expect, it } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  CounterProvider,
  CounterValue,
  IncrementButton,
} from "./starter";

describe("CounterProvider", () => {
  it("utrzymuje osobne granice contextu stanu i dispatchu", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/12-context/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source.match(/createContext</g)).toHaveLength(2);
    expect(source).toContain("<CounterStateContext value={count}>");
    expect(source).toContain("<CounterDispatchContext value={dispatch}>");
    expect(source).not.toContain("useMemo");
  });

  it("nie renderuje konsumenta dispatchu po zmianie samego stanu", async () => {
    const buttonRenders = createRenderCounter();
    const { user } = renderWithUser(
      <CounterProvider>
        <CounterValue />
        <Profiler id="button" onRender={buttonRenders.onRender}>
          <IncrementButton />
        </Profiler>
      </CounterProvider>,
    );
    buttonRenders.reset();

    await user.click(screen.getByRole("button", { name: "Zwiększ" }));

    expect(screen.getByRole("status", { name: "Licznik" }))
      .toHaveTextContent("1");
    expect(buttonRenders.commits).toBe(0);
  });
});
