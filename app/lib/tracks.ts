import type { ComponentType, SVGProps } from "react";
import type { Catalog, CatalogTrack, TaskStatus } from "./types";
import {
  LogoJs,
  LogoTs,
  LogoJava,
  LogoReact,
  LogoNext,
  LogoStrapi,
  LogoMysql,
  IconPuzzle,
} from "@/app/components/icons";

export type Category = "Języki" | "Frameworki" | "Backend & DB" | "Projekty";

export const CATEGORIES: Category[] = ["Języki", "Frameworki", "Backend & DB", "Projekty"];

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface TrackMeta {
  id: string;
  name: string;
  category: Category;
  /** Kolor logo marki — dobrany tak, by był czytelny na ciemnym tle (near-black loga → jasny ink). */
  color: string;
}

/** Pełna lista tracków (także jeszcze bez treści → „Wkrótce"). */
export const TRACK_META: TrackMeta[] = [
  { id: "js", name: "JavaScript", category: "Języki", color: "#F7DF1E" },
  { id: "ts", name: "TypeScript", category: "Języki", color: "#4C93E8" },
  { id: "java", name: "Java", category: "Języki", color: "#E8E6E1" },
  { id: "react", name: "React", category: "Frameworki", color: "#61DAFB" },
  { id: "next", name: "Next.js", category: "Frameworki", color: "#EDEBE7" },
  { id: "strapi", name: "Strapi", category: "Backend & DB", color: "#8B88FF" },
  { id: "mysql", name: "MySQL", category: "Backend & DB", color: "#7BB0CE" },
  { id: "combined", name: "Projekty łączone", category: "Projekty", color: "#B7B0A6" },
];

/** Oficjalne logo per track (simple-icons). */
const TRACK_ICON: Record<string, IconComponent> = {
  js: LogoJs,
  ts: LogoTs,
  java: LogoJava,
  react: LogoReact,
  next: LogoNext,
  strapi: LogoStrapi,
  mysql: LogoMysql,
  combined: IconPuzzle,
};

export function trackIcon(id: string): IconComponent {
  return TRACK_ICON[id] ?? IconPuzzle;
}

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

/** "21-generators" → "21", "module-01" → "M1" (numer z prefiksu katalogu). */
export function topicNumber(topicId: string): string {
  const slug = topicSlug(topicId);
  const m = slug.match(/^(\d+)/);
  if (m) return m[1];
  const mod = slug.match(/^module-0*(\d+)/);
  return mod ? `M${mod[1]}` : "";
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
  module: "projekt wieloplikowy — łączy poznane wzorce",
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
