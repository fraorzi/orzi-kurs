import type { ComponentType, SVGProps } from "react";
import type { Catalog, CatalogTopic, CatalogTrack, TaskStatus } from "./types";
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

export const STATUS_LABEL: Record<TaskStatus, string> = {
  passed: "zaliczone",
  "passed-with-hint": "zaliczone z hintem",
  failed: "próbowane",
  "not-started": "nie zaczęte",
};

export interface TrackProgress {
  passed: number;
  total: number;
}

export interface LearningModule extends TrackProgress {
  id: string;
  title: string;
  description: string;
  topics: CatalogTopic[];
  current: boolean;
}

interface LearningModuleDefinition {
  id: string;
  title: string;
  description: string;
  range?: [number, number];
  projects?: boolean;
}

const LEARNING_MODULES: Record<string, LearningModuleDefinition[]> = {
  js: [
    { id: "fundamenty", title: "Fundamenty języka", description: "Funkcje, typy, iteracja, obiekty i praca z kolekcjami.", range: [1, 9] },
    { id: "asynchronicznosc", title: "Asynchroniczność", description: "Promisy, async/await i model działania event loopa.", range: [10, 12] },
    { id: "model-obiektowy", title: "Model obiektowy i niezawodność", description: "this, prototypy, klasy, błędy i struktury danych.", range: [13, 19] },
    { id: "iteracja", title: "Iteracja i metaprogramowanie", description: "Iteratory, generatory, deskryptory, Proxy i niemutowalność.", range: [20, 23] },
    { id: "wzorce", title: "Wzorce aplikacyjne", description: "Zdarzenia, kontrola częstotliwości, rekurencja, dane i fetch.", range: [24, 32] },
    { id: "jakosc", title: "Debugowanie i wydajność", description: "Diagnoza problemów, dobór struktur i optymalizacja pracy.", range: [33, 37] },
    { id: "projekty", title: "Projekty przekrojowe", description: "Wieloplikowe zadania łączące materiał z całej ścieżki.", projects: true },
  ],
  ts: [
    { id: "fundamenty", title: "Fundamenty typowania", description: "Inference, unie, obiekty i kontrakty funkcji.", range: [1, 4] },
    { id: "generyki", title: "Generyki i reużywalne kontrakty", description: "Parametry typów, constraints i standardowe utility types.", range: [5, 7] },
    { id: "typy-zaawansowane", title: "Transformacje typów", description: "Mapped, conditional i template literal types.", range: [8, 10] },
    { id: "model-obiektowy", title: "Model obiektowy i bezpieczne API", description: "Klasy, enumy, const objects oraz satisfies.", range: [11, 12] },
    { id: "projekty", title: "Projekt przekrojowy", description: "Typowanie kompletnego, wieloplikowego modułu.", projects: true },
  ],
};

export function trackProgress(track: CatalogTrack): TrackProgress {
  const levels = track.topics.flatMap((t) => t.levels);
  return { passed: levels.filter((l) => l.status === "passed").length, total: levels.length };
}

export function learningModules(track: CatalogTrack): LearningModule[] {
  const currentTopic = track.topics.find((topic) =>
    topic.levels.some((level) => level.status !== "passed"),
  );
  const definitions = LEARNING_MODULES[track.id];

  if (!definitions) {
    return Array.from({ length: Math.ceil(track.topics.length / 8) }, (_, index) => {
      const topics = track.topics.slice(index * 8, index * 8 + 8);
      return {
        id: `etap-${index + 1}`,
        title: `Etap ${index + 1}`,
        description: "Kolejny blok zagadnień w tej ścieżce.",
        topics,
        current: topics.some((topic) => topic.id === currentTopic?.id),
        ...trackProgress({ ...track, topics }),
      };
    });
  }

  return definitions.flatMap((definition) => {
    const topics = track.topics.filter((topic) => {
      if (definition.projects) return topicSlug(topic.id).startsWith("module-");
      const number = Number.parseInt(topicSlug(topic.id), 10);
      return definition.range !== undefined && number >= definition.range[0] && number <= definition.range[1];
    });
    if (topics.length === 0) return [];
    return [{
      ...definition,
      topics,
      current: topics.some((topic) => topic.id === currentTopic?.id),
      ...trackProgress({ ...track, topics }),
    }];
  });
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
