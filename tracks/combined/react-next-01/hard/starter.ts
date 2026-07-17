export interface RecordRow { id: string; title: string; status: "draft" | "published"; secret: string; createdAt: Date }
export async function loadWidget(fetchRows: () => Promise<RecordRow[]>): Promise<object[]> { return fetchRows(); }

