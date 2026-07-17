export type RuntimeConfig = {
  apiUrl: string;
  port: number;
  mode: "development" | "production";
};

export function assertRuntimeConfig(
  value: unknown,
): asserts value is RuntimeConfig {
  // TODO: sprawdź cały kontrakt i rzuć TypeError z nazwą pola
}

export function loadRuntimeConfig(value: unknown): RuntimeConfig {
  // TODO: użyj assertion function, potem usuń końcowe ukośniki z apiUrl
  throw new Error("TODO");
}
