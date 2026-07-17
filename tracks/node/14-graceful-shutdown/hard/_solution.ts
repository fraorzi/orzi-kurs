export async function solve(
  cleanup: Promise<void>,
  timeoutMs: number,
  force: () => void,
): Promise<"clean" | "forced"> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<"forced">((resolve) => {
    timer = setTimeout(() => {
      force();
      resolve("forced");
    }, timeoutMs);
    timer.unref();
  });
  const result = await Promise.race([
    cleanup.then(() => "clean" as const),
    timeout,
  ]);
  if (timer) clearTimeout(timer);
  return result;
}
