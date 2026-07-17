export { loadPlugin } from "./registry.js";

import { loadPlugin } from "./registry.js";

export async function runPlugin(name, value) {
  const plugin = await loadPlugin(name);
  return plugin.default(value);
}
