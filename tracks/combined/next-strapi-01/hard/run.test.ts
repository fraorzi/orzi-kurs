import { describe, expect, it } from "vitest";
import { updateArticle } from "./starter";
const ID = "a1b2c3d4e5f6g7h8i9j0klmn";
describe("Next + Strapi CRUD", () => { it("sprawdza ownership i rewaliduje po zapisie", async () => { const events: string[] = []; await updateArticle({ owner: async () => "u1", update: async () => { events.push("update"); }, revalidate: (tag) => { events.push(tag); } }, "u1", ID, " Tytuł "); expect(events).toEqual(["update", "article:" + ID, "articles"]); }); it("nie zapisuje cudzego dokumentu", async () => { let writes = 0; await expect(updateArticle({ owner: async () => "u2", update: async () => { writes += 1; }, revalidate: () => {} }, "u1", ID, "Tytuł")).rejects.toThrow(/Not found/); expect(writes).toBe(0); }); });

