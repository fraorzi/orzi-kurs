"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { IconArrowRight, IconCheck } from "@/app/components/icons";
import TrackBadge from "@/app/components/TrackBadge";
import { islandPosition, roadmapAnchor, type Roadmap, type RoadmapTopic } from "@/app/lib/roadmap";
import { trackMeta } from "@/app/lib/tracks";
import IslandArt from "./IslandArt";
import CoursePicker from "./CoursePicker";
import styles from "./roadmap.module.css";

interface IslandStyle extends CSSProperties {
  "--island-x"?: string;
  "--chapter-color"?: string;
}

function Island({
  topic,
  current,
  position,
}: {
  topic: RoadmapTopic;
  current: boolean;
  position: number;
}) {
  const style: IslandStyle = { "--island-x": `${position}%` };
  return (
    <Link
      id={roadmapAnchor(topic.id)}
      href={topic.href}
      prefetch={false}
      className={styles.island}
      style={style}
      data-current={current}
      data-status={topic.status}
      data-side={topic.route === "side"}
      data-project={topic.kind === "project"}
      aria-current={current ? "step" : undefined}
      aria-label={`${topic.title}. ${topic.passed} z ${topic.total} zadań ukończonych.${current ? " Twój następny temat." : ""}${topic.route === "side" ? " Temat dodatkowy." : ""}`}
    >
      {current && <span className={styles.youAreHere}>Jesteś tutaj</span>}
      <IslandArt
        trackId={topic.trackId}
        complete={topic.status === "complete"}
        project={topic.kind === "project"}
      />
      <span className={styles.islandLabel}>
        <span className={styles.islandNumber}>
          {topic.route === "side"
            ? "Dodatkowo"
            : topic.kind === "project"
              ? "Projekt"
              : `Temat ${topic.number}`}
          {topic.status === "complete" && <IconCheck />}
        </span>
        <strong>{topic.title}</strong>
        <span className={styles.taskDots} aria-hidden="true">
          {Array.from({ length: topic.total }, (_, index) => (
            <i key={index} data-done={index < topic.passed} />
          ))}
          <small>
            {topic.passed}/{topic.total}
          </small>
        </span>
      </span>
    </Link>
  );
}

