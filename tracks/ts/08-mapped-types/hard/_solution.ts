export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (Array.isArray(value)) {
    for (const item of value) {
      deepFreeze(item);
    }
    Object.freeze(value);
  } else if (isPlainObject(value)) {
    for (const item of Object.values(value)) {
      deepFreeze(item);
    }
    Object.freeze(value);
  }
  return value as DeepReadonly<T>;
}

function mergeRecords(
  base: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;

    const current = merged[key];
    merged[key] =
      isPlainObject(current) && isPlainObject(value)
        ? mergeRecords(current, value)
        : value;
  }

  return merged;
}

export function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  return mergeRecords(
    base as Record<string, unknown>,
    patch as Record<string, unknown>,
  ) as T;
}
