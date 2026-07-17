export async function solve(
  count: number,
  budget: number,
): Promise<{
  completed: number;
  yields: number;
}> {
  if (budget < 1) throw new Error("budget");
  const { setImmediate } = await import("node:timers/promises");
  let completed = 0;
  let yields = 0;
  while (completed < count) {
    const end = Math.min(count, completed + budget);
    while (completed < end) {
      await Promise.resolve();
      completed++;
    }
    if (completed < count) {
      yields++;
      await setImmediate();
    }
  }
  return { completed, yields };
}
