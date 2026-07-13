"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import { topicSlug, topicNumber, topicTag, trackMeta, TRACK_META } from "@/app/lib/tracks";
import { IconCheck } from "./icons";
import TrackBadge from "./TrackBadge";
import TopicTag from "./TopicTag";

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

  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [popPos, setPopPos] = useState<{ top: number; left: number } | null>(null);
  const switcherRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setSwitcherOpen(false);
  }

  const positionPop = useCallback(() => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (r) {
      const top = Math.max(8, Math.min(r.top, window.innerHeight - 340));
      setPopPos({ top, left: r.right + 8 });
    }
  }, []);

  function openSwitcher() {
    positionPop();
    setSwitcherOpen(true);
  }

  useEffect(() => {
    if (!switcherOpen) return;
    function onDocClick(e: MouseEvent) {
      if (
        !switcherRef.current?.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest?.(".trackpop")
      ) {
        setSwitcherOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSwitcherOpen(false);
    }
    // Keep the popover glued to its trigger while scrolling instead of closing it.
    let raf = 0;
    function reposition() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        positionPop();
      });
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [switcherOpen, positionPop]);

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
        <Link className="brand" href="/">
          orzi<span className="d">·</span>kurs
        </Link>
      </div>

      <div className="rail-scroll">
        {meta && track && (
          <div className="trackswitch-wrap" ref={switcherRef}>
            <button
              ref={triggerRef}
              className="trackswitch"
              aria-expanded={switcherOpen}
              onClick={() => (switcherOpen ? setSwitcherOpen(false) : openSwitcher())}
            >
              <TrackBadge id={track.id} />
              <span>{meta.name}</span>
              <span className="sw">zmień ›</span>
            </button>

            {switcherOpen && popPos && (
              <div
                className="trackpop"
                role="listbox"
                aria-label="Wybierz track"
                style={{ top: popPos.top, left: popPos.left }}
              >
                {catalog?.tracks.map((t) => {
                  const m = trackMeta(t.id);
                  const isCurrent = t.id === track.id;
                  return (
                    <button
                      key={t.id}
                      className={`trackpop-item${isCurrent ? " on" : ""}`}
                      role="option"
                      aria-selected={isCurrent}
                      onClick={() => {
                        setSwitcherOpen(false);
                        router.push(`/track/${t.id}`);
                      }}
                    >
                      <TrackBadge id={t.id} size="sm" />
                      <span>{m.name}</span>
                      {isCurrent && <IconCheck className="ck" />}
                    </button>
                  );
                })}
                {(() => {
                  const upcoming = TRACK_META.filter(
                    (m) => !catalog?.tracks.some((t) => t.id === m.id),
                  );
                  if (upcoming.length === 0) return null;
                  return (
                    <>
                      <div className="trackpop-sep" />
                      {upcoming.map((m) => (
                        <div
                          key={m.id}
                          className="trackpop-item is-soon"
                          role="option"
                          aria-disabled="true"
                          aria-selected="false"
                        >
                          <TrackBadge id={m.id} size="sm" />
                          <span>{m.name}</span>
                          <span className="soonlbl">wkrótce</span>
                        </div>
                      ))}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
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
                    {tag && <TopicTag tag={tag} />}
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
