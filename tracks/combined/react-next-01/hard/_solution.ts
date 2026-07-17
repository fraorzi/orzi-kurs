export interface RecordRow { id: string; title: string; status: "draft" | "published"; secret: string; createdAt: Date }
export async function loadWidget(fetchRows: () => Promise<RecordRow[]>): Promise<Array<{ id: string; title: string; createdAt: string }>> {
  return (await fetchRows()).filter((row) => row.status === "published").map(({ id, title, createdAt }) => ({ id, title, createdAt: createdAt.toISOString() }));
}

