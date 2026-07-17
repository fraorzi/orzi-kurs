import { describe, expect, it, vi } from "vitest";
import { createContact, type ContactState } from "./starter";

const initialState: ContactState = {
  status: "idle",
  values: { email: "", message: "" },
};

describe("createContact", () => {
  it("zwraca oba błędy i zachowuje przycięte wartości", async () => {
    const formData = new FormData();
    formData.set("email", " broken ");
    formData.set("message", " short ");
    const save = vi.fn(async () => "c-1");
    await expect(createContact(initialState, formData, save)).resolves.toEqual({
      status: "error",
      values: { email: "broken", message: "short" },
      errors: {
        email: ["Podaj poprawny adres email."],
        message: ["Wiadomość musi mieć od 10 do 500 znaków."],
      },
    });
    expect(save).not.toHaveBeenCalled();
  });

  it("zapisuje wyłącznie zwalidowane wartości", async () => {
    const formData = new FormData();
    formData.set("email", " ada@example.com ");
    formData.set("message", " Proszę o kontakt w sprawie wdrożenia. ");
    const save = vi.fn(async () => "c-42");
    await expect(createContact(initialState, formData, save)).resolves.toEqual({
      status: "success",
      id: "c-42",
    });
    expect(save).toHaveBeenCalledWith({
      email: "ada@example.com",
      message: "Proszę o kontakt w sprawie wdrożenia.",
    });
  });
});
