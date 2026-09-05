import { useDebugValue, useSyncExternalStore } from "react";

export interface NetworkSource {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => boolean;
  readonly getServerSnapshot: () => boolean;
}

export function useNetworkStatus(
  source: NetworkSource,
): boolean {
  const online = useSyncExternalStore(
    source.subscribe,
    source.getSnapshot,
    source.getServerSnapshot,
  );
  useDebugValue(online, (value) =>
    value ? "Online" : "Offline",
  );
  return online;
}

export function SaveAvailability({
  source,
}: {
  source: NetworkSource;
}) {
  const online = useNetworkStatus(source);

  return (
    <button type="button" disabled={!online}>
      {online ? "Zapisz" : "Brak połączenia"}
    </button>
  );
}
