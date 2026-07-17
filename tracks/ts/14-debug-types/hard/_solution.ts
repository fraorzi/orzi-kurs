export type ServiceConfig = {
  apiUrl: string;
  port: number;
  logLevel: "debug" | "info" | "error";
};

export type ConfigResult =
  | { ok: true; config: ServiceConfig }
  | { ok: false; errors: string[] };

function isLogLevel(
  value: string | undefined,
): value is ServiceConfig["logLevel"] {
  return value === "debug" || value === "info" || value === "error";
}

export function loadServiceConfig(
  env: Readonly<Record<string, string | undefined>>,
): ConfigResult {
  const errors: string[] = [];
  const apiUrl = env["API_URL"];
  const portText = env["PORT"];
  const port = Number(portText);
  const logLevel = env["LOG_LEVEL"] ?? "info";

  if (apiUrl === undefined || apiUrl.length === 0) {
    errors.push("API_URL is required");
  }
  if (
    portText === undefined ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535
  ) {
    errors.push("PORT must be an integer from 1 to 65535");
  }
  if (!isLogLevel(logLevel)) {
    errors.push("LOG_LEVEL must be debug, info or error");
  }
  if (errors.length > 0) return { ok: false, errors };

  if (apiUrl === undefined || !isLogLevel(logLevel)) {
    throw new Error("unreachable");
  }
  return { ok: true, config: { apiUrl, port, logLevel } };
}