export default function LearningMap({ roadmap }: { roadmap: Roadmap }) {
  const reducedMotion = useReducedMotion();
  const [returnDirection, setReturnDirection] = useState<"up" | "down" | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(
    roadmap.current?.trackId ?? roadmap.chapters[0]?.id,
  );
  const root = useRef<HTMLDivElement>(null);

  function goTo(id: string) {
    setSelectedChapter(id.split("/")[0]);
    const island = document.getElementById(roadmapAnchor(id));
    const scroller = root.current?.closest("main");
    if (!island || !scroller) return;
    const offset =
      island.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top -
      scroller.clientHeight * 0.46;
    scroller.scrollTo({
      top: scroller.scrollTop + offset,
      behavior:
        !reducedMotion && Math.abs(offset) < scroller.clientHeight * 2 ? "smooth" : "instant",
    });
  }

  useEffect(() => {
    const container = root.current;
    const scroller = container?.closest("main");
    if (!container || !scroller) return;
    const island =
      container.querySelector<HTMLElement>('[aria-current="step"]') ??
      container.querySelector<HTMLElement>("[data-finish]");
    if (!island) return;
    const frame = requestAnimationFrame(() => {
      scroller.scrollTo({
        top:
          scroller.scrollTop +
          island.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top -
          scroller.clientHeight * 0.46,
        behavior: "instant",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [roadmap.current?.id]);

  useEffect(() => {
    const current = root.current?.querySelector('[aria-current="step"]');
    const scroller = root.current?.closest("main");
    if (!current || !scroller) return;
    let frame = 0;
    const updateDirection = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const island = current.getBoundingClientRect();
        const viewport = scroller.getBoundingClientRect();
        setReturnDirection(
          island.bottom <= viewport.top + 100
            ? "up"
            : island.top >= viewport.bottom - 100
              ? "down"
              : null,
        );
      });
    };
    // An instant course jump can cross the current island without changing its
    // intersection ratio. Read its position after scroll, at most once per frame.
    updateDirection();
    scroller.addEventListener("scroll", updateDirection, { passive: true });
    window.addEventListener("resize", updateDirection);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateDirection);
      window.removeEventListener("resize", updateDirection);
    };
  }, [roadmap.current?.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { root: root.current?.closest("main"), rootMargin: "80px" },
    );
    root.current?.querySelectorAll("[data-map-step]").forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={styles.mapPage}>
      <div className={styles.mapToolbar}>
        <div className={styles.mapHeading}>
          <Link href="/" aria-label="Wróć na główną">
            ←
          </Link>
          <div>
            <h1>Twoja roadmapa</h1>
            <span>
              {roadmap.passed} / {roadmap.total} tematów
            </span>
          </div>
        </div>
        <div className={styles.mapControls}>
          <CoursePicker chapters={roadmap.chapters} selectedId={selectedChapter} onSelect={goTo} />
        </div>
      </div>

      <aside className={styles.mapLegend} aria-label="Legenda mapy">
        <span>
          <i data-state="complete" />
          Ukończone
        </span>
        <span>
          <i data-state="current" />
          Twój krok
        </span>
        <span>
          <i data-state="side" />
          Dodatkowo
        </span>
        <p>Idź ścieżką lub wybierz dowolną wyspę.</p>
      </aside>

      {roadmap.total === 0 ? (
        <p className={styles.empty}>Brak tematów na mapie. Dodane kursy pojawią się tutaj.</p>
      ) : (
        <div className={styles.mapCanvas}>
          <div className={styles.finish} data-finish tabIndex={-1}>
            <span aria-hidden="true">◇</span>
            <h2>{roadmap.current ? "Samodzielność w praktyce" : "Cała mapa za Tobą"}</h2>
            <p>
              {roadmap.current
                ? "Zbuduj, przetestuj, wdroż. Potem rozwiń własny projekt."
                : "Wszystkie tematy ukończone. Każda wyspa zostaje dostępna do powtórki."}
            </p>
          </div>
          <div className={styles.chapters}>
            {roadmap.chapters.map((chapter, chapterIndex) => {
              const style: IslandStyle = { "--chapter-color": chapter.color };
              return (
                <section
                  key={chapter.id}
                  className={styles.chapter}
                  style={style}
                  aria-label={chapter.name}
                >
                  <div className={styles.chapterGate}>
                    <TrackBadge id={chapter.id} size="lg" />
                    <div>
                      <span>Kraina {String(chapterIndex + 1).padStart(2, "0")}</span>
                      <h2>{chapter.name}</h2>
                      <p>
                        {chapter.passed} / {chapter.total} tematów ukończonych
                      </p>
                    </div>
                    <Link
                      href={`/track/${chapter.id}`}
                      aria-label={`Zobacz katalog ${chapter.name}`}
                    >
                      <IconArrowRight />
                    </Link>
                  </div>
                  <ol className={styles.steps}>
                    {chapter.steps.map((step, index) => {
                      const position = step.branches.length > 0 ? 32 : islandPosition(index);
                      const next = chapter.steps[index + 1];
                      const nextPosition = next?.branches.length ? 32 : islandPosition(index + 1);
                      return (
                        <li
                          className={styles.step}
                          key={step.topic.id}
                          data-map-step
                          data-branched={step.branches.length > 0}
                        >
                          {index === 0 && (
                            <svg
                              className={styles.gateIncoming}
                              viewBox="0 0 1000 186"
                              preserveAspectRatio="none"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                className={styles.pathBase}
                                d={`M${position * 10} 0C${position * 10} 93 500 93 500 186`}
                              />
                              <path
                                className={styles.pathDraw}
                                pathLength="1"
                                d={`M${position * 10} 0C${position * 10} 93 500 93 500 186`}
                              />
                            </svg>
                          )}
                          {!next && chapterIndex < roadmap.chapters.length - 1 && (
                            <svg
                              className={styles.gateOutgoing}
                              viewBox="0 0 1000 170"
                              preserveAspectRatio="none"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                className={styles.pathBase}
                                d={`M${position * 10} 170C${position * 10} 85 500 85 500 0`}
                              />
                              <path
                                className={styles.pathDraw}
                                pathLength="1"
                                d={`M${position * 10} 170C${position * 10} 85 500 85 500 0`}
                              />
                            </svg>
                          )}
                          {next && (
                            <svg
                              className={styles.connector}
                              viewBox="0 0 1000 280"
                              preserveAspectRatio="none"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                className={styles.pathBase}
                                d={`M${position * 10} 280C${position * 10} 140 ${nextPosition * 10} 140 ${nextPosition * 10} 0`}
                              />
                              <path
                                className={styles.pathDraw}
                                data-complete={step.topic.status === "complete"}
                                d={`M${position * 10} 280C${position * 10} 140 ${nextPosition * 10} 140 ${nextPosition * 10} 0`}
                                pathLength="1"
                              />
                            </svg>
                          )}
                          {step.branches.length > 0 && (
                            <svg
                              className={styles.branchConnector}
                              viewBox="0 0 1000 100"
                              preserveAspectRatio="none"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path d="M320 60C480 60 570 20 760 60" />
                            </svg>
                          )}
                          <Island
                            topic={step.topic}
                            current={step.topic.id === roadmap.current?.id}
                            position={position}
                          />
                          {step.branches.map((topic) => (
                            <Island
                              key={topic.id}
                              topic={topic}
                              current={topic.id === roadmap.current?.id}
                              position={76}
                            />
                          ))}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
          <div className={styles.start}>
            <span aria-hidden="true">↑</span>Tu zaczyna się Twoja droga
          </div>
        </div>
      )}
      {roadmap.current && returnDirection && (
        <div className={styles.returnSlot}>
          <button
            className={styles.returnButton}
            type="button"
            onClick={() => roadmap.current && goTo(roadmap.current.id)}
            aria-label="Wróć do aktualnego tematu"
            title="Wróć do aktualnego tematu"
            data-direction={returnDirection}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M12 19V5m-6 6 6-6 6 6" />
            </svg>
          </button>
        </div>
      )}
      {roadmap.current && (
        <div className={styles.currentDock}>
          <div>
            <span>Następna wyspa · {trackMeta(roadmap.current.trackId).name}</span>
            <strong>{roadmap.current.title}</strong>
          </div>
          <Link href={roadmap.current.href}>
            Otwórz temat <IconArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
