export function solve(job: {
  kind: "network" | "external" | "cpu";
  estimatedMs: number;
}): "async" | "child_process" | "worker" {
  if (job.kind === "external") return "child_process";
  if (job.kind === "cpu" && job.estimatedMs >= 20) return "worker";
  return "async";
}
