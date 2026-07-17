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

  const iterator = openRows(id)[Symbol.asyncIterator]();
  const encoder = new TextEncoder();
  let headerSent = false;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (!headerSent) {
        headerSent = true;
        controller.enqueue(encoder.encode("id,total\n"));
        return;
      }
      const result = await iterator.next();
      if (result.done) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(`${result.value.id},${result.value.total}\n`));
    },
    async cancel() {
      await iterator.return?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${report.filename.replaceAll('"', "")}"`,
      "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no",
    },
  });
}
