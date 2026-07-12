"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import { topicSlug, topicNumber, topicTag, trackMeta } from "@/app/lib/tracks";

interface Props {
  catalog: Catalog | null;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ catalog, collapsed, onToggle }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const seg = pathname.split("/").filter(Boolean);
  const inTrack = seg[0] === "track";
  const curTrackId = inTrack ? seg[1] : undefined;
  const curTopicSlug = inTrack ? seg[2] : undefined;
  const curLevel = inTrack ? seg[3] : undefined;

  // Which topic is expanded. Follows the route when you navigate into a topic,
  // but a click on an already-open topic collapses it in place.
  const [openSlug, setOpenSlug] = useState<string | undefined>(curTopicSlug);
  const [prevSlug, setPrevSlug] = useState(curTopicSlug);
  if (curTopicSlug !== prevSlug) {
    setPrevSlug(curTopicSlug);
    setOpenSlug(curTopicSlug);
  }

  const track =
    catalog?.tracks.find((t) => t.id === curTrackId) ?? catalog?.tracks[0] ?? null;
  const meta = track ? trackMeta(track.id) : null;

  function toggleTopic(slug: string, href: string) {
    if (openSlug === slug) {
      setOpenSlug(undefined);
    } else {
      setOpenSlug(slug);
      router.push(href);
    }
  }

  return (
    <nav className="rail" aria-label="Nawigacja kursu">
      <div className="rail-head">
        <button
          className="icon-btn"
          onClick={onToggle}
          aria-label={collapsed ? "Rozwiń panel" : "Zwiń panel"}
          title="Panel  [ ]"
        >
          {collapsed ? "›" : "‹"}
        </button>
        <span className="brand">
          orzi<span className="d">·</span>kurs
        </span>
      </div>

      <div className="rail-scroll">
        {meta && (
          <Link className="trackswitch" href="/">
            <span className="dot" style={{ background: meta.color }} />
            <span>{meta.name}</span>
            <span className="sw">zmień ›</span>
          </Link>
        )}

        {!catalog && <div className="rail-cap">ładowanie…</div>}

        {track && (
          <>
            <div className="rail-cap">Zagadnienia · {track.topics.length}</div>
            {track.topics.map((topic) => {
              const slug = topicSlug(topic.id);
              const open = slug === openSlug;
              const tag = topicTag(topic.id);
              const topicHref = `/track/${track.id}/${slug}`;
              return (
                <div key={topic.id} className={`topic${open ? " open" : ""}`}>
                  <button
                    className="topic-btn"
                    aria-expanded={open}
                    onClick={() => toggleTopic(slug, topicHref)}
                  >
                    <span className="topic-num mono">{topicNumber(topic.id)}</span>
                    <span className="topic-title">{topic.title}</span>
                    {tag && <span className={`tag ${tag.toLowerCase()}`}>{tag}</span>}
                    <span className="caret">▶</span>
                  </button>
                  <div className="levels">
                    <div>
                      {topic.levels.map((level) => {
                        const active =
                          slug === curTopicSlug && level.id === curLevel;
                        return (
                          <Link
                            key={level.id}
                            className={`lvl${active ? " active" : ""}`}
                            href={`${topicHref}/${level.id}`}
                            aria-current={active}
                          >
                            <span className={`sdot ${level.status}`} />
                            <span>{level.id}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </nav>
  );
}
