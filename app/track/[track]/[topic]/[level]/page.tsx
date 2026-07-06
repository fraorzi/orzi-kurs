import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { parseHints } from "@/harness/hints";
import { findStarter, findSolution, TRACKS_ROOT } from "@/harness/paths";
import { readProgress } from "@/harness/progress";
import TaskView from "./TaskView";

export default async function LevelPage({
  params,
}: {
  params: Promise<{ track: string; topic: string; level: string }>;
}) {
  const { track, topic, level } = await params;
  const taskId = `${track}/${topic}/${level}`;
  const taskDir = join(TRACKS_ROOT, track, topic, level);

  if (!existsSync(taskDir)) notFound();

  const taskMd = existsSync(join(taskDir, "task.md"))
    ? readFileSync(join(taskDir, "task.md"), "utf8")
    : "";
  const hintsTotal = parseHints(join(taskDir, "hints.md")).length;
  const starterPath = findStarter(taskDir);
  const passed = readProgress()[taskId]?.status === "passed";
  const solutionPath = findSolution(taskDir);
  const solution = passed && solutionPath ? readFileSync(solutionPath, "utf8") : null;

  return (
    <TaskView
      taskId={taskId}
      track={track}
      topic={topic}
      level={level}
      taskMd={taskMd}
      hintsTotal={hintsTotal}
      starterPath={starterPath}
      initialSolution={solution}
    />
  );
}
