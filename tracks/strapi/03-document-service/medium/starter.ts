export interface Documents { update(input: object): Promise<void>; publish(input: object): Promise<void> }
export async function solve(service: Documents, documentId: string, locale: string, data: object): Promise<void> {
  await service.publish({ documentId, locale });
}

