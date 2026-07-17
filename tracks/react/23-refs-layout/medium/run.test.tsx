import { createRef } from "react";
import { describe, expect, it } from "vitest";
import {
  act,
  render,
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  EditorPanel,
  NoteEditor,
  type EditorHandle,
} from "./starter";

describe("NoteEditor", () => {
  it("wystawia ograniczony uchwyt zamiast elementu DOM", () => {
    const ref = createRef<EditorHandle>();
    render(<NoteEditor ref={ref} />);

    expect(ref.current).not.toBeInstanceOf(HTMLElement);
    expect(Object.keys(ref.current ?? {}).sort()).toEqual(["focus", "selectAll"]);

    act(() => ref.current?.focus());
    expect(screen.getByRole("textbox", { name: "Notatka" })).toHaveFocus();
  });

  it("pozwala panelowi zaznaczyć całą treść", async () => {
    const { user } = renderWithUser(<EditorPanel />);
    const textarea = screen.getByRole("textbox", { name: "Notatka" });
    await user.type(textarea, "Plan wdrożenia");

    await user.click(screen.getByRole("button", { name: "Zaznacz notatkę" }));

    expect(textarea).toHaveFocus();
    expect(textarea).toHaveProperty("selectionStart", 0);
    expect(textarea).toHaveProperty("selectionEnd", "Plan wdrożenia".length);
  });
});

