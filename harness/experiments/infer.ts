import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import type { ExperimentDefinition } from "../../shared/experiments";

const FUNCTION_EXPORT = /^export (?:async )?function ([A-Za-z_$][\w$]*)/gm;
const CONST_FN_EXPORT = /^export const ([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\(|function\b)/gm;

function runtimeExports(source: string): string[] {
  return [...source.matchAll(FUNCTION_EXPORT), ...source.matchAll(CONST_FN_EXPORT)].map((match) => match[1]);
}

function testImports(taskDir: string): string[] {
  for (const name of ["run.test.ts", "run.test.tsx", "run.test.js", "run.test.jsx"]) {
    const file = join(taskDir, name);
    if (!existsSync(file)) continue;
    const block = readFileSync(file, "utf8").match(
      /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']\.\/starter(?:\.[cm]?[jt]sx?)?["']/,
    )?.[1];
    if (!block) return [];
    return block.split(",").flatMap((part) => {
      const name = part.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0]?.trim();
      return name ? [name] : [];
    });
  }
  return [];
}

function isHook(name: string): boolean {
  return /^use[A-Z]/.test(name);
}

export function inferExperiment(starter: string): ExperimentDefinition | null {
  if (statSync(starter).isDirectory() || starter.endsWith(".sql")) return null;
  const source = readFileSync(starter, "utf8");
  if (/\bfrom\s+["']next(?:\/|$)/.test(source)) return null;
  const names = runtimeExports(source).filter((name) => !isHook(name));
  const imported = testImports(dirname(starter)).filter((name) => names.includes(name));
  const ranked = imported.length > 0 ? imported : names;
  const component = (starter.endsWith(".tsx") || starter.endsWith(".jsx"))
    ? ranked.find((name) => /^[A-Z]/.test(name))
    : undefined;
  if (component) {
    return {
      kind: "component", title: component, exportName: component, example: {},
      description: "Zmień propsy bez ponownego montowania komponentu. Uruchomienie nie zapisuje próby.",
    };
  }
  const fn = ranked[0];
  if (fn) {
    return {
      kind: "function", title: `${fn}()`, exportName: fn, example: [],
      description: "Podaj argumenty jako tablicę JSON. Uruchomienie nie zapisuje próby.",
    };
  }
  if (!starter.endsWith(".tsx") && !starter.endsWith(".jsx") && /^export (?:type|interface) /m.test(source)) {
    return {
      kind: "types", title: "Diagnostyka typów",
      description: "Zapisz kod w IDE i sprawdź diagnostykę kompilatora. To uruchomienie nie zapisuje próby.",
    };
  }
  return null;
}
