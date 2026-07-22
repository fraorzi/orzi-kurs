export const SIZES = ["sm", "md", "lg"] as const;
export const TONES = ["primary", "danger"] as const;

// TODO
export type CssVar<Name extends string> = string;

// TODO
export type HandlerName<Event extends string> = string;

// TODO
export type EnvKey<Name extends string> = string;

// TODO
export type Size = string;

// TODO
export type Tone = string;

// TODO
export type Variant = string;

export function cssVar<Name extends string>(name: Name): CssVar<Name> {
  // TODO
  return name;
}

export function handlerName<Event extends string>(event: Event): HandlerName<Event> {
  // TODO
  return event;
}

export function envKey<Name extends string>(name: Name): EnvKey<Name> {
  // TODO
  return name;
}

export function isVariant(value: string): value is Variant {
  // TODO
  return false;
}
