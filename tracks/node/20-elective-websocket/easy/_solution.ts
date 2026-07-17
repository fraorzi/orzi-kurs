export function solve(
  rawUrl: string,
  protocols: readonly string[],
  production: boolean,
): { url: URL; protocols: string[] } {
  const url = new URL(rawUrl);
  if (url.protocol !== "ws:" && url.protocol !== "wss:")
    throw new Error("Błędny protokół");
  if (production && url.protocol !== "wss:")
    throw new Error("Produkcja wymaga wss");
  if (url.username || url.password)
    throw new Error("Credentials w URL są zabronione");
  const allowed = new Set(["events.v1", "json.v1"]);
  const selected = [...new Set(protocols)];
  if (selected.some((protocol) => !allowed.has(protocol)))
    throw new Error("Nieznany subprotocol");
  return { url, protocols: selected };
}
