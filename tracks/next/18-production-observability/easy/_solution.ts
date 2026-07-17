export interface ServerEnv {
  readonly databaseUrl: string;
  readonly sessionSecret: string;
  readonly otelServiceName: string;
}

export function readServerEnv(env: Record<string, string | undefined>): ServerEnv {
  const invalid: string[] = [];
  if (!env.DATABASE_URL?.match(/^postgres(?:ql)?:\/\//)) invalid.push("DATABASE_URL");
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) invalid.push("SESSION_SECRET");
  if (!env.OTEL_SERVICE_NAME?.trim()) invalid.push("OTEL_SERVICE_NAME");
  if (env.NEXT_PUBLIC_SESSION_SECRET !== undefined) invalid.push("NEXT_PUBLIC_SESSION_SECRET");
  if (env.NEXT_PUBLIC_DATABASE_URL !== undefined) invalid.push("NEXT_PUBLIC_DATABASE_URL");
  if (invalid.length > 0) {
    throw new Error(`Invalid server environment: ${invalid.join(", ")}`);
  }
  return Object.freeze({
    databaseUrl: env.DATABASE_URL!,
    sessionSecret: env.SESSION_SECRET!,
    otelServiceName: env.OTEL_SERVICE_NAME!.trim(),
  });
}
