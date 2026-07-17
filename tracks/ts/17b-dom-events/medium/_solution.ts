export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginResult =
  | { ok: true; value: LoginInput }
  | { ok: false; errors: string[] };

export function parseLoginForm(form: HTMLFormElement): LoginResult {
  const data = new FormData(form);
  const emailEntry = data.get("email");
  const passwordEntry = data.get("password");
  const email = typeof emailEntry === "string" ? emailEntry.trim() : "";
  const password =
    typeof passwordEntry === "string" ? passwordEntry.trim() : "";
  const errors: string[] = [];

  if (!email.includes("@")) errors.push("email");
  if (password.length < 8) errors.push("password");
  return errors.length > 0
    ? { ok: false, errors }
    : {
        ok: true,
        value: { email, password, remember: data.has("remember") },
      };
}
