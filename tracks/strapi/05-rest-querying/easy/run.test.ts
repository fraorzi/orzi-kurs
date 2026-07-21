import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

describe("odczyt płaskiej odpowiedzi REST v5", () => {
  it("czyta title wprost z elementu data, bez warstwy attributes", () => {
    expect(solve({ data: [{ documentId: "doc", title: "Nowy kontrakt" }] })).toEqual([
      "Nowy kontrakt",
    ]);
  });

  it("zachowuje kolejność wielu wpisów", () => {
    expect(
      solve({
        data: [
          { documentId: "a", title: "Pierwszy" },
          { documentId: "b", title: "Drugi" },
        ],
      }),
    ).toEqual(["Pierwszy", "Drugi"]);
  });

  it("zwraca pustą listę dla pustej odpowiedzi", () => {
    expect(solve({ data: [] })).toEqual([]);
  });

  it("czyta prawdziwą odpowiedź JSON z serwera HTTP w kształcie v5", async () => {
    await withStrapiHttp(
      async () =>
        Response.json({
          data: [
            { documentId: "doc-1", title: "Artykuł HTTP" },
            { documentId: "doc-2", title: "Drugi artykuł" },
          ],
        }),
      async ({ request }) => {
        const response = await request("/api/articles");
        const body = (await response.json()) as Parameters<typeof solve>[0];
        expect(solve(body)).toEqual(["Artykuł HTTP", "Drugi artykuł"]);
      },
    );
  });
});
