import {
  useEffect,
  useState,
} from "react";

export interface NotificationSource {
  subscribe(listener: (count: number) => void): () => void;
}

export function NotificationBadge({
  source,
}: {
  readonly source: NotificationSource;
}) {
  const [count, setCount] = useState(0);

  useEffect(
    () => source.subscribe(setCount),
    [source],
  );

  return <output aria-label="Nieprzeczytane">{count}</output>;
}

