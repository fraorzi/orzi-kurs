// @vitest-environment jsdom

import { Profiler } from "react";
import { describe, expect, it } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { Counter } from "./starter";

describe("React TSX smoke task", () => {
  it("renderuje, obsługuje interakcję i liczy commity Profilera", async () => {
    const counter = createRenderCounter();
    const { user } = renderWithUser(
      <Profiler id="counter" onRender={counter.onRender}>
        <Counter />
      </Profiler>,
    );
    const button = screen.getByRole("button", { name: "Kliknięcia: 0" });

    expect(counter.commits).toBe(1);
    expect(counter.phases).toEqual(["mount"]);

    await user.click(button);

    expect(button).toHaveAccessibleName("Kliknięcia: 1");
    expect(counter.commits).toBe(2);
    expect(counter.phases).toEqual(["mount", "update"]);
  });
});
