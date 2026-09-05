import { extname, join } from "node:path";
import { format, getFileInfo, resolveConfig } from "prettier";
import { format as formatSql } from "sql-formatter";

interface Comparison {
  starter: string | null;
  solution: string | null;
}

async function formatFile(source: string, filepath: string): Promise<string> {
  if (extname(filepath) === ".sql") {
    return formatSql(source, { language: "mysql", tabWidth: 2, keywordCase: "upper" });
  }
  const { inferredParser } = await getFileInfo(filepath, { resolveConfig: false });
  if (!inferredParser) return source;
  return format(source, {
    ...(await resolveConfig(filepath)),
    filepath,
    // Prettier otherwise preserves an existing line break after an opening brace.
    objectWrap: "collapse",
  });
}

async function formatArtifact(source: string, filepath: string): Promise<string> {
  // Old progress snapshots contain these file separators. Format each file on its own:
  // concatenating TSX, JSON and CSS into one parser can fail or change its meaning.
  const files = [...source.matchAll(/^\/\/ (?:\u2500\u2500|--) (.+) (?:\u2500\u2500|--)\r?\n/gm)];
  if (!files.length || files[0].index !== 0) return formatFile(source, filepath);
  return (
    await Promise.all(
      files.map(async (file, index) => {
        const body = source.slice(file.index + file[0].length, files[index + 1]?.index);
        return `// -- ${file[1]} --\n${await formatFile(body, join(filepath, file[1]))}`;
      }),
    )
  ).join("\n");
}

export async function formatComparison(
  { starter, solution }: Comparison,
  filepath: string,
): Promise<Comparison> {
  try {
    const [formattedStarter, formattedSolution] = await Promise.all([
      starter === null ? null : formatArtifact(starter, filepath),
      solution === null ? null : formatArtifact(solution, filepath),
    ]);
    return { starter: formattedStarter, solution: formattedSolution };
  } catch {
    // Incomplete code must remain readable. Never format only one side of a pair.
    return { starter, solution };
  }
}
