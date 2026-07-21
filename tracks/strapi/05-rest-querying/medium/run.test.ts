import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

describe("budowanie ograniczonego query REST", () => {
  it("ogranicza fields, ustawia status published i pageSize 20", () => {
    const params = new URLSearchParams(solve("pl", 2));
    expect(params.get("fields[0]")).toBe("title");
    expect(params.get("fields[1]")).toBe("slug");
    expect(params.get("status")).toBe("published");
    expect(params.get("pagination[pageSize]")).toBe("20");
  });

  it("ustawia locale i numer strony żądanej", () => {
    const params = new URLSearchParams(solve("en-US", 3));
    expect(params.get("locale")).toBe("en-US");
    expect(params.get("pagination[page]")).toBe("3");
  });

  it("sortuje po publishedAt malejąco", () => {
    const params = new URLSearchParams(solve("pl", 1));
    expect(params.get("sort[0]")).toBe("publishedAt:desc");
  });

  it("odrzuca stronę mniejszą niż 1 i niecałkowitą", () => {
    expect(() => solve("pl", 0)).toThrow(/stron/i);
    expect(() => solve("pl", 1.5)).toThrow(/stron/i);
  });

  it("przekazuje dokładnie te parametry przez prawdziwe zapytanie HTTP", async () => {
    await withStrapiHttp(
      async (request) => {
        const url = new URL(request.url);
        return Response.json(Object.fromEntries(url.searchParams));
      },
      async ({ request }) => {
        const response = await request(`/api/articles?${solve("pl", 2)}`);
        const echoed = (await response.json()) as Record<string, string>;
        expect(echoed).toEqual({
          "fields[0]": "title",
          "fields[1]": "slug",
          locale: "pl",
          status: "published",
          "sort[0]": "publishedAt:desc",
          "pagination[page]": "2",
          "pagination[pageSize]": "20",
        });
      },
    );
  });
});
