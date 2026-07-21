export interface Deps { service(id: string, userId: string): Promise<object>; sanitize(value: object): Promise<object> }
export async function solve(deps: Deps, ctx: { params: { documentId: string }; state: { user: { id: string } }; body?: object }): Promise<void> {
  const result = await deps.service(ctx.params.documentId, ctx.state.user.id);
  ctx.body = await deps.sanitize(result);
}

