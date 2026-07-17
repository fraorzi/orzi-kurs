export interface Attribute { private?: boolean; type: string }
export function solve(attributes: Record<string, Attribute>): string[] {
  return Object.keys(attributes);
}

