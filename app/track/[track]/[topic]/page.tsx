import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildCatalog } from "@/harness/catalog";
import { TRACKS_ROOT } from "@/harness/paths";
import Markdown from "@/app/components/Markdown";
import StatusBadge from "@/app/components/StatusBadge";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ track: string; topic: string }>;
}) {
  const { track, topic } = await params;
  const catalog = buildCatalog();
  const trackData = catalog.tracks.find((t) => t.id === track);
  const topicData = trackData?.topics.find((t) => t.id === `${track}/${topic}`);

  if (!topicData) notFound();

  const readmePath = join(TRACKS_ROOT, track, topic, "README.md");
  const readme = existsSync(readmePath) ? readFileSync(readmePath, "utf8") : "";

  return (
    <main className="p-10 max-w-4xl">
      <div className="text-xs text-fg-faint mb-4">
        <Link href="/" className="hover:text-accent">
          orzi-kurs
        </Link>{" "}
        / {track} / {topic}
      </div>

      <Markdown content={readme} />

      <h2 className="text-[11px] uppercase tracking-widest text-fg-faint mt-10 mb-3">
        poziomy
      </h2>

      <div className="flex flex-col gap-2 max-w-md">
        {topicData.levels.map((level) => (
          <Link
            key={level.id}
            href={`/track/${track}/${topic}/${level.id}`}
            className="flex items-center justify-between border border-border bg-bg-raised px-4 py-3 hover:border-border-strong"
          >
            <span className="font-bold">{level.id}</span>
            <StatusBadge status={level.status} />
          </Link>
        ))}
      </div>
    </main>
  );
}
