export type AnalyticsEvent =
  | { type: "pageview"; path: string }
  | { type: "click"; selector: string; count: number }
  | { type: "error"; message: string; fatal: boolean };

export function describeEvent(
  event: AnalyticsEvent,
): string {
  switch (event.type) {
    case "pageview":
      return `${event.type}: ${event.path}`;
    case "click":
      return `${event.type}: ${event.selector} ×${event.count}`;
    case "error":
      return (
        `${event.type}: ${event.message}` +
        (event.fatal ? " (krytyczny)" : "")
      );
    default: {
      throw new Error(
        `nieznane zdarzenie: ${JSON.stringify(event)}`,
      );
    }
  }
}

export function countFatal(
  events: AnalyticsEvent[],
): number {
  let count = 0;
  for (const event of events) {
    if (event.type === "error" && event.fatal) {
      count++;
    }
  }
  return count;
}
