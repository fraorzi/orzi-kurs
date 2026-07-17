import { describe, expect, it } from "vitest"; import { decision, handleWebhook, type Dependencies } from "./src";
function deps(calls: string[], fail = false): Dependencies { return { fetchMany: async (ids) => { calls.push("fetch:" + ids.join(",")); return Object.fromEntries(ids.map((id) => [id, id.toUpperCase()])); }, apply: async (values) => { calls.push("apply:" + values.join(",")); if (fail) throw new Error("apply"); }, log: (event) => { calls.push("log:" + JSON.stringify(event)); } }; }
describe("maintenance capstone", () => {
  it("batchuje, zachowuje kolejność i redaguje sekret", async () => { const calls: string[] = []; const seen = new Set<string>(); expect(await handleWebhook({ id: "e1", secret: "top-secret", documentIds: ["a", "b", "a"] }, seen, deps(calls))).toBe(true); expect(calls[0]).toBe("fetch:a,b"); expect(calls[1]).toBe("apply:A,B,A"); expect(calls.join(" ")).not.toContain("top-secret"); expect(seen.has("e1")).toBe(true); });
  it("nie gubi retry po błędzie", async () => { const seen = new Set<string>(); await expect(handleWebhook({ id: "e1", secret: "x", documentIds: ["a"] }, seen, deps([], true))).rejects.toThrow("apply"); expect(seen.has("e1")).toBe(false); await expect(handleWebhook({ id: "e1", secret: "x", documentIds: ["a"] }, seen, deps([]))).resolves.toBe(true); });
  it("dokumentuje diagnozę i rollout", () => { expect(decision.rootCause.length).toBeGreaterThan(30); expect(decision.regressionTest).toMatch(/retry/i); expect(decision.rolloutMetric).toMatch(/webhook/); expect(decision.rollbackWhen.length).toBeGreaterThan(20); });
});

