export function solve(): { method: "PUT"; path: string; handler: string; config: { auth: true; policies: string[] } } {
  return { method: "PUT", path: "/articles/:documentId/publish", handler: "article.publish", config: { auth: true, policies: ["api::article.can-publish"] } };
}

