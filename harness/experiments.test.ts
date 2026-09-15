import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { GET, POST } from "../app/api/experiment/route";
import { compileExperiment, experimentForTask, experimentSourceVersion, runExperiment, runFunctionBundle } from "./experiments/run";

const temporary: string[] = [];
function fixture(source: string) {
  const directory = mkdtempSync(join(tmpdir(), "orzi-experiment-test-"));
  temporary.push(directory);
  writeFileSync(join(directory, "starter.ts"), source);
  return directory;
}
afterEach(() => temporary.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true })));

describe("real experiment execution", () => {
  it("compiles current student code, captures logs, and loads an edited version in a fresh process", async () => {
    const directory = fixture('export function solve(value: number) { console.log("input", value); return value * 2; }');
    const definition = { kind: "function", title: "solve", description: "", exportName: "solve", example: [] } as const;
    const firstVersion = experimentSourceVersion(directory);
    const first = await compileExperiment(directory, { ...definition, example: [] });
    expect(await runFunctionBundle(first.outputFiles?.[0]?.text ?? "", "solve", [3])).toEqual({ value: "6", logs: ["log: input 3"] });
    writeFileSync(join(directory, "starter.ts"), 'export function solve() { return undefined; }');
    expect(experimentSourceVersion(directory)).not.toBe(firstVersion);
    const second = await compileExperiment(directory, { ...definition, example: [] });
    expect(await runFunctionBundle(second.outputFiles?.[0]?.text ?? "", "solve", [])).toEqual({ value: "undefined", logs: [] });
  });
  it("reports thrown errors and denies access to files outside the execution directory", async () => {
    await expect(runFunctionBundle('exports.solve = () => { throw new Error("test failure") }', "solve", [])).rejects.toThrow("test failure");
    await expect(runFunctionBundle('exports.solve = () => require("node:fs").readFileSync("/etc/hosts", "utf8")', "solve", [])).rejects.toThrow(/restricted|denied/i);
  });
  it("terminates a runaway process and supports cancellation", async () => {
    await expect(runFunctionBundle('exports.solve = () => { while(true) {} }', "solve", [])).rejects.toThrow("5 sekund");
    const controller = new AbortController();
    const promise = runFunctionBundle('exports.solve = () => { while(true) {} }', "solve", [], controller.signal);
    controller.abort();
    await expect(promise).rejects.toThrow("Anulowano");
  }, 10000);
  it("does not bundle reference solutions or tests into a preview", async () => {
    const directory = fixture('export { solve } from "./_solution"');
    writeFileSync(join(directory, "_solution.ts"), 'export const solve = () => "secret"');
    await expect(compileExperiment(directory, { kind: "function", title: "", description: "", exportName: "solve", example: [] })).rejects.toThrow(/wzorcowego/);
  });
  it("keeps progress unchanged and rejects unsupported tasks and cross-origin execution", async () => {
    const before = readFileSync("progress.json");
    const response = GET(new NextRequest("http://localhost/api/experiment?id=ts/02-unions-narrowing/medium"));
    expect(await response.json()).toMatchObject({ definition: { kind: "function" } });
    expect(await GET(new NextRequest("http://localhost/api/experiment?id=unknown")).json()).toBeNull();
    const crossOrigin = await POST(new NextRequest("http://localhost/api/experiment", { method: "POST", headers: { origin: "https://other.example" }, body: JSON.stringify({ taskId: "ts/02-unions-narrowing/medium", input: [[]] }) }));
    expect(crossOrigin.status).toBe(403);
    const unsupported = await POST(new NextRequest("http://localhost/api/experiment", { method: "POST", body: JSON.stringify({ taskId: "../progress.json", input: [] }) }));
    expect(unsupported.status).toBe(400);
    expect(readFileSync("progress.json")).toEqual(before);
  });
  it("runs the TypeScript pilot without recording progress", async () => {
    const before = readFileSync("progress.json");
    const experiment = experimentForTask("ts/02-unions-narrowing/medium");
    if (experiment?.definition.kind !== "function") throw new Error("expected function experiment");
    const result = await runExperiment("ts/02-unions-narrowing/medium", experiment.definition.example);
    expect(result).toMatchObject({ kind: "value", value: "1" });
    expect(readFileSync("progress.json")).toEqual(before);
  });
  it("builds a React preview that keeps the same root and can remount on demand", async () => {
    const experiment = experimentForTask("react/06-derived-state-no-effect/easy");
    if (experiment?.definition.kind !== "component") throw new Error("expected component experiment");
    const compiled = await compileExperiment("tracks/react/06-derived-state-no-effect/easy", experiment.definition);
    const code = compiled.outputFiles?.[0]?.text ?? "";
    expect(code).toMatch(/createRoot/);
    expect(code).toMatch(/if \(e\.data\.remount\) key\+\+/);
    expect(code).toMatch(/createElement\(OrderSummary, props\)/);
    expect(code).not.toMatch(/_solution/);
  });
  it("infers a function, component or types adapter for single-file tasks without a catalog entry", () => {
    expect(experimentForTask("js/01-functions/easy")?.definition).toMatchObject({ kind: "function", exportName: "min" });
    expect(experimentForTask("react/01-components-props-purity/easy")?.definition).toMatchObject({ kind: "component", exportName: "ProfileCard" });
    expect(experimentForTask("ts/18-type-challenges/easy")?.definition).toMatchObject({ kind: "types" });
    expect(experimentForTask("react/19-custom-hooks/easy")?.definition).toMatchObject({ kind: "component", exportName: "DebouncedLabel" });
    expect(experimentForTask("react/module-01/module")).toBeNull();
  });
});
