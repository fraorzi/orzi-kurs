// TODO: unia rozłączna trzech wariantów zdarzenia (dyskryminator: type).
export type AnalyticsEvent = {
  type: string;
  path?: string;
  selector?: string;
  count?: number;
  message?: string;
  fatal?: boolean;
};

export function describeEvent(event: AnalyticsEvent): string {
  // TODO: switch po event.type + bramka never w default
  return "";
}

export function countFatal(events: AnalyticsEvent[]): number {
  // TODO: liczba błędów krytycznych
  return 0;
}
