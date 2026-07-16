import { useState } from "react";

export interface InviteFormProps {
  readonly onInvite: (email: string) => Promise<void>;
}

type InviteState =
  | { readonly status: "editing"; readonly email: string }
  | { readonly status: "submitting"; readonly email: string }
  | {
      readonly status: "error";
      readonly email: string;
      readonly message: string;
    }
  | { readonly status: "success"; readonly invitedEmail: string };

export function InviteForm({ onInvite }: InviteFormProps) {
  const [state, setState] = useState<InviteState>({
    status: "editing",
    email: "",
  });

  if (state.status === "success") {
    return <p>Zaproszono {state.invitedEmail}</p>;
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (state.status === "submitting" || !state.email.trim()) {
          return;
        }
        const email = state.email.trim();
        setState({ status: "submitting", email });
        try {
          await onInvite(email);
          setState({ status: "success", invitedEmail: email });
        } catch {
          setState({
            status: "error",
            email,
            message: "Nie udało się wysłać zaproszenia.",
          });
        }
      }}
    >
      <label>
        E-mail
        <input
          value={state.email}
          disabled={state.status === "submitting"}
          onChange={(event) => {
            setState({
              status: "editing",
              email: event.currentTarget.value,
            });
          }}
        />
      </label>
      {state.status === "error" ? (
        <p role="alert">{state.message}</p>
      ) : null}
      <button type="submit" disabled={state.status === "submitting"}>
        Wyślij zaproszenie
      </button>
    </form>
  );
}
