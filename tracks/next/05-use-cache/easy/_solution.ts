import { cacheLife } from "next/cache";

export interface CatalogItem {
  readonly id: string;
  readonly name: string;
}

async function readCatalogFromDatabase(): Promise<readonly CatalogItem[]> {
  return [{ id: "p-1", name: "Klawiatura" }];
}

export async function getCatalog(): Promise<readonly CatalogItem[]> {
  "use cache";
  cacheLife("hours");
  return readCatalogFromDatabase();
}
