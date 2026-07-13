"use server";

import { execFile } from "node:child_process";
import { resolve, sep } from "node:path";

export async function openInEditor(relPath: string): Promise<{ ok: boolean; error?: string }> {
  const root = process.cwd();
  const abs = resolve(root, relPath);
  if (abs !== root && !abs.startsWith(root + sep)) {
    return { ok: false, error: "Ścieżka poza projektem" };
  }

  return new Promise((resolvePromise) => {
    execFile("open", ["-a", "WebStorm", abs], (err) => {
      resolvePromise(err ? { ok: false, error: err.message } : { ok: true });
    });
  });
}
