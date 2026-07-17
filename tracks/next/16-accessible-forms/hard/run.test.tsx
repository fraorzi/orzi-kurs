import { act, renderWithUser, screen } from "@harness/react-test";
import { describe, expect, it, vi } from "vitest";
import { PostEditor } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => { resolve = done; });
  return { promise, resolve };
}

describe("PostEditor", () => {
  it.each([
    ["Zapisz draft", "draft", "Zapisywanie…"],
    ["Opublikuj", "publish", "Publikowanie…"],
  ])("przekazuje intent z operacji %s", async (label, intent, pendingLabel) => {
    const operation = deferred();
    const action = vi.fn((data: FormData) => {
      expect(data.get("intent")).toBe(intent);
      return operation.promise;
    });
    const { user } = renderWithUser(<PostEditor action={action} />);
    await user.type(screen.getByRole("textbox", { name: "Treść" }), "Gotowy artykuł");
    await user.click(screen.getByRole("button", { name: label }));
    expect(screen.getByRole("button", { name: pendingLabel })).toBeDisabled();
    expect(screen.getAllByRole("button").every((button) => button.hasAttribute("disabled")))
      .toBe(true);
    await act(async () => {
      operation.resolve();
      await operation.promise;
    });
  });

  it("publikuje przez Ctrl+Enter z semantyką submittera", async () => {
    const action = vi.fn(async (data: FormData) => {
      expect(data.get("intent")).toBe("publish");
    });
    const { user } = renderWithUser(<PostEditor action={action} />);
    const editor = screen.getByRole("textbox", { name: "Treść" });
    await user.type(editor, "Gotowy artykuł");
    await user.keyboard("{Control>}{Enter}{/Control}");
    expect(action).toHaveBeenCalledOnce();
  });
});
