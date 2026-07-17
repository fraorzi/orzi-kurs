export async function solve<T>(next: () => Promise<T>, emit: (value: T) => Promise<void>): Promise<T> {
  const result = await next();
  await emit(result);
  return result;
}

