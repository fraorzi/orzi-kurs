import { describe, expect, it } from "vitest";
import { learningModules, trackIcon, TRACK_META } from "../app/lib/tracks";
import { LogoCombined, LogoNode } from "../app/components/icons";
import type { CatalogTrack } from "../app/lib/types";
import {
  compareTopicSlugs,
  compareTrackIds,
  TOPIC_ORDER,
  topicDisplayNumber,
  TRACK_ORDER,
} from "../curriculum/order";

describe("curriculum order", () => {
  it("has explicit UI metadata for every public curriculum track", () => {
    expect(TRACK_META.map((track) => track.id).sort())
      .toEqual(Object.keys(TOPIC_ORDER).sort());
  });

  it("keeps every track list in the documented learning order", () => {
    expect([...TRACK_ORDER].reverse().sort(compareTrackIds)).toEqual(TRACK_ORDER);
    expect(TRACK_META.map((track) => track.id)).toEqual(TRACK_ORDER);
  });

  it("uses the dedicated Node.js mark", () => {
    expect(trackIcon("node")).toBe(LogoNode);
  });

  it("uses the dedicated combined-projects mark", () => {
    expect(trackIcon("combined")).toBe(LogoCombined);
  });

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

  it("keeps Next foundations before cache, mutations and production quality", () => {
    expect(compareTopicSlugs("next", "02-server-client-boundaries", "04-cache-components"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("next", "06-revalidation", "10-server-actions"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("next", "13-auth-data-access", "14-proxy"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("next", "17-testing", "19b-optimize-next"))
      .toBeLessThan(0);
  });

  it("keeps Next learning modules in exact catalog order", () => {
    const track: CatalogTrack = {
      id: "next",
      topics: TOPIC_ORDER.next.map((slug) => ({
        id: `next/${slug}`,
        title: slug,
        levels: [],
      })),
    };

    expect(
      learningModules(track).flatMap((module) =>
        module.topics.map((topic) => topic.id)),
    ).toEqual(track.topics.map((topic) => topic.id));
  });
  it("keeps Node runtime foundations before networking and production concerns", () => {
    expect(compareTopicSlugs("node", "01-runtime-modules-native-ts", "03-url-path-fs"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("node", "05-events-cancellation", "07-http-client"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("node", "09-streams-backpressure", "17-cli"))
      .toBeLessThan(0);
    expect(compareTopicSlugs("node", "16-security-permissions", "module-01"))
      .toBeLessThan(0);
  });

  it("keeps Node learning modules in exact catalog order", () => {
    const track: CatalogTrack = {
      id: "node",
      topics: TOPIC_ORDER.node.map((slug) => ({
        id: `node/${slug}`,
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
