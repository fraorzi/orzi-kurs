import type { ComponentType, SVGProps } from "react";
import type { Catalog, CatalogTopic, CatalogTrack, TaskStatus } from "./types";
import { TRACK_ORDER, topicDisplayNumber } from "../../curriculum/order";
import {
  LogoJs,
  LogoTs,
  LogoJava,
  LogoReact,
  LogoNext,
  LogoNode,
  LogoCombined,
  LogoStrapi,
  LogoMysql,
  IconPuzzle,
} from "@/app/components/icons";

export type Category = "Języki" | "Frameworki" | "Backend & DB" | "Projekty";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface TrackMeta {
  id: string;
  name: string;
  category: Category;
  /** Kolor logo marki — dobrany tak, by był czytelny na ciemnym tle (near-black loga → jasny ink). */
  color: string;
}

const TRACK_META_BY_ID: Record<
  (typeof TRACK_ORDER)[number],
  Omit<TrackMeta, "id">
> = {
  js: { name: "JavaScript", category: "Języki", color: "#F7DF1E" },
  ts: { name: "TypeScript", category: "Języki", color: "#4C93E8" },
  react: { name: "React", category: "Frameworki", color: "#61DAFB" },
  next: { name: "Next.js", category: "Frameworki", color: "#EDEBE7" },
  node: { name: "Node.js", category: "Backend & DB", color: "#83CD29" },
  mysql: { name: "MySQL", category: "Backend & DB", color: "#7BB0CE" },
  strapi: { name: "Strapi", category: "Backend & DB", color: "#8B88FF" },
  combined: { name: "Projekty łączone", category: "Projekty", color: "#91A7FF" },
  java: { name: "Java", category: "Języki", color: "#E8E6E1" },
};

/** Pełna lista tracków (także jeszcze bez treści → „Wkrótce"). */
export const TRACK_META: TrackMeta[] = TRACK_ORDER.map((id) => ({
  id,
  ...TRACK_META_BY_ID[id],
}));

/** Oficjalne logo per track (simple-icons). */
const TRACK_ICON: Record<string, IconComponent> = {
  js: LogoJs,
  ts: LogoTs,
  java: LogoJava,
  react: LogoReact,
  next: LogoNext,
  node: LogoNode,
  strapi: LogoStrapi,
  mysql: LogoMysql,
  combined: LogoCombined,
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
  "passed-with-hint": "zaliczone ze wskazówką",
  failed: "do poprawy",
  "not-started": "nierozpoczęte",
};

export function isCompletedStatus(status: TaskStatus): boolean {
  return status === "passed" || status === "passed-with-hint";
}

