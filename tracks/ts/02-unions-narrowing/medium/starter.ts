// TODO
export type AnalyticsEvent = {
  type: string;
  path?: string;
  selector?: string;
  count?: number;
  message?: string;
  fatal?: boolean;
};

export function describeEvent(event: AnalyticsEvent): string {
  // TODO
  return "";
}

export function countFatal(events: AnalyticsEvent[]): number {
  // TODO
  return 0;
}
