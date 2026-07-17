export function solve(argv: readonly string[]): {
  port: number;
  host: string;
  json: boolean;
} {
  let port = 3000;
  let host = "127.0.0.1";
  let json = false;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--json") json = true;
    else if (arg === "--port") port = Number(argv[++index]);
    else if (arg?.startsWith("--host=")) host = arg.slice(7);
    else throw new Error(`Nieznany argument: ${arg}`);
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("Nieprawidłowy port");
  return { port, host, json };
}
