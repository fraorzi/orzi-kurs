import Link from "next/link";
import type { CSSProperties } from "react";
import { IconArrowRight } from "@/app/components/icons";
import { trackMeta } from "@/app/lib/tracks";
import type { Roadmap } from "@/app/lib/roadmap";
import IslandArt from "./IslandArt";
import styles from "./roadmap.module.css";

export default function RoadmapPreview({ roadmap }: { roadmap: Roadmap }) {
  const topics =
    roadmap.current?.route === "side"
      ? roadmap.steps.flatMap((step) => step.branches)
      : roadmap.steps.map((step) => step.topic);
  const index = roadmap.current
    ? topics.findIndex((topic) => topic.id === roadmap.current?.id)
    : topics.length - 1;
  const nearby = topics.slice(Math.max(0, index - 1), Math.max(0, index - 1) + 3);
  const style: CSSProperties & { "--chapter-color": string } = {
    "--chapter-color": trackMeta(roadmap.current?.trackId ?? nearby[0]?.trackId ?? "js").color,
  };

  return (
    <section aria-labelledby="roadmap-preview-title" className={styles.previewSection}>
      <Link
        className={styles.preview}
        href="/roadmap"
        aria-label="Otwórz roadmapę w swoim aktualnym miejscu"
      >
        <div className={styles.previewCopy}>
          <span className={styles.eyebrow}>Twoja droga do mida</span>
          <h1 id="roadmap-preview-title">
            {roadmap.current
              ? "Kolejna wyspa czeka."
              : roadmap.total > 0
                ? "Cała mapa za Tobą."
                : "Twoja mapa nauki."}
          </h1>
          <p>
            {roadmap.current
              ? `${trackMeta(roadmap.current.trackId).name} · ${roadmap.current.title}`
              : roadmap.total > 0
                ? "Wszystkie wyspy odkryte. Wróć do dowolnego tematu."
                : "Twoja mapa pojawi się wraz z pierwszym kursem."}
          </p>
          <span className={styles.previewAction}>
            Otwórz roadmapę <IconArrowRight />
          </span>
          <span className={styles.previewProgress}>
            {roadmap.passed} / {roadmap.total} tematów ukończonych
          </span>
        </div>
        <div className={styles.previewMap} style={style} aria-hidden="true">
          <svg
            className={styles.previewPath}
            viewBox="0 0 460 300"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M-30 300C10 220 130 260 115 196S270 180 248 123 350 100 365 45 450 20 485-30" />
            <path
              className={styles.previewPathDraw}
              d="M-30 300C10 220 130 260 115 196S270 180 248 123 350 100 365 45"
              pathLength="1"
            />
          </svg>
          {nearby.map((topic, i) => (
            <div
              key={topic.id}
              className={styles.previewIsland}
              data-position={i}
              data-current={topic.id === roadmap.current?.id}
            >
              {topic.id === roadmap.current?.id && (
                <span className={styles.youAreHere}>Jesteś tutaj</span>
              )}
              <IslandArt
                trackId={topic.trackId}
                complete={topic.status === "complete"}
                project={topic.kind === "project"}
              />
              <span className={styles.previewIslandLabel}>{topic.number || i + 1}</span>
            </div>
          ))}
          <span className={styles.mapCaption}>Małe kroki. Coraz większe możliwości.</span>
        </div>
      </Link>
    </section>
  );
}
