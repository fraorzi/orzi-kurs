import { useEffect, useState } from "react";
import type { DraftStorage } from "./types";

export function usePersistentDraft(
  key: string,
  initialValue: string,
  storage: DraftStorage,
) {
  const [draft, setDraft] = useState(initialValue);

  useEffect(() => {
    storage.setItem(key, draft);
  }, [draft, key, storage]);

  return [draft, setDraft] as const;
}
