export type ServiceConfig = {
  apiUrl: string;
  port: number;
  logLevel: "debug" | "info" | "error";
};

export type ConfigResult =
  | { ok: true; config: ServiceConfig }
  | { ok: false; errors: string[] };

export function loadServiceConfig(
  env: Readonly<Record<string, string | undefined>>,
): ConfigResult {
  // TODO
  return {
    ok: true,
    config: {
      apiUrl: env.API_URL,
      port: Number(env.PORT),
      logLevel: env.LOG_LEVEL,
    } as ServiceConfig,
  };
}
