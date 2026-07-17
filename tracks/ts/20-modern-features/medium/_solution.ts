export function runScoped<Resource extends Disposable, Result>(
  acquire: () => Resource,
  work: (resource: Resource) => Result,
): Result {
  using resource = acquire();
  return work(resource);
}
