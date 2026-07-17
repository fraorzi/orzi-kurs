export function runScoped<Resource extends Disposable, Result>(
  acquire: () => Resource,
  work: (resource: Resource) => Result,
): Result {
  const resource = acquire();
  return work(resource);
}
