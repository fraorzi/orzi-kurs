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
        "04-loops",
        "05-strings",
        "05b-unicode",
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
        "09b-modules",
        "23-immutability",
        "17-map-set",
        "17b-set-operations",
        "17c-grouping",
        "28-json",
        "30-date",
        "08-closures",
        "27-recursion",
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
        "21-generators",
        "22-property-descriptors",
        "18-weakmap-weakset",
        "module-04",
      ],
    },
    {
      id: "jakosc",
      title: "Wydajność i projekty produkcyjne",
      description: "Profilowanie, dobór struktur, ograniczanie pracy i moduły przekrojowe.",
      slugs: [
        "33-debug-perf",
        "34-optimize-data-structures",
        "35-optimize-repeated-work",
        "36-optimize-allocations",
        "37-optimize-async",
        "module-02",
        "module-03",
        "module-05",
      ],
    },
    {
      id: "elective",
      title: "Elective: specjalistyczne API języka",
      description: "Przydatne rozszerzenia, które nie blokują osiągnięcia poziomu mid.",
      slugs: [
        "05c-intl-segmenter",
        "29b-bigint",
        "10b-promise-withresolvers",
        "20b-iterator-helpers",
        "21b-async-generators",
        "22b-proxy-reflect",
        "18b-weakref",
        "27b-trampoline",
        "31b-regex-advanced",
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
    { id: "mistrzostwo", title: "Zaawansowane konstrukcje i migracja", description: "Type challenges, migracja między wersjami i najnowsze możliwości języka.", range: [18, 20] },
    { id: "projekt-runtime", title: "Projekt: bezpieczny runtime", description: "Końcowy moduł łączący typy statyczne z kodem wykonywanym.", slugs: ["module-02"] },
  ],
  react: [
    {
      id: "fundamenty-ui",
      title: "Fundamenty komponentów i stanu",
      description: "Komponenty, JSX, identity, snapshot stanu, formularze i dane pochodne.",
      slugs: [
        "01-components-props-purity",
        "02-jsx-lists-identity",
        "03-state-snapshot-batching",
        "04-immutable-state",
        "05-accessible-forms",
        "06-derived-state",
      ],
    },
    {
      id: "escape-hatches",
      title: "Efekty jako escape hatch",
      description: "Synchronizacja z systemami zewnętrznymi, Effect Events, fetch i refy.",
      slugs: [
        "07-effects-synchronization",
        "08-effect-events",
        "09-fetch-effects",
        "10-refs-ids",
      ],
    },
    {
      id: "architektura-stanu",
      title: "Architektura stanu",
      description: "Reducer, context, modelowanie stanów UI i pierwszy moduł praktyczny.",
      slugs: [
        "11-reducer",
        "12-context",
        "module-01",
        "13-ui-state-modeling",
      ],
    },
    {
      id: "async-ui",
      title: "Asynchroniczne UI React 19",
      description: "Actions, status formularza, optimistic UI, Suspense i zewnętrzne store'y.",
      slugs: [
        "14-actions",
        "15-form-status",
        "16-optimistic",
        "17-use-suspense-errors",
        "18-external-store",
      ],
    },
    {
      id: "api-komponentow",
      title: "Reużywalne API komponentów",
      description: "Custom hooks, kompozycja, portale, przejścia oraz kontrolowane API imperative.",
      slugs: [
        "19-custom-hooks",
        "20-composition",
        "21-portals-error-boundaries",
        "22-transitions-activity",
        "23-imperative-layout",
      ],
    },
    {
      id: "jakosc",
      title: "Jakość, testy i wydajność",
      description: "Compiler, pomiary renderów, debug, optymalizacja, dostępność i duże listy.",
      slugs: [
        "24-react-compiler",
        "25-manual-memoization",
        "26-debug-renders-effects",
        "26b-optimize-renders",
        "27-component-testing",
        "28-accessibility",
        "29-list-performance",
        "30-dynamic-styles",
      ],
    },
    {
      id: "elective",
      title: "Elective: server state",
      description: "TanStack Query jako gotowa architektura cache i mutacji danych serwerowych.",
      slugs: ["31-tanstack-query"],
    },
    {
      id: "projekty",
      title: "Projekty końcowe",
      description: "Moduły łączące Actions, Suspense, optimistic UI, cache i store zewnętrzny.",
      slugs: ["module-02", "module-03"],
    },
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