export function isReviewDue(
  level: Pick<CatalogTrack["topics"][number]["levels"][number], "status" | "nextReviewAt">,
  now: Date | string = new Date(),
): boolean {
  if (!level.nextReviewAt) return level.status === "passed-with-hint";
  const reviewAt = new Date(level.nextReviewAt).getTime();
  const current = typeof now === "string" ? new Date(now).getTime() : now.getTime();
  return Number.isFinite(reviewAt) && Number.isFinite(current) && reviewAt <= current;
}

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
        "05-accessible-controlled-forms",
        "06-derived-state-no-effect",
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
        "14-form-actions",
        "15-form-status",
        "16-optimistic-updates",
        "17-use-suspense-errors",
        "18-external-store",
      ],
    },
    {
      id: "api-komponentow",
      title: "API komponentów i integracja",
      description: "Custom hooks, kompozycja, portale, moduł async, przejścia i API imperative.",
      slugs: [
        "19-custom-hooks",
        "20-composition-ownership",
        "21-portals-error-boundaries",
        "module-02",
        "22-concurrent-ui",
        "23-refs-layout",
      ],
    },
    {
      id: "jakosc",
      title: "Jakość, testy i wydajność",
      description: "Compiler, pomiary renderów, debug, optymalizacja, dostępność i duże listy.",
      slugs: [
        "24-react-compiler",
        "25-manual-memoization",
        "26-debugging-rendering",
        "26b-optimize-slow-view",
        "27-component-testing",
        "28-accessible-widgets",
        "29-large-lists",
        "30-dynamic-styles",
      ],
    },
    {
      id: "elective",
      title: "Elective: server state",
      description: "TanStack Query jako gotowa architektura cache i mutacji danych serwerowych.",
      slugs: ["31-server-state"],
    },
    {
      id: "projekty",
      title: "Projekty końcowe",
      description: "Końcowa integracja dostępności, cache'u i mutacji optymistycznych.",
      slugs: ["module-03"],
    },
  ],
  next: [
    {
      id: "fundamenty-routera",
      title: "App Router i granice wykonania",
      description: "Struktura routingu oraz świadome Server i Client Components.",
      range: [1, 2],
    },
    {
      id: "dane-i-cache",
      title: "Dane, Cache Components i rewalidacja",
      description: "Równoległe dane serwerowe, use cache, tagi i świeżość.",
      range: [3, 6],
    },
    {
      id: "routing-i-odpornosc",
      title: "Routing i odporne przejścia",
      description: "Dynamiczne segmenty, URL state oraz loading/error/not-found.",
      range: [7, 9],
    },
    {
      id: "mutacje-i-api",
      title: "Mutacje i granice HTTP",
      description: "Server Actions, Route Handlers, walidacja i spójność danych.",
      range: [10, 11],
    },
    {
      id: "produkt-i-bezpieczenstwo",
      title: "Produkt, bezpieczeństwo i streaming",
      description: "Metadata, DAL/authz, proxy, streaming i dostępne formularze.",
      range: [12, 16],
    },
    {
      id: "jakosc-produkcyjna",
      title: "Testy i jakość produkcyjna",
      description: "Strategia testów, instrumentacja, debug i optymalizacja.",
      range: [17, 20],
    },
    {
      id: "projekty",
      title: "Projekty końcowe",
      description: "Dwa wieloplikowe moduły łączące pełny przepływ Next.",
      slugs: ["module-01", "module-02"],
    },
  ],
};

export function trackProgress(track: CatalogTrack): TrackProgress {
  const levels = track.topics.flatMap((t) => t.levels);
  return {
    passed: levels.filter((level) => isCompletedStatus(level.status)).length,
    total: levels.length,
  };
}

export function learningModules(
  track: CatalogTrack,
  now: Date | string = new Date(),
): LearningModule[] {
  const currentTopic = nextLearningTarget(track, now)?.topic;
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

/** Następne nieukończone zagadnienie. Ukończenie ze wskazówką nadal trafia do powtórek. */
export function nextTopic(track: CatalogTrack) {
  return track.topics.find((topic) =>
    topic.levels.some((level) => !isCompletedStatus(level.status)),
  );
}

export type LearningTargetIntent = "resume" | "review" | "start";

export interface LearningTarget {
  topic: CatalogTopic;
  level: CatalogTopic["levels"][number];
  intent: LearningTargetIntent;
}

/** Jedna rekomendowana decyzja: wróć do próby, zrób powtórkę albo zacznij kolejny poziom. */
export function nextLearningTarget(
  track: CatalogTrack,
  now: Date | string = new Date(),
): LearningTarget | null {
  for (const topic of track.topics) {
    const level = topic.levels.find((item) => item.status === "failed");
    if (level) return { topic, level, intent: "resume" };
  }

  for (const topic of track.topics) {
    const level = topic.levels.find(
      (item) => isCompletedStatus(item.status) && isReviewDue(item, now),
    );
    if (level) return { topic, level, intent: "review" };
  }

  for (const topic of track.topics) {
    const level = topic.levels.find((item) => !isCompletedStatus(item.status));
    if (level) return { topic, level, intent: level.attempts > 0 ? "resume" : "start" };
  }

  return null;
}
