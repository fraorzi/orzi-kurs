export const SIZES = ["sm", "md", "lg"] as const;
export const TONES = ["primary", "danger"] as const;

export type CssVar<Name extends string> = `--${Name}`;

export type HandlerName<Event extends string> = `on${Capitalize<Event>}`;

export type EnvKey<Name extends string> = Uppercase<`app_${Name}`>;

export type Size = (typeof SIZES)[number];

export type Tone = (typeof TONES)[number];

export type Variant = `${Size}-${Tone}`;

export function cssVar<Name extends string>(name: Name): CssVar<Name> {
  return `--${name}`;
}

export function handlerName<Event extends string>(
  event: Event,
): HandlerName<Event> {
  const capitalized = `${event.charAt(0).toUpperCase()}${event.slice(1)}`;
  return `on${capitalized as Capitalize<Event>}`;
}

export function envKey<Name extends string>(name: Name): EnvKey<Name> {
  return `app_${name}`.toUpperCase() as EnvKey<Name>;
}

export function isVariant(value: string): value is Variant {
  const parts = value.split("-");
  if (parts.length !== 2) return false;
  const [size, tone] = parts;
  return (
    (SIZES as readonly string[]).includes(size) &&
    (TONES as readonly string[]).includes(tone)
  );
}
