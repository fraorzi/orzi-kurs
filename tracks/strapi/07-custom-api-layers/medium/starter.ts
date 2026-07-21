export interface Deps { service(id: string, userId: string): Promise<object>; sanitize(value: object): Promise<object> }
export async function solve(deps: Deps, ctx: { params: { documentId: string }; state: { user: { id: string } }; body?: object }): Promise<void> {
  ctx.body = await deps.service(ctx.params.documentId, ctx.state.user.id);
}

