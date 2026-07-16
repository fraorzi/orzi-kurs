export type MyPartial<T> = { [K in keyof T]?: T[K] };

export type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export function toDraft<T extends object>(source: MyReadonly<T>): Mutable<T> {
  return { ...source } as Mutable<T>;
}

export function clearFields<T extends object>(source: T): Nullable<T> {
  const out: Record<string, null> = {};
  for (const key of Object.keys(source)) {
    out[key] = null;
  }
  return out as Nullable<T>;
}
