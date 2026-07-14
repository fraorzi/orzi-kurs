import { readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { notFound } from "next/navigation";
import { parseHints } from "@/harness/hints";
import { findStarter, findSolution, TRACKS_ROOT } from "@/harness/paths";
import { readProgress } from "@/harness/progress";
import { buildCatalog } from "@/harness/catalog";
import { resourcesForTask } from "@/harness/resources";
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
  const progressStatus = readProgress()[taskId]?.status;
  const passed = progressStatus === "passed" || progressStatus === "passed-with-hint";
  const solutionPath = findSolution(taskDir);
  const solution = passed && solutionPath ? readFileSync(solutionPath, "utf8") : null;
  const starterRel = starterPath ? relative(process.cwd(), starterPath) : null;

  const catalogTrack = buildCatalog().tracks.find((item) => item.id === track);
  const topicTitle = catalogTrack?.topics.find((item) => item.id === `${track}/${topic}`)?.title ?? topic;
  const tasks = catalogTrack?.topics.flatMap((item) =>
    item.levels.map((catalogLevel) => ({
      id: `${item.id}/${catalogLevel.id}`,
      href: `/track/${item.id}/${catalogLevel.id}`,
    })),
  ) ?? [];
  const nextTask = tasks[tasks.findIndex((task) => task.id === taskId) + 1] ?? null;

  return (
    <TaskView
      taskId={taskId}
      track={track}
      topic={topic}
      topicTitle={topicTitle}
      level={level}
      taskMd={taskMd}
      hintsTotal={hintsTotal}
      starterPath={starterPath}
      starterRel={starterRel}
      initialSolution={solution}
      initialPassKind={progressStatus === "passed-with-hint" ? "with-hint" : passed ? "without-hint" : null}
      resources={resourcesForTask(taskId)}
      nextTaskHref={nextTask?.href ?? null}
    />
  );
}
