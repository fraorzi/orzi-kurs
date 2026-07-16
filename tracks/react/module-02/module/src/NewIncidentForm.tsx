import {
  startTransition,
  useActionState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useFormStatus } from "react-dom";
import type { Incident } from "./types";

type FormState =
  | { readonly status: "idle" }
  | { readonly status: "error"; readonly message: string };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Tworzenie…" : "Utwórz incydent"}
    </button>
  );
}

export function NewIncidentForm({
  draft,
  setDraft,
  createIncident,
  onOptimisticCreated: _onOptimisticCreated,
  onCreated,
  onSuccess,
}: {
  readonly draft: string;
  readonly setDraft: Dispatch<SetStateAction<string>>;
  readonly createIncident: (title: string) => Promise<Incident>;
  readonly onOptimisticCreated: (incident: Incident) => void;
  readonly onCreated: (incident: Incident) => void;
  readonly onSuccess: (message: string) => void;
}) {
  const [state, submitAction] = useActionState<FormState, FormData>(
    async (_previousState, formData) => {
      const title = String(formData.get("title") ?? "");
      const incident = await createIncident(title);

      startTransition(() => {
        onCreated(incident);
        setDraft("");
        onSuccess(`Utworzono incydent ${incident.id}`);
      });
      return { status: "idle" };
    },
    { status: "idle" },
  );

  return (
    <form action={submitAction}>
      <label htmlFor="incident-title">Tytuł incydentu</label>
      <textarea
        id="incident-title"
        name="title"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <SubmitButton />
      {state.status === "error" && <p role="alert">{state.message}</p>}
    </form>
  );
}
