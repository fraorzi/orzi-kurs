const ENVIRONMENTS = new Set(["development", "test", "production"]);

export let environment = "development";

export function setEnvironment(next) {
  if (!ENVIRONMENTS.has(next)) {
    throw new TypeError(`Unknown environment: ${next}`);
  }
  environment = next;
}
