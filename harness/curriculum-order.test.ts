import { describe, expect, it } from "vitest";
import { learningModules } from "../app/lib/tracks";
import type { CatalogTrack } from "../app/lib/types";
import { compareTopicSlugs, TOPIC_ORDER, topicDisplayNumber } from "../curriculum/order";

describe("curriculum order", () => {
  it("places prerequisites before dependent JavaScript topics", () => {
    expect(compareTopicSlugs("js", "17-map-set", "08-closures")).toBeLessThan(0);
    expect(compareTopicSlugs("js", "16-error-handling", "11-async-await")).toBeLessThan(0);
    expect(compareTopicSlugs("js", "27-recursion", "21-generators")).toBeLessThan(0);
    expect(compareTopicSlugs("js", "24-event-emitter", "module-01")).toBeLessThan(0);
  });

  it("gives letter-suffixed legacy directories unique roadmap numbers", () => {
    expect(topicDisplayNumber("js/05-strings")).not.toBe(
      topicDisplayNumber("js/05b-unicode"),
    );
    expect(topicDisplayNumber("js/09b-modules")).not.toBe(
      topicDisplayNumber("js/09-array-methods"),
    );
    expect(topicDisplayNumber("js/module-01")).toBe("M1");
  });

  it("places the JavaScript mid core before specialist electives", () => {
    expect(compareTopicSlugs("js", "09b-modules", "module-01")).toBeLessThan(0);
    expect(compareTopicSlugs("js", "module-05", "18b-weakref")).toBeLessThan(0);
    expect(compareTopicSlugs("js", "module-05", "31b-regex-advanced")).toBeLessThan(0);
  });

  it("places TypeScript type operators and tuples before type transformations", () => {
    expect(compareTopicSlugs("ts", "04b-type-operators", "08-mapped-types")).toBeLessThan(0);
    expect(compareTopicSlugs("ts", "06c-tuples", "09-conditional-types")).toBeLessThan(0);
    expect(compareTopicSlugs("ts", "17-runtime-boundaries", "18-type-challenges")).toBeLessThan(0);
  });

  it("keeps TypeScript learning modules in exact catalog order", () => {
    const track: CatalogTrack = {
      id: "ts",
      topics: TOPIC_ORDER.ts.map((slug) => ({
        id: `ts/${slug}`,
        title: slug,
        levels: [],
      })),
    };

    expect(
      learningModules(track).flatMap((module) => module.topics.map((topic) => topic.id)),
    ).toEqual(track.topics.map((topic) => topic.id));
  });

  it("keeps React foundations before effects, Actions and optimization", () => {
    expect(
      compareTopicSlugs(
        "react",
        "06-derived-state-no-effect",
        "07-effects-synchronization",
      ),
    ).toBeLessThan(0);
    expect(compareTopicSlugs("react", "13-ui-state-modeling", "14-form-actions"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("react", "24-react-compiler", "25-manual-memoization"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("react", "module-01", "module-02"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("react", "module-02", "22-concurrent-ui"))
      .toBeLessThan(0);
  });

  it("keeps React learning modules in exact catalog order", () => {
    const track: CatalogTrack = {
      id: "react",
      topics: TOPIC_ORDER.react.map((slug) => ({
        id: `react/${slug}`,
        title: slug,
        levels: [],
      })),
    };

    expect(
      learningModules(track).flatMap((module) =>
        module.topics.map((topic) => topic.id)),
    ).toEqual(track.topics.map((topic) => topic.id));
  });
});
