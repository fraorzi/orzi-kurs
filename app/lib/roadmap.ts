import { compareTopicSlugs, sortTracksByLearningOrder } from "@/curriculum/order";
import { isCompletedStatus, topicNumber, topicSlug, trackMeta } from "./tracks";
import type { Catalog, CatalogTopic } from "./types";

// Side routes follow the elective split in docs/curriculum/JAVASCRIPT_AUDIT.md
// and the explicit Node elective topics. They never delay the next core topic.
const SIDE_ROUTES: Readonly<Record<string, string>> = {
  "js/05c-intl-segmenter": "js/05b-unicode",
  "js/29b-bigint": "js/29-numbers",
  "js/10b-promise-withresolvers": "js/10-promises",
  "js/20b-iterator-helpers": "js/20-iterators",
  "js/21b-async-generators": "js/21-generators",
  "js/22b-proxy-reflect": "js/22-property-descriptors",
  "js/18b-weakref": "js/18-weakmap-weakset",
  "js/27b-trampoline": "js/27-recursion",
  "js/31b-regex-advanced": "js/31-regex",
  "node/19-elective-sqlite": "node/module-01",
  "node/20-elective-websocket": "node/module-02",
};

export interface RoadmapTopic {
  id: string;
  title: string;
  number: string;
  href: string;
  trackId: string;
  kind: "topic" | "project";
  route: "core" | "side";
  passed: number;
  total: number;
  status: "complete" | "started" | "new";
}

export interface RoadmapStep {
  topic: RoadmapTopic;
  branches: RoadmapTopic[];
}

function roadmapTopic(topic: CatalogTopic, trackId: string): RoadmapTopic {
  const passed = topic.levels.filter((level) => isCompletedStatus(level.status)).length;
  return {
    id: topic.id,
    title: topic.title,
    number: topicNumber(topic.id),
    href: `/track/${trackId}/${topicSlug(topic.id)}`,
    trackId,
    kind: topicSlug(topic.id).startsWith("module-") || trackId === "combined" ? "project" : "topic",
    route: SIDE_ROUTES[topic.id] ? "side" : "core",
    passed,
    total: topic.levels.length,
    status:
      passed === topic.levels.length
        ? "complete"
        : topic.levels.some((level) => level.status !== "not-started" || level.attempts > 0)
          ? "started"
          : "new",
  };
}

export function buildRoadmap(catalog: Catalog) {
  const chapters = sortTracksByLearningOrder(catalog.tracks)
    .map((track) => {
      const topics = [...track.topics]
        .filter((topic) => topic.levels.length > 0)
        .sort((left, right) => compareTopicSlugs(track.id, topicSlug(left.id), topicSlug(right.id)))
        .map((topic) => roadmapTopic(topic, track.id));
      const core = topics.filter((topic) => topic.route === "core");
      const steps: RoadmapStep[] = core.map((topic) => ({ topic, branches: [] }));
      for (const topic of topics.filter((item) => item.route === "side")) {
        const parent =
          steps.find((step) => step.topic.id === SIDE_ROUTES[topic.id]) ?? steps.at(-1);
        if (parent) parent.branches.push(topic);
        else steps.push({ topic, branches: [] });
      }
      return {
        ...trackMeta(track.id),
        steps,
        passed: topics.filter((topic) => topic.status === "complete").length,
        total: topics.length,
      };
    })
    .filter((chapter) => chapter.total > 0);
  const steps = chapters.flatMap((chapter) => chapter.steps);
  const topics = steps.flatMap((step) => [step.topic, ...step.branches]);
  const current =
    steps.find((step) => step.topic.route === "core" && step.topic.status !== "complete")?.topic ??
    topics.find((topic) => topic.status !== "complete") ??
    null;

  return {
    chapters,
    steps,
    current,
    passed: topics.filter((topic) => topic.status === "complete").length,
    total: topics.length,
  };
}

export type Roadmap = ReturnType<typeof buildRoadmap>;

export function roadmapAnchor(id: string): string {
  return `island-${id.replaceAll("/", "-")}`;
}

export function islandPosition(index: number): number {
  return [36, 50, 64, 50][index % 4];
}
