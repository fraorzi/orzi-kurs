export const SIZES = ["sm", "md", "lg"] as const;
export const TONES = ["primary", "danger"] as const;

// TODO: "gap" → "--gap"
export type CssVar<Name extends string> = string;

// TODO: "click" → "onClick" (przyda się Capitalize)
export type HandlerName<Event extends string> = string;

// TODO: "port" → "APP_PORT" (prefiks app_ + Uppercase)
export type EnvKey<Name extends string> = string;

// TODO: unia wartości SIZES — "sm" | "md" | "lg"
export type Size = string;

// TODO: unia wartości TONES — "primary" | "danger"
export type Tone = string;

// TODO: wszystkie kombinacje `${Size}-${Tone}` — 6 członów
export type Variant = string;

export function cssVar<Name extends string>(name: Name): CssVar<Name> {
  // TODO: "--" + name; typ wyniku to CssVar<Name>, więc potrzebna asercja
  return name;
}

export function handlerName<Event extends string>(event: Event): HandlerName<Event> {
  // TODO: "on" + zdarzenie z wielkiej litery
  return event;
}

export function envKey<Name extends string>(name: Name): EnvKey<Name> {
  // TODO: "app_" + name, całość wielkimi literami
  return name;
}

export function isVariant(value: string): value is Variant {
  // TODO: dokładnie dwa człony, rozmiar z SIZES, ton z TONES
  return false;
}
