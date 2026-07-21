import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildCatalog } from "@/harness/catalog";
import { TRACKS_ROOT } from "@/harness/paths";
import Markdown from "@/app/components/Markdown";
import RouteBreadcrumbs from "@/app/components/RouteBreadcrumbs";
import SearchButton from "@/app/components/SearchButton";
import TopicTag from "@/app/components/TopicTag";
import {
  nextLearningTarget,
  topicNumber,
  topicTag,
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
  if (!trackData || !topicData) notFound();

  const readmePath = join(TRACKS_ROOT, track, topic, "README.md");
  const readme = existsSync(readmePath) ? readFileSync(readmePath, "utf8") : "";
  const tag = topicTag(topicData.id);
  const target = nextLearningTarget({ ...trackData, topics: [topicData] });

  return (
    <>
      <div className="topbar">
        <RouteBreadcrumbs
          trackId={track}
          topic={{
            id: topic,
            number: topicNumber(topicData.id),
            title: topicData.title,
          }}
        />
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap wrap-read page-theory">
        <div className="page-role">
          <strong>Teoria przed praktyką</strong>
          <span>Zrozum mechanizm, a potem sprawdź go na trzech poziomach trudności.</span>
        </div>

        <article className="theory-content">
          {readme ? <Markdown content={readme} /> : <h1 className="title">{topicData.title}</h1>}
        </article>

        <section className="level-picker" aria-labelledby="level-picker-title">
          <div className="level-picker-head">
            <div>
              <h2 id="level-picker-title">Przejdź do praktyki</h2>
              <p>Wybierz poziom. Każdy kolejny wymaga więcej samodzielnego myślenia.</p>
            </div>
            {tag && <TopicTag tag={tag} />}
          </div>
          <div className="lvls">
            {topicData.levels.map((level) => (
              <Link
                key={level.id}
                className={`lcard${target?.level.id === level.id ? " recommended" : ""}`}
                href={`/track/${track}/${topic}/${level.id}`}
              >
                <span className={`sdot ${level.status}`} style={{ width: 11, height: 11 }} aria-hidden="true" />
                <div className="lname">{level.id}</div>
                {target?.level.id === level.id && (
                  <span className="level-next">
                    {target.intent === "review" ? "Powtórz" : target.intent === "resume" ? "Wznów" : "Zacznij"}
                  </span>
                )}
                <span className={`pill ${level.status}`}>{STATUS_LABEL[level.status]}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
