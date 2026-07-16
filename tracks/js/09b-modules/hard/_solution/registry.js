const LOADERS = {
  uppercase: () => import("./plugins/uppercase.js"),
  slugify: () => import("./plugins/slugify.js"),
};

export function loadPlugin(name) {
  const load = LOADERS[name];
  if (!load) {
    throw new Error(`Unknown plugin: ${name}`);
  }
  return load();
}
