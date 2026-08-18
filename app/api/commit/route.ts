import { execFile } from "node:child_process";
import { relative } from "node:path";
import { promisify } from "node:util";
import { findStarter, resolveTaskDir } from "@/harness/paths";
import { REPO_ROOT } from "@/harness/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

function cleanOutput(value: string): string {
  return value.replace(/\u001b\[[0-9;]*m/g, "").trim();
}

function errorMessage(error: unknown): string {
  const commandError = error as Error & { stdout?: string; stderr?: string };
  const output = cleanOutput(
    [commandError.stdout, commandError.stderr]
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .join("\n"),
  );
  return output.split("\n").filter(Boolean).at(-1) ?? commandError.message;
}

function validateTask(taskId: string): string {
  if (taskId.split("/").some((segment) => segment.startsWith("_"))) {
    throw new Error("nie można commitować zadania technicznego z ukrytego tracka");
  }
  const starter = findStarter(resolveTaskDir(taskId));
  if (!starter) throw new Error(`brak startera dla: ${taskId}`);
  return starter;
}

async function git(args: string[]) {
  return execFileAsync("git", args, {
    cwd: REPO_ROOT,
    env: { ...process.env, NO_COLOR: "1" },
    maxBuffer: 32 * 1024 * 1024,
  });
}

async function commitState(taskId: string): Promise<{
  solutionChanged: boolean;
  solutionPendingPush: boolean;
}> {
  const starter = validateTask(taskId);
  const starterPath = relative(REPO_ROOT, starter);
  const { stdout } = await git([
    "status",
    "--porcelain=v1",
    "--",
    starterPath,
  ]);
  const solutionChanged = stdout.trim().length > 0;
  let differsFromUpstream = false;
  try {
    await git(["diff", "--quiet", "@{upstream}", "--", starterPath]);
  } catch (error) {
    const commandError = error as Error & { code?: number | string };
    if (commandError.code !== 1) throw error;
    differsFromUpstream = true;
  }

  return {
    solutionChanged,
    solutionPendingPush: !solutionChanged && differsFromUpstream,
  };
}

export async function GET(req: Request) {
  const taskId = new URL(req.url).searchParams.get("id");
  if (!taskId) {
    return Response.json({ error: "brak parametru id" }, { status: 400 });
  }

  try {
    return Response.json(await commitState(taskId));
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  let body: { taskId?: string } | null;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  const taskId = body?.taskId;
  if (!taskId || typeof taskId !== "string") {
    return Response.json({ error: "wymagane pole taskId" }, { status: 400 });
  }

  let state: Awaited<ReturnType<typeof commitState>>;
  try {
    state = await commitState(taskId);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }

  let committed = false;
  if (state.solutionChanged) {
    try {
      const { stdout, stderr } = await execFileAsync(
        process.execPath,
        ["--import", "tsx", "harness/cli.ts", "commit", taskId],
        {
          cwd: REPO_ROOT,
          env: { ...process.env, NO_COLOR: "1" },
          maxBuffer: 32 * 1024 * 1024,
        },
      );
      committed = !cleanOutput(`${stdout}\n${stderr}`).includes(
        "brak zmian rozwiązania lub postępu do zacommitowania",
      );
    } catch (error) {
      const commandError = error as Error & { code?: number | string };
      return Response.json(
        { error: errorMessage(error), committed: false, pushed: false },
        { status: commandError.code === 1 ? 409 : 500 },
      );
    }

    try {
      state = await commitState(taskId);
    } catch (error) {
      return Response.json(
        { error: errorMessage(error), committed, pushed: false },
        { status: 500 },
      );
    }
  }

  if (!state.solutionPendingPush) {
    return Response.json({
      committed: false,
      pushed: false,
      message: "Rozwiązanie jest już zacommitowane i pushnięte.",
    });
  }

  try {
    await git(["push"]);
  } catch (error) {
    return Response.json(
      {
        error: `Commit zapisano lokalnie, ale git push nie powiódł się: ${errorMessage(error)}`,
        committed,
        pushed: false,
      },
      { status: 502 },
    );
  }

  return Response.json({
    committed,
    pushed: true,
    message: committed ? "Zadanie zostało zacommitowane i pushnięte." : "Commit został pushnięty.",
  });
}
