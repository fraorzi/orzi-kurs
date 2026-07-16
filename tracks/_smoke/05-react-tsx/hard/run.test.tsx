// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ConditionalCounter } from "./starter";

describe("React hooks lint smoke task", () => {
  it("obsługuje oba warianty propsa i interakcję", async () => {
    const { rerender, user } = renderWithUser(
      <ConditionalCounter enabled={false} />,
    );
    expect(screen.getByText("Licznik wyłączony")).toBeInTheDocument();

    rerender(<ConditionalCounter enabled />);
    await user.click(screen.getByRole("button", { name: "Kliknięcia: 0" }));

    expect(screen.getByRole("button")).toHaveAccessibleName("Kliknięcia: 1");
  });
});
