"use client";

import { useState } from "react";
import Link from "next/link";
import SearchButton from "@/app/components/SearchButton";
import TopicTag from "@/app/components/TopicTag";
import type { CatalogTrack } from "@/app/lib/types";
import {
  learningModules,
  pct,
  topicSlug,
  topicNumber,
  topicTag,
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

export default function Roadmap({ track, name, now }: { track: CatalogTrack; name: string; now: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const prog = trackProgress(track);
  const modules = learningModules(track);
  const next = track.topics.find((topic) =>
    topic.levels.some((level) => level.status !== "passed"),
  );

  return (
    <>
      <div className="topbar">
        <nav className="crumbs">
          <Link href="/">orzi-kurs</Link>
          <span className="sep">/</span>
          <span className="cur">{name}</span>
        </nav>
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap page-roadmap">
        <h1 className="title">{name}</h1>
        <p className="lede">
          Materiał jest podzielony na kolejne etapy. W każdym zagadnieniu przechodzisz od
          easy przez medium do hard.
        </p>

        <section className="roadmap-overview" aria-label="Postęp ścieżki">
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
          >
            <i style={{ transform: `scaleX(${pct(prog) / 100})` }} />
          </div>
          <span className="roadmap-pct num">{pct(prog)}%</span>
        </section>

        <div className="filters">
          {FILTERS.map(([key, label]) => (
            <button
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
          {modules.map((module, index) => {
            const topics = module.topics.filter((topic) => {
              const done = topic.levels.filter((level) => level.status === "passed").length;
              const started = topic.levels.filter((level) => level.status !== "not-started").length;
              const group = done === topic.levels.length ? "done" : started > 0 ? "wip" : "todo";
              const reviewDue = topic.levels.some(
                (level) => level.nextReviewAt && level.nextReviewAt <= now,
              );
              return filter === "all"
                ? true
                : filter === "DO"
                  ? topicTag(topic.id) !== null
                  : filter === "review"
                    ? reviewDue
                    : group === filter;
            });
            if (topics.length === 0) return null;

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
                  {topics.map((topic) => {
                    const done = topic.levels.filter((level) => level.status === "passed").length;
                    const tag = topicTag(topic.id);
                    const isNext = topic.id === next?.id;
                    return (
                      <Link
                        key={topic.id}
                        className={`rrow${isNext ? " is-next" : ""}`}
                        href={`/track/${track.id}/${topicSlug(topic.id)}`}
                      >
                        <span className="rn">{topicNumber(topic.id)}</span>
                        <span className="rt">
                          <span>{topic.title}</span>
                          {tag && <TopicTag tag={tag} />}
                        </span>
                        {isNext && <span className="next-label">Następne</span>}
                        <span
                          className="dots"
                          role="img"
                          aria-label={`${done} z ${topic.levels.length} poziomów zaliczonych`}
                        >
                          {topic.levels.map((level) => (
                            <span
                              key={level.id}
                              className={`sdot ${level.status}${level.nextReviewAt && level.nextReviewAt <= now ? " review-due" : ""}`}
                              title={`${level.id}: ${STATUS_LABEL[level.status]} · opanowanie ${level.masteryScore}/4${level.nextReviewAt && level.nextReviewAt <= now ? " · powtórka gotowa" : ""}`}
                            />
                          ))}
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
