import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

describe("Izoluj stan testu integracyjnego", () => {
  it("wykonuje setup, run i cleanup w tej kolejności", async () => {
    const events: string[] = [];
    await solve(
      async () => {
        events.push("setup");
      },
      async () => {
        events.push("run");
      },
      async () => {
        events.push("cleanup");
      },
    );
    expect(events).toEqual(["setup", "run", "cleanup"]);
  });

  it("cleanup wykonuje się nawet, gdy run rzuci, a błąd run leci dalej", async () => {
    const events: string[] = [];
    await expect(
      solve(
        async () => {
          events.push("setup");
        },
        async () => {
          events.push("run");
          throw new Error("asercja nieudana");
        },
        async () => {
          events.push("cleanup");
        },
      ),
    ).rejects.toThrow("asercja nieudana");
    expect(events).toEqual(["setup", "run", "cleanup"]);
  });

  it("gdy run i cleanup oba rzucają, propaguje się błąd run, nie cleanup", async () => {
    await expect(
      solve(
        async () => undefined,
        async () => {
          throw new Error("błąd testu");
        },
        async () => {
          throw new Error("błąd sprzątania");
        },
      ),
    ).rejects.toThrow("błąd testu");
  });

  it("gdy setup rzuci, run i cleanup w ogóle się nie wykonują", async () => {
    const events: string[] = [];
    await expect(
      solve(
        async () => {
          throw new Error("setup nieudany");
        },
        async () => {
          events.push("run");
        },
        async () => {
          events.push("cleanup");
        },
      ),
    ).rejects.toThrow("setup nieudany");
    expect(events).toEqual([]);
  });

  it("izoluje stan magazynu między dwoma przebiegami przez realny serwer HTTP", async () => {
    const store = new Map<string, { title: string }>();
    const handler = async (request: Request): Promise<Response> => {
      const documentId = new URL(request.url).pathname.split("/").pop() ?? "";
      const document = store.get(documentId);
      return document
        ? Response.json({ data: document })
        : Response.json({ error: { status: 404 } }, { status: 404 });
    };

    await solve(
      async () => {
        store.set("doc-1", { title: "Tymczasowy" });
      },
      async () => {
        await withStrapiHttp(handler, async ({ request }) => {
          const response = await request("/api/articles/doc-1");
          expect(response.status).toBe(200);
        });
      },
      async () => {
        store.clear();
      },
    );

    await withStrapiHttp(handler, async ({ request }) => {
      const response = await request("/api/articles/doc-1");
      expect(response.status).toBe(404);
    });
  });
});
