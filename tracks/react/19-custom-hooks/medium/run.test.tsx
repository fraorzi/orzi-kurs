import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import {
  DraftEditor,
  type DraftStorage,
} from "./starter";

describe("usePersistentDraft", () => {
  it("odtwarza istniejący draft i zapisuje zmiany", async () => {
    const values = new Map([["support-draft", "Wersja robocza"]]);
    const storage: DraftStorage = {
      getItem: vi.fn((key) => values.get(key) ?? null),
      setItem: vi.fn((key, value) => {
        values.set(key, value);
      }),
    };
    const { user } = renderWithUser(<DraftEditor storage={storage} />);
    const textarea = screen.getByRole("textbox", {
      name: "Treść zgłoszenia",
    });

    expect(textarea).toHaveValue("Wersja robocza");
    expect(storage.getItem).toHaveBeenCalledTimes(1);

    await user.clear(textarea);
    await user.type(textarea, "Nowa treść");
    await waitFor(() => {
      expect(values.get("support-draft")).toBe("Nowa treść");
    });
  });
});
