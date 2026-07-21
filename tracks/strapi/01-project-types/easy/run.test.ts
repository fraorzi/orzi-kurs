import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("rozpoznawanie UID content type", () => {
  it("rozbija UID przestrzeni api na collection i contentType", () => {
    expect(solve("api::article.article")).toEqual(["article", "article"]);
  });

  it("obsługuje kebab-case w obu segmentach", () => {
    expect(solve("api::blog-post.blog-post")).toEqual(["blog-post", "blog-post"]);
  });

  it("odrzuca UID spoza przestrzeni api", () => {
    expect(() => solve("plugin::users-permissions.user")).toThrow(/UID/);
    expect(() => solve("admin::permission")).toThrow(/UID/);
  });

  it("odrzuca UID o złej strukturze", () => {
    expect(() => solve("api::Article.article")).toThrow(/UID/);
    expect(() => solve("api::article")).toThrow(/UID/);
  });
});
