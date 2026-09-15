import fs from "node:fs";
import { createRequire } from "node:module";
import { inspect } from "node:util";
const load = createRequire(import.meta.url);
const logs = [];
let logSize = 0;
for (const name of ["log", "info", "warn", "error", "debug", "table"]) {
  console[name] = (...values) => {
    if (logs.length >= 100 || logSize >= 16000) return;
    const line = values.map((value) => typeof value === "string" ? value : inspect(value, { depth: 4, maxArrayLength: 30, maxStringLength: 2000 })).join(" ").slice(0, 2000);
    logs.push(`${name}: ${line}`);
    logSize += line.length;
  };
}
(async () => {
  try {
    const task = load(process.argv[2]);
    const args = JSON.parse(fs.readFileSync(0, "utf8"));
    const result = await task[process.argv[3]](...args);
    fs.writeSync(3, JSON.stringify({ ok: true, value: inspect(result, { depth: 8, maxArrayLength: 200, maxStringLength: 12000, breakLength: 80 }).slice(0, 32000), logs }));
  } catch (error) {
    fs.writeSync(3, JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error), logs }));
  }
  process.exit(0);
})();
