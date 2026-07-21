import { diffArrays } from "diff";

export type CodeDiffRowKind = "context" | "remove" | "add" | "change";

export interface CodeDiffLine {
  number: number;
  text: string;
  hasLineTerminator: boolean;
}

export type CodeDiffChangeReason =
  | "content"
  | "whitespace"
  | "end-of-file-newline";

export interface CodeDiffRow {
  left: CodeDiffLine | null;
  right: CodeDiffLine | null;
  kind: CodeDiffRowKind;
  changeReason?: CodeDiffChangeReason;
}

export interface CodeDiffResult {
  rows: CodeDiffRow[];
  limited: boolean;
}

export interface CodeDiffOptions {
  maxEditLength?: number;
  timeoutMs?: number;
}

interface ParsedCodeLine {
  text: string;
  hasLineTerminator: boolean;
}

interface DiffChunk {
  value: ParsedCodeLine[];
  added?: boolean;
  removed?: boolean;
}

function parseCodeLines(source: string): ParsedCodeLine[] {
  const normalized = source.replace(/\r\n/g, "\n");
  if (normalized.length === 0) return [];

  const parts = normalized.split("\n");
  const endsWithNewline = normalized.endsWith("\n");
  if (endsWithNewline) parts.pop();

  return parts.map((text, index) => ({
    text,
    hasLineTerminator: endsWithNewline || index < parts.length - 1,
  }));
}

function linesEqual(left: ParsedCodeLine, right: ParsedCodeLine): boolean {
  return left.text === right.text
    && left.hasLineTerminator === right.hasLineTerminator;
}

function numberLine(line: ParsedCodeLine, number: number): CodeDiffLine {
  return { number, ...line };
}

function changeReason(left: CodeDiffLine, right: CodeDiffLine): CodeDiffChangeReason {
  if (left.text === right.text) return "end-of-file-newline";
  if (left.text.trim() === right.text.trim()) {
    return "whitespace";
  }
  return "content";
}

function alignChangedRows(rows: CodeDiffRow[]): CodeDiffRow[] {
  const aligned: CodeDiffRow[] = [];

  for (let index = 0; index < rows.length;) {
    if (rows[index].kind === "context") {
      aligned.push(rows[index]);
      index++;
      continue;
    }

    const removed: CodeDiffLine[] = [];
    const added: CodeDiffLine[] = [];
    while (index < rows.length && rows[index].kind !== "context") {
      const row = rows[index];
      if (row.left) removed.push(row.left);
      if (row.right) added.push(row.right);
      index++;
    }

    for (let lineIndex = 0; lineIndex < Math.max(removed.length, added.length); lineIndex++) {
      const left = removed[lineIndex] ?? null;
      const right = added[lineIndex] ?? null;
      aligned.push({
        left,
        right,
        kind: left && right ? "change" : left ? "remove" : "add",
        ...(left && right ? { changeReason: changeReason(left, right) } : {}),
      });
    }
  }

  return aligned;
}

function rowsFromChunks(chunks: DiffChunk[]): CodeDiffRow[] {
  const rows: CodeDiffRow[] = [];
  let leftNumber = 1;
  let rightNumber = 1;

  for (const chunk of chunks) {
    if (chunk.removed) {
      for (const line of chunk.value) {
        rows.push({
          left: numberLine(line, leftNumber++),
          right: null,
          kind: "remove",
        });
      }
      continue;
    }

    if (chunk.added) {
      for (const line of chunk.value) {
        rows.push({
          left: null,
          right: numberLine(line, rightNumber++),
          kind: "add",
        });
      }
      continue;
    }

    for (const line of chunk.value) {
      rows.push({
        left: numberLine(line, leftNumber++),
        right: numberLine(line, rightNumber++),
        kind: "context",
      });
    }
  }

  return alignChangedRows(rows);
}

function coarseRows(left: ParsedCodeLine[], right: ParsedCodeLine[]): CodeDiffRow[] {
  let prefixLength = 0;
  while (
    prefixLength < left.length
    && prefixLength < right.length
    && linesEqual(left[prefixLength], right[prefixLength])
  ) {
    prefixLength++;
  }

  let suffixLength = 0;
  while (
    suffixLength < left.length - prefixLength
    && suffixLength < right.length - prefixLength
    && linesEqual(
      left[left.length - suffixLength - 1],
      right[right.length - suffixLength - 1],
    )
  ) {
    suffixLength++;
  }

  const rows: CodeDiffRow[] = [];
  for (let index = 0; index < prefixLength; index++) {
    rows.push({
      left: numberLine(left[index], index + 1),
      right: numberLine(right[index], index + 1),
      kind: "context",
    });
  }
  for (let index = prefixLength; index < left.length - suffixLength; index++) {
    rows.push({
      left: numberLine(left[index], index + 1),
      right: null,
      kind: "remove",
    });
  }
  for (let index = prefixLength; index < right.length - suffixLength; index++) {
    rows.push({
      left: null,
      right: numberLine(right[index], index + 1),
      kind: "add",
    });
  }
  for (let offset = suffixLength; offset > 0; offset--) {
    const leftIndex = left.length - offset;
    const rightIndex = right.length - offset;
    rows.push({
      left: numberLine(left[leftIndex], leftIndex + 1),
      right: numberLine(right[rightIndex], rightIndex + 1),
      kind: "context",
    });
  }

  return alignChangedRows(rows);
}

export function buildCodeDiff(
  leftSource: string,
  rightSource: string,
  options: CodeDiffOptions = {},
): CodeDiffResult {
  const left = parseCodeLines(leftSource);
  const right = parseCodeLines(rightSource);
  const chunks = diffArrays(left, right, {
    comparator: linesEqual,
    maxEditLength: options.maxEditLength ?? 10_000,
    timeout: options.timeoutMs ?? 250,
  });

  if (!chunks) {
    return { rows: coarseRows(left, right), limited: true };
  }

  return { rows: rowsFromChunks(chunks), limited: false };
}
