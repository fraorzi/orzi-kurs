export interface Entry {
  id: number;
  tags: string[];
}

// TODO: zastąp `unknown` typem wyniku — mapa: tag → liczba wystąpień.
export type TagCounts = unknown;

export function tagCounts(entries: Entry[]): TagCounts {
  // TODO: policz wystąpienia każdego tagu, nie mutując `entries`.
  throw new Error("not implemented");
}
