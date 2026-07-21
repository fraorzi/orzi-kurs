export interface Event {
  requestId: string;
  method: string;
  url: string;
  status: number;
  durationMs: number;
  userId?: string;
  error?: string;
}

export interface Observation {
  log: {
    requestId: string;
    method: string;
    path: string;
    status: number;
    durationMs: number;
    outcome: "ok" | "error";
  };
  metric: {
    name: string;
    labels: { method: string; route: string; statusClass: string };
    value: number;
  };
}

export function observe(event: Event): Observation {
  const path = new URL(event.url, "https://service.local").pathname;
  const statusClass = `${Math.floor(event.status / 100)}xx`;
  return {
    log: {
      requestId: event.requestId,
      method: event.method,
      path,
      status: event.status,
      durationMs: event.durationMs,
      outcome: event.status >= 500 ? "error" : "ok",
    },
    metric: {
      name: "http_server_duration_ms",
      labels: { method: event.method, route: path, statusClass },
      value: event.durationMs,
    },
  };
}
