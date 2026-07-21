export interface Hook { documentId: string; operationId: string }
export function solve(hooks: Hook[]): string[] {
  const byOperation = new Map<string, string>();
  for (const hook of hooks) byOperation.set(`${hook.operationId}:${hook.documentId}`, hook.documentId);
  return [...byOperation.values()];
}

