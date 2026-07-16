import type { ComponentType, SVGProps } from "react";
import type { Catalog, CatalogTopic, CatalogTrack, TaskStatus } from "./types";
import { topicDisplayNumber } from "../../curriculum/order";
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
  const displayNumber = topicDisplayNumber(topicId);
  if (displayNumber) return displayNumber;

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
  slugs?: string[];
  range?: [number, number];
}

const LEARNING_MODULES: Record<string, LearningModuleDefinition[]> = {
  js: [
    {
      id: "fundamenty",
      title: "Fundamenty języka",
      description: "Funkcje, typy, liczby, iteracja oraz świadoma praca z tekstem.",
      slugs: [
        "01-functions",
        "02-scope",
        "03-types-coercion",
        "29-numbers",
        "29b-bigint",
        "04-loops",
        "05-strings",
        "05b-unicode",
        "05c-intl-segmenter",
        "31-regex",
      ],
    },
    {
      id: "dane",
      title: "Dane i struktury",
      description: "Obiekty, kolekcje, niemutowalność, serializacja, czas i domknięcia.",
      slugs: [
        "06-objects",
        "07-destructuring",
        "09-array-methods",
        "23-immutability",
        "17-map-set",
        "17b-set-operations",
        "17c-grouping",
        "28-json",
        "30-date",
        "08-closures",
        "27-recursion",
        "27b-trampoline",
      ],
    },
    {
      id: "model-obiektowy",
      title: "Model obiektowy i niezawodność",
      description: "this, prototypy, klasy, błędy i diagnoza typowych usterek.",
      slugs: [
        "13-this-bind",
        "14-prototypes",
        "15-classes",
        "16-error-handling",
        "19-debug-logic",
      ],
    },
    {
      id: "asynchronicznosc",
      title: "Asynchroniczność i integracje",
      description: "Promisy, event loop, odporne żądania oraz sterowanie zdarzeniami.",
      slugs: [
        "10-promises",
        "10b-promise-withresolvers",
        "11-async-await",
        "12-event-loop",
        "16b-async-errors",
        "32-fetch",
        "25-debounce-throttle",
        "25b-debounce-variants",
        "26-debug-async",
        "24-event-emitter",
        "module-01",
      ],
    },
    {
      id: "iteracja",
      title: "Leniwa iteracja i metaprogramowanie",
      description: "Iteratory, generatory, kontrola właściwości i świadome zarządzanie pamięcią.",
      slugs: [
        "20-iterators",
        "20b-iterator-helpers",
        "21-generators",
        "21b-async-generators",
        "22-property-descriptors",
        "22b-proxy-reflect",
        "18-weakmap-weakset",
        "18b-weakref",
        "module-04",
      ],
    },
    {
      id: "jakosc",
      title: "Wydajność i projekty produkcyjne",
      description: "Profilowanie, dobór struktur, ograniczanie pracy i moduły przekrojowe.",
      slugs: [
        "31b-regex-advanced",
        "33-debug-perf",
        "34-optimize-data-structures",
        "35-optimize-repeated-work",
        "module-03",
        "36-optimize-allocations",
        "37-optimize-async",
        "module-02",
        "module-05",
      ],
    },
  ],
  ts: [
    { id: "fundamenty", title: "Fundamenty typowania", description: "Inference, unie, obiekty i kontrakty funkcji.", range: [1, 4] },
    { id: "generyki", title: "Generyki i reużywalne kontrakty", description: "Parametry typów, constraints i standardowe utility types.", range: [5, 7] },
    { id: "typy-zaawansowane", title: "Transformacje typów", description: "Mapped, conditional i template literal types.", range: [8, 10] },
    { id: "projekt-typy", title: "Projekt: model typów", description: "Pierwszy przekrojowy moduł spinający typy i generyki.", slugs: ["module-01"] },
    { id: "model-obiektowy", title: "Model obiektowy i bezpieczne API", description: "Klasy, enumy, const objects oraz satisfies.", range: [11, 12] },
    { id: "moduly-i-diagnostyka", title: "Moduły i diagnostyka typów", description: "Deklaracje modułów, ścisła konfiguracja i diagnozowanie złożonych typów.", range: [13, 14] },
    { id: "runtime", title: "Typy na granicy runtime", description: "Koszt wykonania, asynchroniczność, DOM i walidacja danych zewnętrznych.", range: [15, 17] },
    { id: "mistrzostwo", title: "Zaawansowane konstrukcje", description: "Type challenges i najnowsze możliwości języka.", range: [18, 19] },
    { id: "projekt-runtime", title: "Projekt: bezpieczny runtime", description: "Końcowy moduł łączący typy statyczne z kodem wykonywanym.", slugs: ["module-02"] },
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

  const assigned = new Set<string>();
  const modules = definitions.flatMap((definition) => {
    const topics = track.topics.filter((topic) => {
      if (assigned.has(topic.id)) return false;
      if (definition.slugs) return definition.slugs.includes(topicSlug(topic.id));
      const number = Number.parseInt(topicSlug(topic.id), 10);
      return definition.range !== undefined && number >= definition.range[0] && number <= definition.range[1];
    });
    if (topics.length === 0) return [];
    for (const topic of topics) assigned.add(topic.id);
    return [{
      ...definition,
      topics,
      current: topics.some((topic) => topic.id === currentTopic?.id),
      ...trackProgress({ ...track, topics }),
    }];
  });

  const leftover = track.topics.filter((topic) => !assigned.has(topic.id));
  if (leftover.length > 0) {
    modules.push({
      id: "nowe",
      title: "Nowe zagadnienia",
      description: "Świeżo dodane tematy, jeszcze nieprzypisane do etapu.",
      topics: leftover,
      current: leftover.some((topic) => topic.id === currentTopic?.id),
      ...trackProgress({ ...track, topics: leftover }),
    });
  }
  return modules;
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
