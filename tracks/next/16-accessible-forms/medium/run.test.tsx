import { act, renderWithUser, screen } from "@harness/react-test";
import { describe, expect, it, vi } from "vitest";
import { ContactForm, type FormState } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

describe("ContactForm", () => {
  it("wiąże komunikaty z polami", async () => {
    const action = vi.fn(async (): Promise<FormState> => ({
      status: "error",
      errors: {
        email: ["Podaj poprawny email."],
        message: ["Wiadomość jest za krótka."],
      },
    }));
    const { user } = renderWithUser(<ContactForm action={action} />);
    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Wiadomość" });
    await user.type(email, "x@x.pl");
    await user.type(message, "krótka");
    await user.click(screen.getByRole("button", { name: "Wyślij" }));
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", "email-error");
    expect(message).toHaveAttribute("aria-describedby", "message-error");
    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });

  it("pokazuje pending i wynik sukcesu", async () => {
    const operation = deferred<FormState>();
    const { user } = renderWithUser(<ContactForm action={() => operation.promise} />);
    await user.type(screen.getByRole("textbox", { name: "Email" }), "ada@example.com");
    await user.type(screen.getByRole("textbox", { name: "Wiadomość" }), "Dłuższa wiadomość");
    await user.click(screen.getByRole("button", { name: "Wyślij" }));
    expect(screen.getByRole("button", { name: "Wysyłanie…" })).toBeDisabled();
    await act(async () => {
      operation.resolve({ status: "success", id: "c-7" });
      await operation.promise;
    });
    expect(screen.getByRole("status")).toHaveTextContent("Wysłano zgłoszenie c-7");
  });
});
