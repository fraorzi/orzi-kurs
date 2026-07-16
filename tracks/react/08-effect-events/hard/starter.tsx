import { useEffect } from "react";

export interface PollingScheduler {
  start(intervalMs: number, callback: () => void): () => void;
}

export interface SearchPollingProps {
  readonly intervalMs: number;
  readonly query: string;
  readonly scheduler: PollingScheduler;
  readonly onPoll: (query: string) => void;
}

export function SearchPolling({
  intervalMs,
  query,
  scheduler,
  onPoll,
}: SearchPollingProps) {
  useEffect(() => (
    scheduler.start(intervalMs, () => onPoll(query))
  ), [intervalMs, onPoll, query, scheduler]);

  return <p>Polling: {query}</p>;
}
