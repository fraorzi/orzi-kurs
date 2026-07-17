export interface OnlineSource {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => boolean;
  readonly getServerSnapshot: () => boolean;
}

export function OnlineBadge({
  source,
}: {
  readonly source: OnlineSource;
}) {
  const isOnline = source.getSnapshot();
  return <p>{isOnline ? "Online" : "Offline"}</p>;
}
