import { useSyncExternalStore } from "react";

export interface OnlineSource {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => boolean;
  getServerSnapshot: () => boolean;
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
