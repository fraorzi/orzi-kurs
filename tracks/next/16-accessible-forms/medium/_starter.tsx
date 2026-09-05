import { useActionState } from "react";

export interface FormState {
  readonly status: "idle" | "error" | "success";
  readonly id?: string;
  readonly errors?: {
    readonly email?: readonly string[];
    readonly message?: readonly string[];
  };
}

export function ContactForm({
  action,
}: {
  action: (
    state: FormState,
    data: FormData,
  ) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, {
    status: "idle",
  });
  return (
    <form action={formAction}>
      <label>
        Email
        <input name="email" />
      </label>
      <label>
        Wiadomość
        <textarea name="message" />
      </label>
      {state.errors?.email?.map((error) => (
        <p key={error}>{error}</p>
      ))}
      {state.errors?.message?.map((error) => (
        <p key={error}>{error}</p>
      ))}
      <button>Wyślij</button>
    </form>
  );
}
