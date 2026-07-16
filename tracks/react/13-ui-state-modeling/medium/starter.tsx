import { useState } from "react";

export interface InviteFormProps {
  readonly onInvite: (email: string) => Promise<void>;
}

export function InviteForm({ onInvite }: InviteFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isSuccess) {
    return (
      <>
        <p>Zaproszono {email}</p>
        {error ? <p role="alert">{error}</p> : null}
      </>
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (!email.trim()) {
          return;
        }
        setIsSubmitting(true);
        try {
          await onInvite(email.trim());
          setIsSuccess(true);
        } catch {
          setError("Nie udało się wysłać zaproszenia.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <label>
        E-mail
        <input
          value={email}
          disabled={isSubmitting}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      {error ? <p role="alert">{error}</p> : null}
      <button type="submit" disabled={isSubmitting}>
        Wyślij zaproszenie
      </button>
    </form>
  );
}
