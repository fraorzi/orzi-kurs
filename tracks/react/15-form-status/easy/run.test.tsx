import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ContactForm } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("ContactForm", () => {
  it("pokazuje pending z kontekstu nadrzędnego formularza", async () => {
    const operation = deferred();
    const sendMessage = vi.fn(() => operation.promise);
    const { user } = renderWithUser(
      <ContactForm sendMessage={sendMessage} />,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Wiadomość" }),
      "Dzień dobry",
    );
    await user.click(screen.getByRole("button", { name: "Wyślij" }));

    expect(sendMessage).toHaveBeenCalledWith("Dzień dobry");
    expect(screen.getByRole("button", { name: "Wysyłanie…" }))
      .toBeDisabled();

    await act(async () => {
      operation.resolve();
      await operation.promise;
    });
    expect(screen.getByRole("button", { name: "Wyślij" })).toBeEnabled();
  });
});
