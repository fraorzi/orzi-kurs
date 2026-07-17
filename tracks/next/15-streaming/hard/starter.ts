export interface Report {
  readonly filename: string;
}

export interface ReportRow {
  readonly id: string;
  readonly total: number;
}

export async function streamReport(
  id: string,
  findReport: (id: string) => Promise<Report | null>,
  openRows: (id: string) => AsyncIterable<ReportRow>,
): Promise<Response> {
  const report = await findReport(id);
  if (!report) return new Response("Not found", { status: 404 });

  let csv = "id,total\n";
  for await (const row of openRows(id)) {
    csv += `${row.id},${row.total}\n`;
  }
  return new Response(csv, {
    headers: { "Content-Type": "text/csv" },
  });
}
