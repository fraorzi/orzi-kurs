import { useState } from "react";

export function WorkspaceOperations({
  exportData,
  archiveWorkspace,
}: {
  exportData: () => Promise<void>;
  archiveWorkspace: () => Promise<void>;
}) {
  const [isPending, setIsPending] = useState(false);

  async function run(operation: () => Promise<void>) {
    setIsPending(true);
    try {
      await operation();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section>
      <form action={() => run(exportData)}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Eksportowanie…" : "Eksportuj dane"}
        </button>
      </form>
      <form action={() => run(archiveWorkspace)}>
        <button type="submit" disabled={isPending}>
          {isPending
            ? "Archiwizowanie…"
            : "Archiwizuj workspace"}
        </button>
      </form>
    </section>
  );
}
