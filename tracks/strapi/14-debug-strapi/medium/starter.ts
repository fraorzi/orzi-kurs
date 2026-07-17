export interface Hook { documentId: string; operationId: string }
export function solve(hooks: Hook[]): string[] {
  return hooks.map((hook) => hook.documentId);
}

