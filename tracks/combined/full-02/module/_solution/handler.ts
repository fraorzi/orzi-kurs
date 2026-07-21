import type { Dependencies, Webhook } from "./types";

export async function handleWebhook(
  event: Webhook,
  seen: Set<string>,
  dependencies: Dependencies,
): Promise<boolean> {
  if (seen.has(event.id)) return false;

  const unique = [...new Set(event.documentIds)];
  const rows = await dependencies.fetchMany(unique);
  await dependencies.apply(event.documentIds.map((id) => rows[id]));

  seen.add(event.id);
  dependencies.log({
    event: "webhook.applied",
    eventId: event.id,
    documents: unique.length,
  });
  return true;
}
