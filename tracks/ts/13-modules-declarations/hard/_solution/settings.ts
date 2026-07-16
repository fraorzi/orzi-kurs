import { createStore } from "./legacy-store.js";

export type SettingsState = {
  theme: "light" | "dark";
  pageSize: number;
  analytics: boolean;
};

export function createSettings(initial: SettingsState) {
  return createStore(initial);
}
