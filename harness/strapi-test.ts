import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

export interface StrapiHttpHarness {
  baseUrl: string;
  request(path: string, init?: RequestInit): Promise<Response>;
}

export async function withStrapiHttp(
  handler: (request: Request) => Promise<Response>,
  run: (harness: StrapiHttpHarness) => Promise<void>,
): Promise<void> {
  const server = createServer(async (incoming, outgoing) => {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of incoming) chunks.push(Buffer.from(chunk));
      const address = server.address() as AddressInfo;
      const body = Buffer.concat(chunks);
      const request = new Request(
        `http://127.0.0.1:${address.port}${incoming.url ?? "/"}`,
        {
          method: incoming.method,
          headers: incoming.headers as HeadersInit,
          ...(body.length > 0 ? { body } : {}),
        },
      );
      const response = await handler(request);
      outgoing.statusCode = response.status;
      response.headers.forEach((value, name) => outgoing.setHeader(name, value));
      outgoing.end(Buffer.from(await response.arrayBuffer()));
    } catch {
      outgoing.statusCode = 500;
      outgoing.end(JSON.stringify({ error: "HTTP_HARNESS_ERROR" }));
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    await run({
      baseUrl,
      request: (path, init) => fetch(`${baseUrl}${path}`, init),
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}
