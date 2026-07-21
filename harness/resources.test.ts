import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resourcesForTask } from "./resources";

const tracksRoot = join(process.cwd(), "tracks");

describe("resourcesForTask", () => {
  it("returns a topic-specific resource when one is configured", () => {
    expect(resourcesForTask("js/01-functions/easy")).toEqual([
      expect.objectContaining({
        title: "Funkcje w JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      }),
    ]);
  });

  it("keeps deliberate module resources", () => {
    expect(resourcesForTask("js/module-01/easy")).not.toHaveLength(0);
    expect(resourcesForTask("ts/module-01/easy")).not.toHaveLength(0);
  });

  it.each(["js", "ts", "react", "next"])("covers every %s topic", (track) => {
    const topics = readdirSync(join(tracksRoot, track), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const topic of topics) {
      expect(resourcesForTask(`${track}/${topic}/easy`), `${track}/${topic}`).not.toHaveLength(0);
    }
  });

  it("returns complete, secure resource metadata", () => {
    for (const track of ["js", "ts", "react", "next"]) {
      const topics = readdirSync(join(tracksRoot, track), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);

      for (const topic of topics) {
        for (const resource of resourcesForTask(`${track}/${topic}/easy`)) {
          expect(resource.title).not.toBe("");
          expect(resource.description).not.toBe("");
          expect(resource.url).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("returns no fake resource for unknown tracks or topics", () => {
    expect(resourcesForTask("js/not-configured/easy")).toEqual([]);
    expect(resourcesForTask("unknown/01-functions/easy")).toEqual([]);
  });
});
