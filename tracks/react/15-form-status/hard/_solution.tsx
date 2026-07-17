import { useFormStatus } from "react-dom";

function ActionSubmitButton({
  idleLabel,
  pendingLabel,
}: {
  readonly idleLabel: string;
  readonly pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}

export function WorkspaceOperations({
  exportData,
  archiveWorkspace,
}: {
  readonly exportData: () => Promise<void>;
  readonly archiveWorkspace: () => Promise<void>;
}) {
  return (
    <section>
      <form action={exportData}>
        <ActionSubmitButton
          idleLabel="Eksportuj dane"
          pendingLabel="Eksportowanie…"
        />
      </form>
      <form action={archiveWorkspace}>
        <ActionSubmitButton
          idleLabel="Archiwizuj workspace"
          pendingLabel="Archiwizowanie…"
        />
      </form>
    </section>
  );
}
