import { useSyncExternalStore } from "react";

export interface OnlineSource {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => boolean;
  readonly getServerSnapshot: () => boolean;
}

export function OnlineBadge({
  source,
}: {
  source: OnlineSource;
}) {
  const isOnline = useSyncExternalStore(
    source.subscribe,
    source.getSnapshot,
    source.getServerSnapshot,
  );

  return <p>{isOnline ? "Online" : "Offline"}</p>;
}
