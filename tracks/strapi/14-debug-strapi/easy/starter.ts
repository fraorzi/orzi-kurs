export interface Entry {
  title: string;
  cover?: { url: string } | null;
}

export function solve(entry: Entry): { title: string; coverUrl: string | null } {
  return { title: entry.title, coverUrl: entry.cover!.url };
}
