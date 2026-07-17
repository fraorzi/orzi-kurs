export function solve(job: {
  kind: "network" | "external" | "cpu";
  estimatedMs: number;
}): "async" | "child_process" | "worker" {
  throw new Error("TODO");
}
