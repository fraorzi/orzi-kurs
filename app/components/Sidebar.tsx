"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import { sortTracksByLearningOrder } from "@/curriculum/order";
import {
  learningModules,
  topicSlug,
  trackMeta,
  TRACK_META,
} from "@/app/lib/tracks";
import { IconCheck, IconClose, IconStageIndex } from "./icons";
import TrackBadge from "./TrackBadge";
import { courseFilter, courseQuery, courseStagePercent, selectedCourseStage } from "@/app/lib/course-navigation";
import styles from "./shell.module.css";

interface Props {
  catalog: Catalog | null;
  catalogStatus: "loading" | "error" | "success";
  collapsed: boolean;
  isMobile: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  onMobileNavigate: () => void;
  onRetryCatalog: () => void;
  inert: boolean;
}

type SwitcherPhase = "closed" | "open" | "closing";

const STAGE_PLURAL = new Intl.PluralRules("pl-PL");
function stageWord(count: number): string {
  switch (STAGE_PLURAL.select(count)) {
    case "one":
      return "etap";
    case "few":
      return "etapy";
    default:
      return "etapów";
  }
}

export default function Sidebar({
  catalog,
  catalogStatus,
  collapsed,
  isMobile,
  mobileOpen,
  onToggle,
  onMobileClose,
  onMobileNavigate,
  onRetryCatalog,
  inert,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const seg = pathname.split("/").filter(Boolean);
  const inTrack = seg[0] === "track";
  const curTrackId = inTrack ? seg[1] : undefined;
  const curTopicSlug = inTrack ? seg[2] : undefined;
  const searchParams = useSearchParams();

  const [switcherPhase, setSwitcherPhase] = useState<SwitcherPhase>("closed");
  const [popPos, setPopPos] = useState<{ top: number; left: number } | null>(null);
  const switcherRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const switcherOpen = switcherPhase === "open";
  if (isMobile && !mobileOpen && switcherPhase !== "closed") {
    setSwitcherPhase("closed");
  }

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setSwitcherPhase((phase) => (phase === "closed" ? phase : "closing"));
  }

  const positionPop = useCallback(() => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (r) {
      const top = isMobile
        ? Math.max(8, Math.min(r.bottom + 8, window.innerHeight - 340))
        : Math.max(8, Math.min(r.top, window.innerHeight - 340));
      setPopPos({ top, left: isMobile ? 8 : r.right + 8 });
    }
  }, [isMobile]);

  function openSwitcher() {
    positionPop();
    setSwitcherPhase("open");
  }

  const closeSwitcher = useCallback(() => {
    setSwitcherPhase((phase) => (phase === "closed" ? phase : "closing"));
  }, []);

  useEffect(() => {
    if (!switcherOpen) return;
    function onDocClick(e: MouseEvent) {
      if (
        !switcherRef.current?.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest?.(".trackpop")
      ) {
        closeSwitcher();
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSwitcher();
        triggerRef.current?.focus();
      }
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
  }, [closeSwitcher, switcherOpen, positionPop]);

  const orderedTracks = sortTracksByLearningOrder(catalog?.tracks ?? []);
  const track =
    orderedTracks.find((t) => t.id === curTrackId) ?? orderedTracks[0] ?? null;
  const meta = track ? trackMeta(track.id) : null;
  const modules = track ? learningModules(track) : [];

  return (
    <aside
      id="course-navigation"
      className={`rail${mobileOpen ? ` ${styles.mobileOpen}` : ""}${isMobile && !mobileOpen ? ` ${styles.mobileHidden}` : ""}`}
      role={isMobile && mobileOpen ? "dialog" : "navigation"}
      aria-modal={isMobile && mobileOpen ? true : undefined}
      aria-label="Nawigacja kursu"
      aria-hidden={isMobile && !mobileOpen ? true : undefined}
      inert={inert || (isMobile && !mobileOpen) ? true : undefined}
    >
      <div className="rail-head">
        <button
          type="button"
          className="icon-btn"
          onClick={isMobile ? onMobileClose : onToggle}
          aria-label={isMobile ? "Zamknij nawigację" : collapsed ? "Rozwiń panel" : "Zwiń panel"}
          title="Panel  [ ]"
        >
          {isMobile ? <IconClose /> : collapsed ? "›" : "‹"}
        </button>
        <Link
          className="brand"
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={onMobileNavigate}
        >
          orzi<span className="d">·</span>kurs
        </Link>
      </div>

      <div className="rail-scroll">
        <Link
          href="/roadmap"
          className={styles.roadmapLink}
          aria-current={pathname === "/roadmap" ? "page" : undefined}
          onClick={onMobileNavigate}
          title="Roadmapa"
        >
          <svg className={styles.roadmapIcon} viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path className={styles.mapFoldLeft} d="m2 7 8-4v19l-8 4Z" />
            <path className={styles.mapFoldMiddle} d="m10 3 8 4v19l-8-4Z" />
            <path className={styles.mapFoldRight} d="m18 7 8-4v19l-8 4Z" />
            <path className={styles.mapRiver} d="m3 20 7-8 8 5 7-7" />
            <path className={styles.mapRoute} d="m5 11 5-3 8 5 5-5" />
            <circle className={styles.mapPin} cx="18" cy="13" r="2.5" />
          </svg>
          <span>Roadmapa</span>
        </Link>
        {meta && track && (
          <div className="trackswitch-wrap" ref={switcherRef}>
            <button
              type="button"
              ref={triggerRef}
              className="trackswitch"
              aria-expanded={switcherOpen}
              aria-controls="track-switcher"
              onClick={() => (switcherOpen ? closeSwitcher() : openSwitcher())}
            >
              <TrackBadge id={track.id} />
              <span>{meta.name}</span>
              <span className="sw">zmień ›</span>
            </button>

            {switcherPhase !== "closed" && popPos && (
              <div
                className={`trackpop${switcherPhase === "closing" ? " closing" : ""}`}
                id="track-switcher"
                role="group"
                aria-label="Wybierz track"
                aria-hidden={switcherPhase === "closing"}
                inert={switcherPhase === "closing" ? true : undefined}
                style={{ top: popPos.top, left: popPos.left }}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget && switcherPhase === "closing") {
                    setSwitcherPhase("closed");
                  }
                }}
              >
                {orderedTracks.map((t) => {
                  const m = trackMeta(t.id);
                  const isCurrent = t.id === track.id;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      className={`trackpop-item${isCurrent ? " on" : ""}`}
                      aria-current={isCurrent ? "true" : undefined}
                      onClick={() => {
                        closeSwitcher();
                        onMobileNavigate();
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
                    (m) => !orderedTracks.some((t) => t.id === m.id),
                  );
                  if (upcoming.length === 0) return null;
                  return (
                    <>
                      <div className="trackpop-sep" />
                      {upcoming.map((m) => (
                        <div
                          key={m.id}
                          className="trackpop-item is-soon"
                          aria-disabled="true"
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

        {catalogStatus === "loading" && (
          <div className={styles.catalogState} role="status">Ładowanie programu…</div>
        )}
        {catalogStatus === "error" && (
          <div className={styles.catalogState} role="alert">
            <span>Nie udało się wczytać programu.</span>
            <button type="button" onClick={onRetryCatalog}>Spróbuj ponownie</button>
          </div>
        )}
        {catalogStatus === "success" && catalog?.tracks.length === 0 && (
          <div className={styles.catalogState}>Brak dostępnych ścieżek.</div>
        )}

        {track && (
          <>
            <div className="rail-cap">
              Program · {modules.length} {stageWord(modules.length)}
            </div>
            {modules.map((module, index) => {
              const active = curTopicSlug
                ? module.topics.some((topic) => topicSlug(topic.id) === curTopicSlug)
                : selectedCourseStage(track, searchParams.get("stage"))?.id === module.id;
              const complete = module.total > 0 && module.passed === module.total;
              const percent = courseStagePercent(module.passed, module.total);
              return (
                <Link key={module.id}
                  className={`course-stage-link${active ? " active" : ""}${complete ? " complete" : ""}`}
                  href={`/track/${track.id}?${courseQuery(module.id, courseFilter(searchParams.get("filter")))}`}
                  aria-current={active ? "step" : undefined}
                  aria-label={`${module.title}, ${module.passed} z ${module.total} zaliczonych`}
                  onClick={onMobileNavigate}>
                  <IconStageIndex n={index + 1} />
                  <span className="course-stage-copy">
                    <span className="course-stage-name">{module.title}</span>
                    <span className="course-stage-meter" aria-hidden="true">
                      <span className="course-stage-bar"><i style={{ width: `${percent}%` }} /></span>
                      <span className="course-stage-pct num">{percent}% zrobione</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </aside>
  );
}
