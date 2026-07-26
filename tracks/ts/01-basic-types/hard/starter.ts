// TODO
export const CONFIG = {
  api: {
    baseUrl: "https://api.example.com",
    timeoutMs: 5000,
    retries: 3,
  },
  features: ["search", "export", "darkMode"],
};

// TODO
export type Config = unknown;
export type FeatureFlag = string;
export type ApiConfig = unknown;

export function hasFeature(flag: FeatureFlag): boolean {
  // TODO
  return false;
}

export function describeApi(api: ApiConfig): string {
  // TODO
  return "";
}

export function withTimeout(
  api: ApiConfig,
  timeoutMs: number,
): { baseUrl: string; timeoutMs: number; retries: number } {
  // TODO
  return { baseUrl: "", timeoutMs: 0, retries: 0 };
}
