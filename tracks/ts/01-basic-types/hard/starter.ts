// TODO: cały obiekt ma być niemutowalny, a wartości literalne (as const).
export const CONFIG = {
  api: {
    baseUrl: "https://api.example.com",
    timeoutMs: 5000,
    retries: 3,
  },
  features: ["search", "export", "darkMode"],
};

// TODO: typy wyprowadzone z CONFIG — nie przepisuj ich ręcznie.
export type Config = unknown;
export type FeatureFlag = string;
export type ApiConfig = unknown;

export function hasFeature(flag: FeatureFlag): boolean {
  // TODO
  return false;
}

export function describeApi(api: ApiConfig): string {
  // TODO: "https://api.example.com (timeout 5000ms, 3 próby)"
  return "";
}

export function withTimeout(
  api: ApiConfig,
  timeoutMs: number,
): { baseUrl: string; timeoutMs: number; retries: number } {
  // TODO: nowy obiekt, oryginał nietknięty
  return { baseUrl: "", timeoutMs: 0, retries: 0 };
}
