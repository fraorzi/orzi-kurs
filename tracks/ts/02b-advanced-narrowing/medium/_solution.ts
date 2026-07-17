export type RuntimeConfig = {
  apiUrl: string;
  port: number;
  mode: "development" | "production";
};

export function assertRuntimeConfig(
  value: unknown,
): asserts value is RuntimeConfig {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("config");
  }

  if (!("apiUrl" in value) || typeof value.apiUrl !== "string" || value.apiUrl.length === 0) {
    throw new TypeError("apiUrl");
  }
  if (
    !("port" in value) ||
    typeof value.port !== "number" ||
    !Number.isInteger(value.port) ||
    value.port < 1 ||
    value.port > 65_535
  ) {
    throw new TypeError("port");
  }
  if (
    !("mode" in value) ||
    (value.mode !== "development" && value.mode !== "production")
  ) {
    throw new TypeError("mode");
  }
}

export function loadRuntimeConfig(value: unknown): RuntimeConfig {
  assertRuntimeConfig(value);
  let apiUrl = value.apiUrl;
  while (apiUrl.endsWith("/")) apiUrl = apiUrl.slice(0, -1);
  return { ...value, apiUrl };
}
