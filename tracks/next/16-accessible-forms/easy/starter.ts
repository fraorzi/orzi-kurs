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
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  return { status: "success", id: await save(values) };
}
