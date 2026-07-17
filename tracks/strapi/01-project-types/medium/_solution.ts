export interface Attribute { private?: boolean; type: string }
export function solve(attributes: Record<string, Attribute>): string[] {
  return Object.entries(attributes)
    .filter(([, attribute]) => !attribute.private && attribute.type !== "password")
    .map(([name]) => name)
    .sort();
}

