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
  const isOnline = source.getSnapshot();
  return <p>{isOnline ? "Online" : "Offline"}</p>;
}
