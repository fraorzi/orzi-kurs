export async function solve(target: string, content: string): Promise<void> {
  const { open, rename, rm } = await import("node:fs/promises");
  const temp = `${target}.${process.pid}.tmp`;
  let handle;
  try {
    handle = await open(temp, "wx");
    await handle.writeFile(content, "utf8");
    await handle.sync();
    await handle.close();
    handle = undefined;
    await rename(temp, target);
  } catch (error) {
    await handle?.close();
    await rm(temp, { force: true });
    throw error;
  }
}
