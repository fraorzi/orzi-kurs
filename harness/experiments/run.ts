import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative, sep } from "node:path";
import { build, type Plugin } from "esbuild";
import { assertPathWithinRoot, findStarter, resolveTaskDir } from "../paths";
import { REPO_ROOT } from "../progress";
import { runTypecheck } from "../typecheck";
import { EXPERIMENTS } from "./catalog";
import { inferExperiment } from "./infer";
import { componentEntry } from "./component-entry";
import { isJsonValue, isRecord, type ExperimentDefinition, type ExperimentResult, type JsonValue } from "../../shared/experiments";

function visibleSource(path: string): boolean {
  return !basename(path).startsWith("_") && !/run\.test\.|\.verify-backup/.test(path);
}

export function experimentSourceVersion(taskDir: string): string {
  const hash = createHash("sha256");
  function walk(directory: string): void {
    for (const name of readdirSync(directory).sort()) {
      const file = join(directory, name);
      if (!visibleSource(file)) continue;
      assertPathWithinRoot(file, taskDir);
      if (statSync(file).isDirectory()) walk(file);
      else if (/\.(?:[cm]?[jt]sx?|json|sql|css)$/.test(name)) hash.update(relative(taskDir, file)).update(readFileSync(file));
    }
  }
  walk(taskDir);
  return hash.digest("hex");
}

export function experimentForTask(taskId: string) {
  let taskDir: string;
  try { taskDir = resolveTaskDir(taskId); } catch { return null; }
  if (!existsSync(taskDir)) return null;
  const starter = findStarter(taskDir);
  if (!starter) return null;
  const definition = Object.hasOwn(EXPERIMENTS, taskId) ? EXPERIMENTS[taskId] : inferExperiment(starter);
  if (!definition) return null;
  return { definition, sourceVersion: experimentSourceVersion(taskDir) };
}

function sourceBoundary(taskDir: string): Plugin {
  const dependencies = realpathSync(join(REPO_ROOT, "node_modules"));
  return { name: "student-source-boundary", setup(builder) {
    builder.onLoad({ filter: /.*/ }, (args) => {
      const file = realpathSync(args.path);
      if (file.startsWith(dependencies + sep)) return;
      assertPathWithinRoot(file, taskDir);
      if (relative(taskDir, file).split(sep).some((part) => !visibleSource(part))) {
        throw new Error("Podgląd nie może importować rozwiązania wzorcowego, szablonu ani testów.");
      }
    });
  } };
}

export async function compileExperiment(taskDir: string, definition: Extract<ExperimentDefinition, { kind: "function" | "component" }>) {
  const starter = findStarter(taskDir);
  if (!starter || statSync(starter).isDirectory()) throw new Error("Ten eksperyment wymaga pojedynczego pliku startera.");
  return build({
    absWorkingDir: REPO_ROOT, bundle: true, write: false, logLevel: "silent", plugins: [sourceBoundary(taskDir)],
    platform: definition.kind === "component" ? "browser" : "node",
    format: definition.kind === "component" ? "iife" : "cjs",
    jsx: "automatic", target: definition.kind === "component" ? "es2022" : "node22",
    define: { "process.env.NODE_ENV": '"development"' },
    ...(definition.kind === "component"
      ? { stdin: { contents: componentEntry(starter, definition.exportName), resolveDir: taskDir, loader: "jsx" } }
      : { entryPoints: [starter] }),
  });
}

