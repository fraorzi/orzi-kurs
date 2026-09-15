import { formatComparison } from "@/app/lib/format-comparison";
import { readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { notFound } from "next/navigation";
import { parseHints } from "@/harness/hints";
import { findStarter, findSolution, readArtifactText, TRACKS_ROOT } from "@/harness/paths";
import { readProgress } from "@/harness/progress";
import { buildCatalog } from "@/harness/catalog";
import { resourcesForTask } from "@/harness/resources";
import { nextTaskInTrack } from "@/harness/task-navigation";
import TaskView from "./TaskView";
import { experimentForTask } from "@/harness/experiments/run";
import { courseFilter, courseQuery, courseStageForTopic } from "@/app/lib/course-navigation";

export default async function LevelPage({
  params,
  searchParams = Promise.resolve({}),
}: {
  params: Promise<{ track: string; topic: string; level: string }>;
  searchParams?: Promise<{ stage?: string; filter?: string }>;
}) {
  const { track, topic, level } = await params;
  const query = await searchParams;
  const taskId = `${track}/${topic}/${level}`;
  const taskDir = join(TRACKS_ROOT, track, topic, level);

  if (!existsSync(taskDir)) notFound();

  const taskMd = existsSync(join(taskDir, "task.md"))
    ? readFileSync(join(taskDir, "task.md"), "utf8")
    : "";
  const availableHints = parseHints(join(taskDir, "hints.md"));
  const starterPath = findStarter(taskDir);
  const progress = readProgress();
  const taskProgress = progress[taskId] ?? null;
  const progressStatus = taskProgress?.status;
  const passed = progressStatus === "passed" || progressStatus === "passed-with-hint";
  const solutionPath = findSolution(taskDir);
  const { starter, solution } = await formatComparison({
    solution: passed && solutionPath ? readArtifactText(solutionPath) : null,
    starter: passed ? (taskProgress?.verifiedStarter ?? null) : null,
  }, starterPath ?? solutionPath ?? taskDir);
  const starterRel = starterPath ? relative(process.cwd(), starterPath) : null;

  const catalogTrack = buildCatalog().tracks.find((item) => item.id === track);
  const topicTitle = catalogTrack?.topics.find((item) => item.id === `${track}/${topic}`)?.title ?? topic;
  const nextTask = catalogTrack ? nextTaskInTrack(catalogTrack, taskId) : null;
  const stage = catalogTrack ? courseStageForTopic(catalogTrack, `${track}/${topic}`) : undefined;
  const contextQuery = stage ? courseQuery(stage.id, courseFilter(query.filter)) : "";
  const solutionNotes = passed && existsSync(join(taskDir, "solution-notes.md")) ? readFileSync(join(taskDir, "solution-notes.md"), "utf8") : null;

  return (
    <TaskView
      taskId={taskId}
      track={track}
      topic={topic}
      topicTitle={topicTitle}
      level={level}
      taskMd={taskMd}
      hintsTotal={availableHints.length}
      initialHints={availableHints.slice(0, taskProgress?.revealedHints ?? 0)}
      starterPath={starterPath}
      starterRel={starterRel}
      initialSolution={solution}
      initialStarter={starter}
      initialProgress={taskProgress}
      initialPassKind={progressStatus === "passed-with-hint" ? "with-hint" : passed ? "without-hint" : null}
      resources={resourcesForTask(taskId)}
      nextTaskHref={nextTask ? `${nextTask.href}?${new URLSearchParams({ filter: courseFilter(query.filter) })}` : null}
      programHref={`/track/${track}?${contextQuery}`}
      levels={catalogTrack?.topics.find((item) => item.id === `${track}/${topic}`)?.levels ?? []}
      contextQuery={contextQuery}
      experiment={experimentForTask(taskId)}
      initialSolutionNotes={solutionNotes}
    />
  );
}
