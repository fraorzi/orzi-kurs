export async function solve(setup: () => Promise<void>, run: () => Promise<void>, cleanup: () => Promise<void>): Promise<void> {
  await setup();
  await run();
  await cleanup();
}

