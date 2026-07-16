export interface RenderNode {
  readonly name: string;
  readonly source: "deterministic" | "cached" | "runtime";
  readonly async: boolean;
  readonly cacheProfile?: "seconds" | "minutes" | "hours" | "days" | "max";
  readonly insideSuspense: boolean;
}

export interface RenderAudit {
  readonly staticShell: string[];
  readonly dynamicHoles: string[];
  readonly blockers: string[];
}

export function auditRendering(nodes: readonly RenderNode[]): RenderAudit {
  return {
    staticShell: nodes.filter((node) => !node.async).map((node) => node.name),
    dynamicHoles: nodes.filter((node) => node.async).map((node) => node.name),
    blockers: [],
  };
}
