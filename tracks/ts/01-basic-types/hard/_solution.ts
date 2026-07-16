export const CONFIG = {
  api: {
    baseUrl: "https://api.example.com",
    timeoutMs: 5000,
    retries: 3,
  },
  features: ["search", "export", "darkMode"],
} as const;

export type Config = typeof CONFIG;
export type FeatureFlag = Config["features"][number];
export type ApiConfig = Config["api"];

export function hasFeature(flag: FeatureFlag): boolean {
  return CONFIG.features.includes(flag);
}

export function describeApi(api: ApiConfig): string {
  return `${api.baseUrl} (timeout ${api.timeoutMs}ms, ${api.retries} próby)`;
}

export function withTimeout(
  api: ApiConfig,
  timeoutMs: number,
): { baseUrl: string; timeoutMs: number; retries: number } {
  return { ...api, timeoutMs };
}
