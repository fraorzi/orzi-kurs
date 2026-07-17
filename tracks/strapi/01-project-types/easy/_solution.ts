export function solve(uid: string): [string, string] {
  const match = /^api::([a-z][a-z0-9-]*)\.([a-z][a-z0-9-]*)$/.exec(uid);
  if (!match) throw new Error("Nieprawidłowy UID content type");
  return [match[1], match[2]];
}

