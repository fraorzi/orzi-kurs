export type RuntimeConfig = {
  apiUrl: string;
  port: number;
  mode: "development" | "production";
};

export function assertRuntimeConfig(
  value: unknown,
): asserts value is RuntimeConfig {
  // TODO
}

export function loadRuntimeConfig(value: unknown): RuntimeConfig {
  // TODO
  throw new Error("TODO");
}
