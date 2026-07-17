export async function solve(secret: string): Promise<{
  encoded: string;
  verify(candidate: string): Promise<boolean>;
}> {
  const { randomBytes, scrypt, timingSafeEqual } = await import("node:crypto");
  const { promisify } = await import("node:util");
  const derive = promisify(scrypt);
  const salt = randomBytes(16);
  const key = (await derive(secret, salt, 32)) as Buffer;
  const encoded = `${salt.toString("hex")}:${key.toString("hex")}`;
  return {
    encoded,
    async verify(candidate) {
      const candidateKey = (await derive(candidate, salt, 32)) as Buffer;
      return timingSafeEqual(key, candidateKey);
    },
  };
}
