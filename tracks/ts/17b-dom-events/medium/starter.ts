export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginResult =
  | { ok: true; value: LoginInput }
  | { ok: false; errors: string[] };

export function parseLoginForm(form: HTMLFormElement): LoginResult {
  // TODO: FormDataEntryValue | null wymaga narrowing
  return { ok: false, errors: [] };
}
