import Link from "next/link";
import { connection } from "next/server";
import { buildCatalog } from "@/harness/catalog";
import { readProgress } from "@/harness/progress";
import { recommendTask } from "@/harness/recommendation";
import SearchButton from "@/app/components/SearchButton";
import TrackBadge from "@/app/components/TrackBadge";
import {
  IconArrowRight,
  IconCode,
  IconLayers,
  IconDatabase,
  IconBoxes,
} from "@/app/components/icons";
import {
  CATEGORIES,
  TRACK_META,
  trackMeta,
  trackProgress,
  pct,
  topicSlug,
  topicNumber,
  type Category,
} from "@/app/lib/tracks";

const CAT_ICON: Record<Category, typeof IconCode> = {
  Języki: IconCode,
  Frameworki: IconLayers,
  "Backend & DB": IconDatabase,
  Projekty: IconBoxes,
};

export default async function Home() {
  await connection();
  const catalog = buildCatalog();
  const progress = readProgress();
  const activeIds = new Set(catalog.tracks.map((t) => t.id));
  const upcoming = TRACK_META.filter((m) => !activeIds.has(m.id));

  return (
    <>
      <div className="topbar">
        <nav className="crumbs">
          <span className="cur">orzi-kurs</span>
        </nav>
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap">
        <h1 className="title">Czego się dziś uczysz?</h1>
        <p className="lede">
          Wybierz ścieżkę. Każde zagadnienie ma teorię i zadania easy / medium / hard,
          sprawdzane lokalnie testami i lintem.
        </p>

        {catalog.tracks.map((track) => {
          const meta = trackMeta(track.id);
          const prog = trackProgress(track);
          const p = pct(prog);
          const recommendation = recommendTask(track, progress);
          const [, recommendedTopic, recommendedLevel] = recommendation?.taskId.split("/") ?? [];
          const next = track.topics.find((topic) => topic.id === `${track.id}/${recommendedTopic}`);
          const nextLevel = next?.levels.find((level) => level.id === recommendedLevel);
          const startIdx = next ? track.topics.indexOf(next) : 0;
          const peek = track.topics.slice(startIdx, startIdx + 3);

          return (
            <section className="active-track" key={track.id}>
              <div className="top">
                <div className="idw">
                  <TrackBadge id={track.id} size="lg" />
                  <div>
                    <div className="name">{meta.name}</div>
                    <div className="of num">
                      {prog.passed} z {prog.total} poziomów zaliczonych
                    </div>
                  </div>
                </div>
                <div className="ring" style={{ ["--sz"]: "52px", ["--p"]: p } as React.CSSProperties}>
                  <b className="num">{p}%</b>
                </div>
              </div>

              <div className="progressbar">
                <i style={{ transform: `scaleX(${p / 100})` }} />
              </div>

              {next && nextLevel && (
                <div className="cont">
                  <span className="lbl">{recommendation?.label}:</span>
                  <span className="where">
                    {topicNumber(next.id)} {next.title} · {nextLevel.id}
                  </span>
                  <Link className="cta" href={`/track/${track.id}/${topicSlug(next.id)}/${nextLevel.id}`}>
                    Wznów <IconArrowRight />
                  </Link>
                </div>
              )}

              {peek.length > 0 && (
                <div className="peek">
                  {peek.map((t) => (
                    <Link className="pk" key={t.id} href={`/track/${track.id}/${topicSlug(t.id)}`}>
                      <span className="mono">{topicNumber(t.id)}</span>
                      {t.title}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {upcoming.length > 0 && (
          <>
            <h2 className="sec">
              Wkrótce <span className="n num">{upcoming.length} tracków</span>
            </h2>
            <div className="soon">
              {CATEGORIES.map((cat) => {
                const items = upcoming.filter((m) => m.category === cat);
                if (items.length === 0) return null;
                const CatIcon = CAT_ICON[cat];
                return (
                  <div className="soon-group" key={cat}>
                    <div className="soon-cat">
                      <CatIcon />
                      {cat}
                    </div>
                    <div className="soon-items">
                      {items.map((m) => (
                        <span className="soon-item" key={m.id}>
                          <TrackBadge id={m.id} size="sm" />
                          {m.name}
                          <span className="st">wkrótce</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
