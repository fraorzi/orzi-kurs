export interface Event { documentId: string; action: string; locale: string }
export function solve(events: Event[]): Event[] {
  const seen = new Set<string>();
  return events.filter((event) => {
    const key = `${event.documentId}:${event.action}:${event.locale}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

