export type MyExclude<T, U> = T extends U ? never : T;

export type MyExtract<T, U> = T extends U ? T : never;

export type MyNonNullable<T> = T extends null | undefined ? never : T;

export type ElementType<T> = T extends readonly (infer E)[] ? E : never;

export function compact<T>(items: readonly T[]): MyNonNullable<T>[] {
  const out: MyNonNullable<T>[] = [];
  for (const item of items) {
    if (item !== null && item !== undefined) {
      out.push(item as MyNonNullable<T>);
    }
  }
  return out;
}
