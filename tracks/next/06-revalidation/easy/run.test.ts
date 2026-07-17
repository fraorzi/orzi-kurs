import { describe, expect, it } from "vitest";
import { planInvalidation, type InvalidationIntent } from "./starter";

describe("planInvalidation", () => {
  it.each<{
    intent: InvalidationIntent;
    expected: ReturnType<typeof planInvalidation>;
  }>([
    {
      intent: {
        origin: "server-action",
        freshness: "immediate",
        target: { kind: "tag", value: "products" },
      },
      expected: { api: "updateTag", args: ["products"] },
    },
    {
      intent: {
        origin: "route-handler",
        freshness: "immediate",
        target: { kind: "tag", value: "products" },
      },
      expected: { api: "revalidateTag", args: ["products", { expire: 0 }] },
    },
    {
      intent: {
        origin: "route-handler",
        freshness: "background",
        target: { kind: "tag", value: "articles" },
      },
      expected: { api: "revalidateTag", args: ["articles", "max"] },
    },
    {
      intent: {
        origin: "server-action",
        freshness: "immediate",
        target: { kind: "path", value: "/products/keyboard" },
      },
      expected: { api: "revalidatePath", args: ["/products/keyboard"] },
    },
    {
      intent: {
        origin: "route-handler",
        freshness: "background",
        target: { kind: "path", value: "/products/[slug]", pathType: "page" },
      },
      expected: { api: "revalidatePath", args: ["/products/[slug]", "page"] },
    },
  ])("planuje $expected.api", ({ intent, expected }) => {
    expect(planInvalidation(intent)).toEqual(expected);
  });

  it("odrzuca dynamiczny path bez typu segmentu", () => {
    expect(() => planInvalidation({
      origin: "route-handler",
      freshness: "background",
      target: { kind: "path", value: "/products/[slug]" },
    })).toThrow(/pathType/);
  });
});
