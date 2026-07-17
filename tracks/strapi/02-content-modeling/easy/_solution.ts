export interface Relation { relation: string; bidirectional: boolean; mappedBy?: string; inversedBy?: string }
const SUPPORTED = new Set(["oneToOne", "oneToMany", "manyToOne", "manyToMany"]);
export function solve(relation: Relation): boolean {
  if (!SUPPORTED.has(relation.relation)) return false;
  return !relation.bidirectional || Boolean(relation.mappedBy || relation.inversedBy);
}

