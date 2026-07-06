import { readFileSync, existsSync } from "node:fs";

export function parseHints(hintsPath: string): string[] {
  if (!existsSync(hintsPath)) return [];
  const raw = readFileSync(hintsPath, "utf8");
  const sections: string[] = [];
  const re = /^##\s+Hint\s+\d+\s*$/gim;
  const matches = [...raw.matchAll(re)];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : raw.length;
    sections.push(raw.slice(start, end).trim());
  }
  return sections;
}

export function getHint(hintsPath: string, n: number): string | null {
  const hints = parseHints(hintsPath);
  if (n < 1 || n > hints.length) return null;
  return hints[n - 1];
}
