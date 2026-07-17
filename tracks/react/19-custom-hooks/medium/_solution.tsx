import {
  useEffect,
  useState,
} from "react";

export interface DraftStorage {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
}

export function usePersistentDraft(
  key: string,
  initialValue: string,
  storage: DraftStorage,
) {
  const [draft, setDraft] = useState(
    () => storage.getItem(key) ?? initialValue,
  );

  useEffect(() => {
    storage.setItem(key, draft);
  }, [draft, key, storage]);

  return [draft, setDraft] as const;
}

export function DraftEditor({
  storage,
}: {
  readonly storage: DraftStorage;
}) {
  const [draft, setDraft] = usePersistentDraft(
    "support-draft",
    "",
    storage,
  );

  return (
    <label>
      Treść zgłoszenia
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
    </label>
  );
}
