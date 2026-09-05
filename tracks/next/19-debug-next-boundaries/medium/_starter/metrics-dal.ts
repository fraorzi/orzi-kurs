import "server-only";

export async function getMetrics(): Promise<{
  readonly revenue: string;
}> {
  return { revenue: "120 000 zł" };
}
