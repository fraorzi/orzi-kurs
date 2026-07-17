export interface ContactValues {
  readonly email: string;
  readonly message: string;
}

export type ContactState =
  | { readonly status: "idle"; readonly values: ContactValues }
  | { readonly status: "error"; readonly values: ContactValues; readonly errors: { readonly email?: readonly string[]; readonly message?: readonly string[] } }
  | { readonly status: "success"; readonly id: string };

export async function createContact(
  _previousState: ContactState,
  formData: FormData,
  save: (values: ContactValues) => Promise<string>,
): Promise<ContactState> {
  const values = {
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
  const errors: {
    email?: readonly string[];
    message?: readonly string[];
  } = {};
  const atIndex = values.email.indexOf("@");
  const dotIndex = values.email.lastIndexOf(".");
  if (
    /\s/.test(values.email) ||
    atIndex <= 0 ||
    dotIndex <= atIndex + 1 ||
    dotIndex === values.email.length - 1
  ) {
    errors.email = ["Podaj poprawny adres email."];
  }
  if (values.message.length < 10 || values.message.length > 500) {
    errors.message = ["Wiadomość musi mieć od 10 do 500 znaków."];
  }
  if (errors.email || errors.message) {
    return { status: "error", values, errors };
  }
  return { status: "success", id: await save(values) };
}
