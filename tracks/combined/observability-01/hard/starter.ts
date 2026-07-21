export interface Event {
  requestId: string;
  method: string;
  url: string;
  status: number;
  durationMs: number;
  userId?: string;
  error?: string;
}

export function observe(event: Event) {
  return event;
}
