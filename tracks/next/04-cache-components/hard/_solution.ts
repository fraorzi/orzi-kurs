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
  const result: RenderAudit = { staticShell: [], dynamicHoles: [], blockers: [] };

  for (const node of nodes) {
    const isDynamic =
      node.source === "runtime" ||
      (node.source === "cached" && node.cacheProfile === "seconds");

    if (!isDynamic) {
      result.staticShell.push(node.name);
    } else if (node.insideSuspense) {
      result.dynamicHoles.push(node.name);
    } else {
      result.blockers.push(node.name);
    }
  }

  return result;
}
