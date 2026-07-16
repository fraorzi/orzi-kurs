import { createItem } from "./item-store";

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204 });
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json() as { name: string };
  const item = await createItem(body.name);
  return Response.json(item);
}
