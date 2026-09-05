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
  const [state, formAction, pending] = useActionState(
    action,
    { status: "idle" },
  );
  const emailInvalid = Boolean(state.errors?.email?.length);
  const messageInvalid = Boolean(
    state.errors?.message?.length,
  );
  return (
    <form action={formAction}>
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        required
        aria-invalid={emailInvalid || undefined}
        aria-describedby={
          emailInvalid ? "email-error" : undefined
        }
      />
      {emailInvalid && (
        <p id="email-error" role="alert">
          {state.errors!.email!.join(" ")}
        </p>
      )}
      <label htmlFor="contact-message">Wiadomość</label>
      <textarea
        id="contact-message"
        name="message"
        required
        aria-invalid={messageInvalid || undefined}
        aria-describedby={
          messageInvalid ? "message-error" : undefined
        }
      />
      {messageInvalid && (
        <p id="message-error" role="alert">
          {state.errors!.message!.join(" ")}
        </p>
      )}
      <button type="submit" disabled={pending}>
        {pending ? "Wysyłanie…" : "Wyślij"}
      </button>
      {state.status === "success" && (
        <p role="status" aria-live="polite">
          Wysłano zgłoszenie {state.id}
        </p>
      )}
    </form>
  );
}
