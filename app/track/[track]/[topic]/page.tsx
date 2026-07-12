import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildCatalog } from "@/harness/catalog";
import { TRACKS_ROOT } from "@/harness/paths";
import Markdown from "@/app/components/Markdown";
import SearchButton from "@/app/components/SearchButton";
import {
  trackMeta,
  topicNumber,
  topicTag,
  LEVEL_DESC,
  STATUS_LABEL,
} from "@/app/lib/tracks";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ track: string; topic: string }>;
}) {
  const { track, topic } = await params;
  const trackData = buildCatalog().tracks.find((t) => t.id === track);
  const topicData = trackData?.topics.find((t) => t.id === `${track}/${topic}`);
  if (!topicData) notFound();

  const readmePath = join(TRACKS_ROOT, track, topic, "README.md");
  const readme = existsSync(readmePath) ? readFileSync(readmePath, "utf8") : "";
  const meta = trackMeta(track);
  const tag = topicTag(topicData.id);

  return (
    <>
      <div className="topbar">
        <nav className="crumbs">
          <Link href="/">orzi-kurs</Link>
          <span className="sep">/</span>
          <Link href={`/track/${track}`}>{meta.name}</Link>
          <span className="sep">/</span>
          <span className="cur">
            {topicNumber(topicData.id)} {topicData.title}
          </span>
        </nav>
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap wrap-read">
        {readme ? <Markdown content={readme} /> : <h1 className="title">{topicData.title}</h1>}

        <h2 className="sec">
          Poziomy {tag && <span className={`tag ${tag.toLowerCase()}`}>{tag}</span>}
        </h2>
        <div className="lvls">
          {topicData.levels.map((level) => (
            <Link
              key={level.id}
              className="lcard"
              href={`/track/${track}/${topic}/${level.id}`}
            >
              <span className={`sdot ${level.status}`} style={{ width: 11, height: 11 }} />
              <div>
                <div className="lname">{level.id}</div>
                <div className="ldesc">{LEVEL_DESC[level.id] ?? ""}</div>
              </div>
              <span className={`pill ${level.status}`}>{STATUS_LABEL[level.status]}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
