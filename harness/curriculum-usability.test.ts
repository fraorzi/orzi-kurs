import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { TRACKS_ROOT } from "./paths";

function files(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.name !== "src" && !entry.name.endsWith(".verify-backup"))
    .flatMap((entry) => {
      const child = join(path, entry.name);
      return entry.isDirectory() ? files(child) : [child];
    });
}

const curriculumFiles = readdirSync(TRACKS_ROOT, { withFileTypes: true })
  .filter((track) => track.isDirectory() && !track.name.startsWith("_"))
  .flatMap((track) => files(join(TRACKS_ROOT, track.name)));

function belongsToProps(node: ts.Node): boolean {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (
      (ts.isInterfaceDeclaration(parent) || ts.isTypeAliasDeclaration(parent)) &&
      parent.name.text.endsWith("Props")
    )
      return true;
    if (ts.isParameter(parent)) {
      const fn = parent.parent;
      return (
        (ts.isFunctionDeclaration(fn) || ts.isFunctionExpression(fn)) &&
        /^[A-Z]/.test(fn.name?.text ?? "")
      );
    }
  }
  return false;
}

describe("curriculum usability", () => {
  it("states the exercise mode and does not assign ARIA implementation", () => {
    for (const file of curriculumFiles.filter((path) => path.endsWith("/task.md"))) {
      const source = readFileSync(file, "utf8");
      expect(source, file).toMatch(
        /^Tryb: (od zera|uzupełnienie|naprawa|optymalizacja|projekt)\./m,
      );
      expect(source, file).not.toMatch(/\baria-[a-z]+|\bWAI-ARIA\b|role ARIA/);
    }
  });

  it("keeps executable behavior assertions in every exercise test", () => {
    for (const file of curriculumFiles.filter((path) => /\/run\.test\.[jt]sx?$/.test(path))) {
      const source = ts.createSourceFile(
        file,
        readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      let hasTest = false;
      let hasAssertion = false;
      function rootName(expression: ts.Expression): string | undefined {
        if (ts.isIdentifier(expression)) return expression.text;
        if (ts.isCallExpression(expression) || ts.isPropertyAccessExpression(expression)) {
          return rootName(expression.expression);
        }
        return undefined;
      }
      function visit(node: ts.Node): void {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
          const matcher = node.expression.name.text;
          const attribute = node.arguments[0];
          expect(matcher, `${file}: opis dostępności nie jest zadaniem ucznia`).not.toBe(
            "toHaveAccessibleDescription",
          );
          if (matcher === "toHaveAttribute" && attribute && ts.isStringLiteral(attribute)) {
            expect(attribute.text, `${file}: ARIA nie jest kryterium zaliczenia`).not.toMatch(
              /^aria-/,
            );
          }
        }
        if (ts.isCallExpression(node)) {
          const name = rootName(node.expression);
          if (
            (name === "it" || name === "test") &&
            node.arguments.some(
              (argument) => ts.isArrowFunction(argument) || ts.isFunctionExpression(argument),
            )
          )
            hasTest = true;
          if (name === "expect" || name === "expectTypeOf" || name === "assert")
            hasAssertion = true;
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      expect(hasTest, `${file}: brak przypadków testowych`).toBe(true);
      expect(hasAssertion, `${file}: brak asercji`).toBe(true);
    }
  });

  it("uses plain props fields in reference solutions and revised templates", () => {
    const errors: string[] = [];
    for (const file of curriculumFiles.filter(
      (path) =>
        /\/(?:react|next|combined)\//.test(path) &&
        /\/(?:_starter|_solution)(?:\.|\/)/.test(path) &&
        /\.tsx?$/.test(path),
    )) {
      const source = ts.createSourceFile(
        file,
        readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      function visit(node: ts.Node): void {
        if (
          ts.isPropertySignature(node) &&
          belongsToProps(node) &&
          node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword)
        ) {
          errors.push(`${file}: ${node.name.getText(source)}`);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
    expect(errors).toEqual([]);
  });
});
