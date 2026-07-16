export type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
};

function capitalize(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function keysOf<T extends object>(obj: T): (keyof T & string)[] {
  return Object.keys(obj) as (keyof T & string)[];
}

export function makeGetters<T extends object>(source: T): Getters<T> {
  const out: Record<string, () => unknown> = {};
  for (const key of keysOf(source)) {
    out[`get${capitalize(key)}`] = () => source[key];
  }
  return out as Getters<T>;
}

export type ChangeHandlers<T> = {
  [K in keyof T & string as `on${Capitalize<K>}Change`]: (value: T[K]) => void;
};

export function makeChangeHandlers<T extends object>(
  state: T,
  onChange: (next: T) => void,
): ChangeHandlers<T> {
  const out: Record<string, (value: never) => void> = {};
  for (const key of keysOf(state)) {
    out[`on${capitalize(key)}Change`] = (value: T[typeof key]) => {
      const next: T = { ...state };
      next[key] = value;
      onChange(next);
    };
  }
  return out as ChangeHandlers<T>;
}

export type WithoutInternal<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

export function stripInternal<T extends object>(obj: T): WithoutInternal<T> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!key.startsWith("_")) {
      out[key] = value;
    }
  }
  return out as WithoutInternal<T>;
}
