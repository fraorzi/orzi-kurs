import { readdirSync, existsSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { Progress } from "./types";
import { readProgress } from "./progress";
import { TRACKS_ROOT } from "./paths";

export interface CatalogLevel {
  id: string;
  status: "passed" | "failed" | "not-started";
}

export interface CatalogTopic {
  id: string;
  title: string;
  levels: CatalogLevel[];
}

export interface CatalogTrack {
  id: string;
  topics: CatalogTopic[];
}

export interface Catalog {
  tracks: CatalogTrack[];
}

const LEVEL_ORDER = ["easy", "medium", "hard"];

function dirsIn(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => statSync(join(path, name)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function h1Title(readmePath: string, fallback: string): string {
  if (!existsSync(readmePath)) return fallback;
  const raw = readFileSync(readmePath, "utf8");
  const match = raw.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : fallback;
}

function isTaskDir(path: string): boolean {
  return existsSync(join(path, "task.md")) ||
    ["js", "ts"].some((ext) => existsSync(join(path, `starter.${ext}`)));
}

function levelStatus(
  taskDir: string,
  progress: Progress,
): CatalogLevel["status"] {
  const id = relative(TRACKS_ROOT, taskDir).split("\\").join("/");
  return progress[id]?.status ?? "not-started";
}

function collectLevels(topicDir: string, progress: Progress): CatalogLevel[] {
  const levels: CatalogLevel[] = [];
  const subdirs = dirsIn(topicDir);

  const ordered = subdirs.sort((a, b) => {
    const ia = LEVEL_ORDER.indexOf(a);
    const ib = LEVEL_ORDER.indexOf(b);
    if (ia !== -1 || ib !== -1) {
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    }
    return a.localeCompare(b);
  });

  for (const sub of ordered) {
    const isLevel = LEVEL_ORDER.includes(sub) || sub.startsWith("module-");
    if (!isLevel) continue;
    const dir = join(topicDir, sub);
    if (!isTaskDir(dir)) continue;
    levels.push({ id: sub, status: levelStatus(dir, progress) });
  }
  return levels;
}

export function buildCatalog(progress: Progress = readProgress()): Catalog {
  const tracks: CatalogTrack[] = [];

  for (const trackName of dirsIn(TRACKS_ROOT)) {
    if (trackName.startsWith("_")) continue;
    const trackDir = join(TRACKS_ROOT, trackName);
    const topics: CatalogTopic[] = [];

    for (const topicName of dirsIn(trackDir)) {
      if (topicName.startsWith("_")) continue;
      const topicDir = join(trackDir, topicName);
      const levels = collectLevels(topicDir, progress);
      if (levels.length === 0) continue;
      topics.push({
        id: `${trackName}/${topicName}`,
        title: h1Title(join(topicDir, "README.md"), topicName),
        levels,
      });
    }

    if (topics.length > 0) tracks.push({ id: trackName, topics });
  }

  return { tracks };
}
