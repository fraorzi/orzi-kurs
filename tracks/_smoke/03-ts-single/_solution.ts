export interface Entry {
  id: number;
  tags: string[];
}

export type TagCounts = Record<string, number>;

export function tagCounts(entries: Entry[]): TagCounts {
  const counts: TagCounts = {};
  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return counts;
}
