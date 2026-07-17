import { type FormEvent } from "react";

export interface Credentials {
  readonly email: string;
  readonly password: string;
}

export function LoginForm({
  onSubmit,
}: {
  readonly onSubmit: (credentials: Credentials) => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        E-mail
        <input name="email" type="email" />
      </label>
      <label>
        Hasło
        <input name="password" type="password" />
      </label>
      <button type="submit">Zaloguj</button>
    </form>
  );
}
