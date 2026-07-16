import { createRequire } from "node:module";
import {
  transformSync,
  type PluginItem,
} from "@babel/core";

const loadModule = createRequire(import.meta.url);
const reactCompiler = loadModule("babel-plugin-react-compiler") as PluginItem;

export interface ReactCompilerOptions {
  readonly compilationMode?: "all" | "annotation" | "infer";
  readonly target?: "17" | "18" | "19";
}

export function compileReactSource(
  source: string,
  options: ReactCompilerOptions = {},
): string {
  const result = transformSync(source, {
    babelrc: false,
    configFile: false,
    filename: "exercise.tsx",
    parserOpts: {
      plugins: ["typescript", "jsx"],
    },
    plugins: [
      [
        reactCompiler,
        {
          compilationMode: options.compilationMode ?? "infer",
          target: options.target ?? "19",
        },
      ],
    ],
  });

  if (!result?.code) {
    throw new Error("React Compiler nie zwrócił skompilowanego kodu");
  }

  return result.code;
}

export function wasCompiled(output: string, functionName: string): boolean {
  const functionStart = output.indexOf(`function ${functionName}`);
  if (functionStart === -1) {
    return false;
  }

  const nextFunction = output.indexOf("\nfunction ", functionStart + 1);
  return output
    .slice(functionStart, nextFunction === -1 ? undefined : nextFunction)
    .includes("_c(");
}
