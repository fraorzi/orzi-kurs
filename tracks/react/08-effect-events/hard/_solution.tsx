import { useEffect, useEffectEvent } from "react";

export interface PollingScheduler {
  start(
    intervalMs: number,
    callback: () => void,
  ): () => void;
}

export interface SearchPollingProps {
  intervalMs: number;
  query: string;
  scheduler: PollingScheduler;
  onPoll: (query: string) => void;
}

export function SearchPolling({
  intervalMs,
  query,
  scheduler,
  onPoll,
}: SearchPollingProps) {
  const onTick = useEffectEvent(() => {
    onPoll(query);
  });

  useEffect(
    () => scheduler.start(intervalMs, onTick),
    [intervalMs, scheduler],
  );

  return <p>Polling: {query}</p>;
}
