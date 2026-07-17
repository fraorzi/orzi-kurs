export async function solve(secret: string): Promise<{
  encoded: string;
  verify(candidate: string): Promise<boolean>;
}> {
  throw new Error("TODO");
}
