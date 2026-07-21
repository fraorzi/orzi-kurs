export async function solve(setup: () => Promise<void>, run: () => Promise<void>, cleanup: () => Promise<void>): Promise<void> {
  await setup();
  let failure: unknown;
  try {
    await run();
  } catch (error) {
    failure = error;
  }
  try {
    await cleanup();
  } catch (error) {
    if (failure === undefined) failure = error;
  }
  if (failure !== undefined) throw failure;
}

