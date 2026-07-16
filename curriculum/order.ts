const JS_TOPIC_ORDER = [
  "01-functions",
  "02-scope",
  "03-types-coercion",
  "29-numbers",
  "04-loops",
  "05-strings",
  "05b-unicode",
  "31-regex",
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
  "13-this-bind",
  "14-prototypes",
  "15-classes",
  "16-error-handling",
  "19-debug-logic",
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
  "20-iterators",
  "21-generators",
  "22-property-descriptors",
  "18-weakmap-weakset",
  "module-04",
  "33-debug-perf",
  "34-optimize-data-structures",
  "35-optimize-repeated-work",
  "36-optimize-allocations",
  "37-optimize-async",
  "module-02",
  "module-03",
  "module-05",
  "05c-intl-segmenter",
  "29b-bigint",
  "10b-promise-withresolvers",
  "20b-iterator-helpers",
  "21b-async-generators",
  "22b-proxy-reflect",
  "18b-weakref",
  "27b-trampoline",
  "31b-regex-advanced",
] as const;

const TS_TOPIC_ORDER = [
  "01-basic-types",
  "02-unions-narrowing",
  "02b-advanced-narrowing",
  "03-objects",
  "03b-structural-typing",
  "04-functions",
  "04b-type-operators",
  "05-generics",
  "06-generic-constraints",
  "06b-modern-generics",
  "06c-tuples",
  "07-utility-types",
  "08-mapped-types",
  "09-conditional-types",
  "10-template-literal-types",
  "10b-recursive-types",
  "module-01",
  "11-classes",
  "12-enums-satisfies",
  "13-modules-declarations",
  "13b-module-augmentation",
  "13c-strict-tsconfig",
  "14-debug-types",
  "14b-variance",
  "14c-type-tests",
  "15-optimize-runtime",
  "16-async-types",
  "17-runtime-boundaries",
  "17b-dom-events",
  "18-type-challenges",
  "19-ts-migration",
  "20-modern-features",
  "module-02",
] as const;

export const TOPIC_ORDER: Readonly<Record<string, readonly string[]>> = {
  js: JS_TOPIC_ORDER,
  ts: TS_TOPIC_ORDER,
};

export function compareTopicSlugs(track: string, left: string, right: string): number {
  const order = TOPIC_ORDER[track];
  if (!order) return left.localeCompare(right);

  const leftIndex = order.indexOf(left);
  const rightIndex = order.indexOf(right);
  if (leftIndex === -1 || rightIndex === -1) {
    if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
    return leftIndex === -1 ? 1 : -1;
  }
  return leftIndex - rightIndex;
}

export function topicDisplayNumber(topicId: string): string | null {
  const [track, slug] = topicId.split("/");
  const moduleMatch = slug?.match(/^module-0*(\d+)/);
  if (moduleMatch) return `M${moduleMatch[1]}`;

  const order = TOPIC_ORDER[track];
  const index = order?.indexOf(slug);
  if (index === undefined || index < 0) return null;

  const lessonNumber = order
    .slice(0, index + 1)
    .filter((item) => !item.startsWith("module-"))
    .length;
  return String(lessonNumber).padStart(2, "0");
}
