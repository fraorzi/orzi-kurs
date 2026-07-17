export async function* solve(lines: AsyncIterable<string>): AsyncGenerator<{
  line: number;
  value: unknown;
}> {
  let number = 0;
  for await (const raw of lines) {
    number++;
    const line = raw.trim();
    if (!line) continue;
    try {
      yield { line: number, value: JSON.parse(line) };
    } catch {
      throw new Error(`Niepoprawny JSON w linii ${number}`);
    }
  }
}
