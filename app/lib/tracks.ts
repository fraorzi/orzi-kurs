import type { Catalog, CatalogTrack, TaskStatus } from "./types";

export type Category = "Języki" | "Frameworki" | "Backend & DB" | "Projekty";

export const CATEGORIES: Category[] = ["Języki", "Frameworki", "Backend & DB", "Projekty"];

export interface TrackMeta {
  id: string;
  name: string;
  category: Category;
  color: string;
}

/** Pełna lista tracków (także jeszcze bez treści → „Wkrótce"). Kolory w OKLCH. */
export const TRACK_META: TrackMeta[] = [
  { id: "js", name: "JavaScript", category: "Języki", color: "oklch(0.80 0.13 78)" },
  { id: "ts", name: "TypeScript", category: "Języki", color: "oklch(0.72 0.14 268)" },
  { id: "react", name: "React", category: "Frameworki", color: "oklch(0.78 0.11 200)" },
  { id: "next", name: "Next.js", category: "Frameworki", color: "oklch(0.85 0.02 260)" },
  { id: "strapi", name: "Strapi", category: "Backend & DB", color: "oklch(0.68 0.15 285)" },
  { id: "mysql", name: "MySQL", category: "Backend & DB", color: "oklch(0.76 0.15 152)" },
  { id: "combined", name: "Projekty łączone", category: "Projekty", color: "oklch(0.72 0.15 40)" },
];

export function trackMeta(id: string): TrackMeta {
  return (
    TRACK_META.find((t) => t.id === id) ?? {
      id,
      name: id,
      category: "Języki",
      color: "oklch(0.75 0.02 260)",
    }
  );
}

/** topic.id = "js/21-generators" → slug "21-generators". */
export function topicSlug(topicId: string): string {
  return topicId.split("/")[1] ?? topicId;
}

/** "21-generators" → "21" (numer z prefiksu katalogu). */
export function topicNumber(topicId: string): string {
  const m = topicSlug(topicId).match(/^(\d+)/);
  return m ? m[1] : "";
}

/** Typ zagadnienia z nazwy katalogu: [D] debug, [O] optymalizacja. */
export function topicTag(topicId: string): "D" | "O" | null {
  const s = topicSlug(topicId);
  if (/debug/.test(s)) return "D";
  if (/optim|optym/.test(s)) return "O";
  return null;
}

export const LEVEL_DESC: Record<string, string> = {
  easy: "prawie przepisanie z teorii",
  medium: "wariacja, trzeba zrozumieć",
  hard: "pełne zrozumienie tematu",
};

export const STATUS_LABEL: Record<TaskStatus, string> = {
  passed: "zaliczone",
  failed: "próbowane",
  "not-started": "nie zaczęte",
};

export interface TrackProgress {
  passed: number;
  total: number;
}

export function trackProgress(track: CatalogTrack): TrackProgress {
  const levels = track.topics.flatMap((t) => t.levels);
  return { passed: levels.filter((l) => l.status === "passed").length, total: levels.length };
}

export function pct({ passed, total }: TrackProgress): number {
  return total === 0 ? 0 : Math.round((passed / total) * 100);
}

/** Pierwszy track z treścią (aktywny). */
export function activeTrack(catalog: Catalog): CatalogTrack | undefined {
  return catalog.tracks[0];
}

/** Następne niezaliczone zagadnienie (pierwsze z poziomem ≠ passed). */
export function nextTopic(track: CatalogTrack) {
  return (
    track.topics.find((t) => t.levels.some((l) => l.status !== "passed")) ?? track.topics[0]
  );
}
