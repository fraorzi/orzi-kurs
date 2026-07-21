import type { Dependencies, Input, Result } from "./types";

export async function publishOffer(dependencies: Dependencies, input: Input): Promise<Result> {
  const existing = await dependencies.findResult(input.idempotencyKey);
  if (existing) return existing;
  const user = await dependencies.currentUser();
  if (!user || user.role !== "seller") throw new Error("Not found");
  if (typeof input.title !== "string" || input.title.trim().length < 3) throw new Error("Invalid title");
  if (!Number.isInteger(input.quantity) || (input.quantity as number) < 1) throw new Error("Invalid quantity");
  const quantity = input.quantity as number;
  await dependencies.reserve(quantity);
  try {
    const documentId = await dependencies.createDraft({ title: input.title.trim(), ownerId: user.id });
    await dependencies.publish(documentId);
    const result: Result = { documentId, status: "published" };
    await dependencies.saveResult(input.idempotencyKey, result);
    dependencies.revalidate("offers");
    dependencies.revalidate("offer:" + documentId);
    dependencies.log({ event: "offer.published", documentId, ownerId: user.id });
    return result;
  } catch (error) {
    await dependencies.release(quantity);
    throw error;
  }
}

