"use client";

import { useState } from "react";
import Link from "next/link";
import SearchButton from "@/app/components/SearchButton";
import TopicTag from "@/app/components/TopicTag";
import type { CatalogTrack } from "@/app/lib/types";
import { topicSlug, topicNumber, topicTag, trackProgress, STATUS_LABEL } from "@/app/lib/tracks";

type Filter = "all" | "todo" | "wip" | "done" | "DO";
const FILTERS: [Filter, string][] = [
  ["all", "Wszystkie"],
  ["todo", "Do zrobienia"],
  ["wip", "W toku"],
  ["done", "Zaliczone"],
  ["DO", "Debug i optym."],
];

export default function Roadmap({ track, name }: { track: CatalogTrack; name: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const prog = trackProgress(track);

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

      <div className="wrap">
        <h1 className="title">{name}</h1>
        <p className="lede num">
          {track.topics.length} zagadnień · {prog.passed} z {prog.total} poziomów zaliczonych.
          Trudność rośnie z numerem; wewnątrz: easy → medium → hard.
        </p>

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

        <div className="road">
          {track.topics.map((topic) => {
            const done = topic.levels.filter((l) => l.status === "passed").length;
            const grp = done === topic.levels.length ? "done" : done > 0 ? "wip" : "todo";
            const tag = topicTag(topic.id);
            const show =
              filter === "all" ? true : filter === "DO" ? tag !== null : grp === filter;
            if (!show) return null;

            return (
              <Link
                key={topic.id}
                className="rrow"
                href={`/track/${track.id}/${topicSlug(topic.id)}`}
              >
                <span className="rn">{topicNumber(topic.id)}</span>
                <span className="rt">
                  <span>{topic.title}</span>
                  {tag && <TopicTag tag={tag} />}
                </span>
                <span className="dots">
                  {topic.levels.map((level) => (
                    <span
                      key={level.id}
                      className={`sdot ${level.status}`}
                      title={`${level.id}: ${STATUS_LABEL[level.status]}`}
                    />
                  ))}
                </span>
                <span className="frac num">
                  {done}/{topic.levels.length}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
