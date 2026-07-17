import type { Dependencies, Webhook } from "./types";
export async function handleWebhook(event: Webhook, seen: Set<string>, dependencies: Dependencies): Promise<boolean> {
  if (seen.has(event.id)) return false;
  seen.add(event.id);
  const values: string[] = [];
  for (const id of event.documentIds) values.push((await dependencies.fetchMany([id]))[id]);
  dependencies.log(event);
  await dependencies.apply(values);
  return true;
}

