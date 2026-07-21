export async function solve<T>(next: () => Promise<T>, emit: (value: T) => Promise<void>): Promise<T> {
  let result: T | undefined;
  try {
    result = await next();
    return result;
  } finally {
    await emit(result as T);
  }
}