export async function runFunctionBundle(code: string, exportName: string, input: JsonValue[], signal?: AbortSignal): Promise<{ value: string; logs: string[] }> {
  const directory = realpathSync(mkdtempSync(join(tmpdir(), "orzi-experiment-")));
  try {
    writeFileSync(join(directory, "task.cjs"), code);
    copyFileSync(join(REPO_ROOT, "harness/experiments/function-worker.mjs"), join(directory, "worker.mjs"));
    return await new Promise((resolveResult, reject) => {
      const child = spawn(process.execPath, ["--experimental-permission", `--allow-fs-read=${directory}`, "--max-old-space-size=96", join(directory, "worker.mjs"), join(directory, "task.cjs"), exportName], {
        cwd: directory, env: { NODE_ENV: "test" }, stdio: ["pipe", "pipe", "pipe", "pipe"],
      });
      let protocol = "";
      let outputBytes = 0;
      let failure: string | null = null;
      const cancel = () => { failure = "Anulowano uruchomienie."; child.kill("SIGKILL"); };
      signal?.addEventListener("abort", cancel, { once: true });
      if (signal?.aborted) cancel();
      const timeout = setTimeout(() => { failure = "Przekroczono limit 5 sekund. Sprawdź pętle i oczekujące operacje."; child.kill("SIGKILL"); }, 5000);
      child.stdin?.on("error", () => { /* Child may exit before reading invalid code. */ });
      child.stdin?.end(JSON.stringify(input));
      child.stdio[3]?.on("data", (data: Buffer) => { protocol += data.toString(); if (protocol.length > 64000) { failure = "Wynik przekracza limit rozmiaru."; child.kill("SIGKILL"); } });
      for (const stream of [child.stdout, child.stderr]) stream?.on("data", (data: Buffer) => {
        outputBytes += data.length;
        if (outputBytes > 64000) { failure = "Kod generuje zbyt dużo danych wyjściowych."; child.kill("SIGKILL"); }
      });
      child.once("error", (error) => { clearTimeout(timeout); signal?.removeEventListener("abort", cancel); reject(error); });
      child.once("close", () => {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", cancel);
        if (failure) { reject(new Error(failure)); return; }
        try {
          const result: unknown = JSON.parse(protocol);
          if (!isRecord(result)) throw new Error("Nieprawidłowa odpowiedź procesu.");
          if (result.ok !== true) throw new Error(typeof result.error === "string" ? result.error : "Wykonanie zakończyło się błędem.");
          if (typeof result.value !== "string" || !Array.isArray(result.logs) || !result.logs.every((item): item is string => typeof item === "string")) throw new Error("Nieprawidłowy wynik procesu.");
          resolveResult({ value: result.value, logs: result.logs });
        } catch (error) { reject(error instanceof SyntaxError ? new Error("Proces zakończył się bez wyniku. Sprawdź błędy lub zużycie pamięci.") : error); }
      });
    });
  } finally { rmSync(directory, { recursive: true, force: true }); }
}

export function previewDocument(code: string): string {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; base-uri 'none'; form-action 'none'"><style>html{color-scheme:dark}body{font:14px/1.5 system-ui;background:#201f1e;color:#efeee9;padding:20px;margin:0}button,input,select,textarea{font:inherit}button,input,select{padding:8px}button{cursor:pointer}output{font-size:24px}*{box-sizing:border-box}</style></head><body><div id="preview"></div><script>${code.replace(/<\/script/gi, "<\\/script")}</script></body></html>`;
}

export async function runExperiment(taskId: string, input: unknown, signal?: AbortSignal): Promise<ExperimentResult> {
  const experiment = experimentForTask(taskId);
  if (!experiment) throw new Error("To zadanie nie ma eksperymentu.");
  const taskDir = resolveTaskDir(taskId);
  const { definition, sourceVersion } = experiment;
  if (definition.kind === "types") return { kind: "types", sourceVersion, issues: await runTypecheck(taskDir) };
  if (!isJsonValue(input)) throw new Error("Dane muszą być prawidłowym JSON o głębokości do 20 poziomów.");
  if (definition.kind === "sql") {
    const { runSqlExperiment } = await import("./sql");
    return { kind: "table", sourceVersion, ...await runSqlExperiment(taskDir, input) };
  }
  if (definition.kind === "function" && !Array.isArray(input)) throw new Error("Argumenty funkcji muszą być tablicą JSON.");
  if (definition.kind === "component" && !isRecord(input)) throw new Error("Propsy muszą być obiektem JSON.");
  const compiled = await compileExperiment(taskDir, definition);
  if (experimentSourceVersion(taskDir) !== sourceVersion) throw new Error("Kod zmienił się podczas przygotowania. Uruchom przykład ponownie.");
  const code = compiled.outputFiles?.[0]?.text;
  if (!code) throw new Error("Nie udało się przygotować kodu.");
  if (definition.kind === "component") return { kind: "component", sourceVersion, document: previewDocument(code) };
  if (!Array.isArray(input)) throw new Error("Argumenty funkcji muszą być tablicą JSON.");
  return { kind: "value", sourceVersion, ...await runFunctionBundle(code, definition.exportName, input, signal) };
}
