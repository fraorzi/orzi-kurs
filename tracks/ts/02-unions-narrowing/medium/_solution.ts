export type AnalyticsEvent =
  | { type: "pageview"; path: string }
  | { type: "click"; selector: string; count: number }
  | { type: "error"; message: string; fatal: boolean };

export function describeEvent(event: AnalyticsEvent): string {
  switch (event.type) {
    case "pageview":
      return `pageview: ${event.path}`;
    case "click":
      return `click: ${event.selector} ×${event.count}`;
    case "error":
      return event.fatal
        ? `error: ${event.message} (krytyczny)`
        : `error: ${event.message}`;
    default: {
      const exhaustive: never = event;
      throw new Error(`nieznane zdarzenie: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export function countFatal(events: AnalyticsEvent[]): number {
  return events.filter((event) => event.type === "error" && event.fatal).length;
}
