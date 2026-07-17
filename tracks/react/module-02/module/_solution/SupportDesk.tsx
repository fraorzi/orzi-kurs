import {
  Suspense,
  use,
  useOptimistic,
  useState,
  useSyncExternalStore,
} from "react";
import { IncidentList } from "./IncidentList";
import { NewIncidentForm } from "./NewIncidentForm";
import { Panel } from "./Panel";
import { ToastPortal } from "./ToastPortal";
import { createIncidentStore } from "./incident-store";
import type {
  DraftStorage,
  Incident,
} from "./types";
import { usePersistentDraft } from "./usePersistentDraft";

interface SupportDeskProps {
  readonly initialIncidentsPromise: Promise<readonly Incident[]>;
  readonly createIncident: (title: string) => Promise<Incident>;
  readonly storage: DraftStorage;
  readonly toastContainer: HTMLElement;
}

function SupportDeskContent({
  initialIncidentsPromise,
  createIncident,
  storage,
  toastContainer,
}: SupportDeskProps) {
  const initialIncidents = use(initialIncidentsPromise);
  const [store] = useState(() => createIncidentStore(initialIncidents));
  const incidents = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const [optimisticIncidents, addOptimisticIncident] = useOptimistic(
    incidents,
    (currentIncidents, incident: Incident) => [
      { ...incident, pending: true },
      ...currentIncidents,
    ],
  );
  const [draft, setDraft] = usePersistentDraft(
    "incident-draft",
    "",
    storage,
  );
  const [toast, setToast] = useState<string | null>(null);

  return (
    <Panel title="Panel incydentów">
      <NewIncidentForm
        draft={draft}
        setDraft={setDraft}
        createIncident={createIncident}
        onOptimisticCreated={addOptimisticIncident}
        onCreated={store.addIncident}
        onSuccess={setToast}
      />
      <IncidentList incidents={optimisticIncidents} />
      {toast && (
        <ToastPortal message={toast} container={toastContainer} />
      )}
    </Panel>
  );
}

export function SupportDesk(props: SupportDeskProps) {
  return (
    <Suspense fallback={<p role="status">Ładowanie incydentów…</p>}>
      <SupportDeskContent {...props} />
    </Suspense>
  );
}
