export interface ServerEnv {
  readonly databaseUrl: string;
  readonly sessionSecret: string;
  readonly otelServiceName: string;
}

export function readServerEnv(env: Record<string, string | undefined>): ServerEnv {
  return {
    databaseUrl: env.DATABASE_URL ?? "",
    sessionSecret: env.SESSION_SECRET ?? "",
    otelServiceName: env.OTEL_SERVICE_NAME ?? "",
  };
}
