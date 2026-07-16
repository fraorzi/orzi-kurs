import {
  existsSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { TRACKS_ROOT } from "./paths";

function filesRecursively(path: string, files: string[] = []): string[] {
  for (const name of readdirSync(path).sort((left, right) => (
    left.localeCompare(right)
  ))) {
    const candidate = join(path, name);

    if (statSync(candidate).isDirectory()) {
      filesRecursively(candidate, files);
    } else {
      files.push(candidate);
    }
  }

  return files;
}

describe("typed UI curriculum contract", () => {
  it.each(["react", "next"])(
    "keeps the %s track free of JavaScript and JSX sources",
    (track) => {
      const root = join(TRACKS_ROOT, track);
      if (!existsSync(root)) return;

      const untypedSources = filesRecursively(root)
        .filter((file) => /\.(?:cjs|js|jsx|mjs)$/.test(file))
        .map((file) => relative(TRACKS_ROOT, file));

      expect(untypedSources).toEqual([]);
    },
  );
});
