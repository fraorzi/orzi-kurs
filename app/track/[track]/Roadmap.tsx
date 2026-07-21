"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SearchButton from "@/app/components/SearchButton";
import RouteBreadcrumbs from "@/app/components/RouteBreadcrumbs";
import TopicTag from "@/app/components/TopicTag";
import {
  SHARED_LAYOUT_TRANSITION,
  topicNumberLayoutId,
  topicTitleLayoutId,
} from "@/app/lib/route-motion";
import type { CatalogTopic, CatalogTrack } from "@/app/lib/types";
import {
  isCompletedStatus,
  isReviewDue,
  learningModules,
  nextLearningTarget,
  pct,
  topicSlug,
  topicNumber,
  topicTag,
  trackMeta,
  trackProgress,
  STATUS_LABEL,
} from "@/app/lib/tracks";

type Filter = "all" | "todo" | "wip" | "review" | "done" | "DO";
const FILTERS: [Filter, string][] = [
  ["all", "Wszystkie"],
  ["todo", "Do zrobienia"],
  ["wip", "W toku"],
  ["review", "Do powtórki"],
  ["done", "Zaliczone"],
  ["DO", "Debug i optym."],
];

function matchesFilter(topic: CatalogTopic, filter: Filter, now: string): boolean {
  if (filter === "all") return true;
  if (filter === "DO") return topicTag(topic.id) !== null;
  if (filter === "review") return topic.levels.some((level) => isReviewDue(level, now));

  const done = topic.levels.filter((level) => isCompletedStatus(level.status)).length;
  const started = topic.levels.some((level) => level.status !== "not-started");
  const group = done === topic.levels.length ? "done" : started ? "wip" : "todo";
  return group === filter;
}

export default function Roadmap({ track, name, now }: { track: CatalogTrack; name: string; now: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const prog = trackProgress(track);
  const modules = learningModules(track, now);
  const target = nextLearningTarget(track, now);
  const visibleModules = modules
    .map((module) => ({
      ...module,
      visibleTopics: module.topics.filter((topic) => matchesFilter(topic, filter, now)),
    }))
    .filter((module) => module.visibleTopics.length > 0);

  return (
    <>
      <div className="topbar">
        <RouteBreadcrumbs trackId={track.id} />
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap page-roadmap">
        <h1 className="title">{name}</h1>
        <p className="lede">
          Materiał jest podzielony na kolejne etapy. W każdym zagadnieniu przechodzisz od
          easy przez medium do hard.
        </p>

        <section
          className="roadmap-overview"
          aria-label="Postęp ścieżki"
          style={{ "--progress-color": trackMeta(track.id).color } as CSSProperties}
        >
          <div>
            <strong>{prog.passed} z {prog.total} poziomów</strong>
            <span>{modules.filter((module) => module.passed === module.total).length} z {modules.length} etapów ukończonych</span>
          </div>
          <div
            className="roadmap-meter"
            role="progressbar"
            aria-label="Postęp ścieżki"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct(prog)}
            aria-valuetext={`${prog.passed} z ${prog.total} poziomów (${pct(prog)}%)`}
          >
            <i style={{ transform: `scaleX(${pct(prog) / 100})` }} />
          </div>
          <span className="roadmap-pct num">{pct(prog)}%</span>
        </section>

        <div className="filters" role="group" aria-label="Filtry programu">
          {FILTERS.map(([key, label]) => (
            <button
              type="button"
              key={key}
              className={`chip${filter === key ? " on" : ""}`}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="road-modules">
          {visibleModules.length === 0 && (
            <div className="road-empty">
              <strong>Brak tematów w tym widoku</strong>
              <span>Wybierz inny filtr, żeby wrócić do programu.</span>
              <button type="button" className="btn-ghost" onClick={() => setFilter("all")}>Pokaż wszystkie</button>
            </div>
          )}
          {visibleModules.map((module) => {
            const index = modules.findIndex((item) => item.id === module.id);
            return (
              <section className={`road-module${module.current ? " current" : ""}`} key={module.id}>
                <header className="road-module-head">
                  <div className="road-module-copy">
                    <span className="road-module-step">Etap {index + 1}</span>
                    <h2>{module.title}</h2>
                    <p>{module.description}</p>
                  </div>
                  <div className="road-module-status">
                    {module.current && <span className="current-label">Teraz</span>}
                    <strong className="num">{module.passed}/{module.total}</strong>
                    <span>poziomów</span>
                  </div>
                </header>

                <div className="road">
                  {module.visibleTopics.map((topic) => {
                    const done = topic.levels.filter((level) => isCompletedStatus(level.status)).length;
                    const tag = topicTag(topic.id);
                    const isNext = topic.id === target?.topic.id;
                    return (
                      <Link
                        key={topic.id}
                        className={`rrow${isNext ? " is-next" : ""}`}
                        href={`/track/${track.id}/${topicSlug(topic.id)}`}
                      >
                        <motion.span
                          className="rn"
                          layout="position"
                          layoutId={topicNumberLayoutId(track.id, topicSlug(topic.id))}
                          transition={SHARED_LAYOUT_TRANSITION}
                        >
                          {topicNumber(topic.id)}
                        </motion.span>
                        <span className="rt">
                          <motion.span
                            layout="position"
                            layoutId={topicTitleLayoutId(track.id, topicSlug(topic.id))}
                            transition={SHARED_LAYOUT_TRANSITION}
                          >
                            {topic.title}
                          </motion.span>
                          {tag && <TopicTag tag={tag} />}
                        </span>
                        {isNext && (
                          <span className="next-label">
                            {target.intent === "review" ? "Powtórka" : target.intent === "resume" ? "W toku" : "Następne"}
                          </span>
                        )}
                        <span
                          className="dots"
                          aria-hidden="true"
                        >
                          {topic.levels.map((level) => (
                            <span
                              key={level.id}
                              className={`sdot ${level.status}${isReviewDue(level, now) ? " review-due" : ""}`}
                              title={`${level.id}: ${STATUS_LABEL[level.status]} · opanowanie ${level.masteryScore}/4${isReviewDue(level, now) ? " · powtórka gotowa" : ""}`}
                            />
                          ))}
                        </span>
                        <span className="sr-only">
                          {topic.levels.map((level) =>
                            `${level.id}: ${STATUS_LABEL[level.status]}${isReviewDue(level, now) ? ", powtórka gotowa" : ""}`,
                          ).join("; ")}
                        </span>
                        <span className="frac num">{done}/{topic.levels.length}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
